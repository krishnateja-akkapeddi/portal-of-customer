import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./CanvasPreview";
import { useDebounceEffect } from "./UseDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";
import { doOCR, terminateOcr } from "../../../utils/ImageToTextReader";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}
type props = {
  imageUrl: string;
  rotate: number;
  setRotate: React.Dispatch<React.SetStateAction<number>>;
  textReader: boolean;
  setTextReader: React.Dispatch<React.SetStateAction<boolean>>;
  execOcr: boolean;
  setEcecOcr: React.Dispatch<React.SetStateAction<boolean>>;
};
const App = forwardRef((props: props, ref: any) => {
  const [imgSrc, setImgSrc] = useState(props.imageUrl);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [aspect, setAspect] = useState<number | undefined>(5 / 1);
  const [ocrText, setOcrText] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [confirmTextReading, setConfirmTextReading] = useState(false);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result ? reader?.result.toString() : "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  async function readText() {
    setConfirmTextReading(true);
    const canvas = document.getElementById("croppedImage") as HTMLCanvasElement;
    const dataURL = canvas.toDataURL();
    await doOCR(dataURL, setLoading, setOcrText);
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }
  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          props.rotate
        );
      }
    },
    500,
    [completedCrop, scale, props.rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(16 / 9);
      setCrop(centerAspectCrop(width, height, 16 / 9));
    }
  }
  useEffect(() => {
    handleToggleAspectClick();
  }, []);
  useEffect(() => {
    if (props.execOcr) readText().then(() => props.setEcecOcr(false));
  }, [props.execOcr]);

  return (
    <div>
      <Dialog open={confirmTextReading}>
        <DialogTitle> Text Recogniser </DialogTitle>
        <DialogContent>{loading ? "...loading" : ocrText}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setConfirmTextReading(false);
              terminateOcr();
            }}
          >
            Close
          </Button>
        </DialogActions>
        <DialogActions></DialogActions>
      </Dialog>
      <div className="Crop-Controls">
        <div style={{ position: "fixed" }}>
          {/* <Button onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? "off" : "on"}
          </Button> */}
        </div>
      </div>
      <div>
        {Boolean(imgSrc) && (
          <ReactCrop
            crop={props.textReader ? crop : undefined}
            onChange={(_: any, percentCrop: any) => setCrop(percentCrop)}
            onComplete={(c: any) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img
              crossOrigin="anonymous"
              ref={imgRef}
              width={400}
              height={500}
              alt="Crop me"
              src={imgSrc}
              style={{
                transform: `scale(${scale}) rotate(${props.rotate}deg)`,
                objectFit: "contain",
              }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        )}
      </div>
      <div>
        {Boolean(completedCrop) && (
          <canvas
            id="croppedImage"
            width={200}
            ref={previewCanvasRef}
            style={{
              display: "none",
              border: "1px solid black",
              objectFit: "contain",
              width: completedCrop?.width,
              height: completedCrop?.height,
            }}
          />
        )}
      </div>
    </div>
  );
});

export default App;
