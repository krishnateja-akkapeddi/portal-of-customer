import React, { useRef } from "react";
import DraggabeDialogBox from "../../ga-components/GaStickyDialogBox";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import FlipIcon from "@mui/icons-material/Flip";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CropFreeIcon from "@mui/icons-material/CropFree";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ImageTextReader from "../../components/ImageTextReader";

import { Box, Tooltip, IconButton, Button } from "@mui/material";
import { RttOutlined } from "@mui/icons-material";
import { height } from "@mui/system";
import { readBuilderProgram } from "typescript";
type Props = {
  imageUrl: string | undefined;
  openImage: boolean;
  setOpenImage: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImageDraggableDialogBox = (props: Props) => {
  const [rotateImage, setRotateImage] = React.useState(0);
  const [flip, setFlip] = React.useState(false);
  const [execOcr, setEcecOcr] = React.useState(false);
  const [textReader, setTextReader] = React.useState(false);
  const rotate = () => {
    if (rotateImage < 360) {
      setRotateImage(rotateImage + 90);
    } else {
      setRotateImage(90);
    }
  };
  const childRef: any = useRef();

  return (
    <DraggabeDialogBox
      height={textReader ? "44rem" : "43rem"}
      open={props.openImage}
      setOpen={props.setOpenImage}
      children={
        <>
          <div>
            <div className="Crop-Controls"></div>
            {textReader && (
              <Button onClick={() => setEcecOcr(true)}>Read text</Button>
            )}
            <TransformWrapper initialScale={1}>
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <div>
                  <TransformComponent>
                    <div
                      style={{ transform: flip ? "scaleX(-1)" : "scaleX(1) " }}
                    >
                      {textReader ? (
                        <ImageTextReader
                          setEcecOcr={setEcecOcr}
                          execOcr={execOcr}
                          ref={childRef}
                          textReader={textReader}
                          setTextReader={setTextReader}
                          rotate={rotateImage}
                          setRotate={setRotateImage}
                          imageUrl={props.imageUrl ? props.imageUrl : ""}
                        />
                      ) : (
                        <img
                          crossOrigin="anonymous"
                          width={500}
                          height={500}
                          alt="Crop me"
                          src={props.imageUrl}
                          style={{
                            transform: `rotate(${rotateImage}deg)`,
                            objectFit: "contain",
                          }}
                        />
                      )}
                    </div>
                  </TransformComponent>

                  <Box
                    marginTop={1}
                    justifyContent="center"
                    display="flex"
                    flexDirection="row"
                  >
                    <div>
                      <Tooltip title="Flip" placement="top" arrow>
                        <IconButton
                          onClick={() => {
                            setFlip(!flip);
                          }}
                        >
                          <FlipIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip title="Zoom In" placement="top" arrow>
                        <IconButton onClick={() => zoomIn()}>
                          <ZoomInIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip title="Zoom Out" placement="top" arrow>
                        <IconButton onClick={() => zoomOut()}>
                          <ZoomOutIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip title="Rotate" placement="top" arrow>
                        <IconButton onClick={rotate}>
                          <RotateRightIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip title="Reset" placement="top" arrow>
                        <IconButton onClick={() => resetTransform()}>
                          <CropFreeIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip title="Text Reader" placement="top" arrow>
                        <IconButton
                          sx={{ bgcolor: textReader ? "#FFD580" : "" }}
                          onClick={() => setTextReader(!textReader)}
                        >
                          <RttOutlined color="warning" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip
                        title="Open Image in new tab"
                        placement="top"
                        arrow
                      >
                        <IconButton
                          color="warning"
                          onClick={() =>
                            window.open(
                              props.imageUrl,
                              "center window",
                              "width=600, height=300"
                            )
                          }
                        >
                          <OpenInNewIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </Box>
                </div>
              )}
            </TransformWrapper>
          </div>
        </>
      }
    ></DraggabeDialogBox>
  );
};

export default ImageDraggableDialogBox;
