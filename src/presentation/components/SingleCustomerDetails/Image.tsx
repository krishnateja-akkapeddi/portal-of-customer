import Expand from "@mui/icons-material/OpenWith";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import FlipIcon from "@mui/icons-material/Flip";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CropFreeIcon from "@mui/icons-material/CropFree";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import SingleCustomerPageHeader from "./Header";
import ImageNotAvailable from "../../../assets/image-not-found.jpg";
import { image } from "./ImageCarousel";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  ImageRejectionReasons,
  ImageRejectionReasonEntity,
} from "../../../domain/models/ImageRejectionReasons";
import { RemoteRejectImage } from "../../../data/usecases/customers/RemotRejectImage";
import { Customer } from "../../../domain/models/CustomerResponse";
import ocrSpaceApi from "ocr-space-api-alt2";
import { fetchedCustomers } from "../../../domain/models/CustomersResponse";
type Props = {
  image: image;
  imageRejectionReasons: ImageRejectionReasonEntity[];
  rejectImage: RemoteRejectImage;
  getSingleCustomer: (id: Customer) => void;
  fetchedCustomer: Customer;
  setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  setOpenImage: React.Dispatch<React.SetStateAction<boolean>>;
  imagesLength: number;
  allImagesRejected: boolean;
  setRejectedCount: React.Dispatch<React.SetStateAction<number>>;
  customerList: fetchedCustomers;
  rejectedCount: number;
};

const GaImage: React.FC<Props> = ({
  image,
  rejectedCount,
  setRejectedCount,
  allImagesRejected,
  imageRejectionReasons,
  rejectImage,
  getSingleCustomer,
  fetchedCustomer,
  setImageUrl,
  setOpenImage,
  imagesLength,
  customerList,
}) => {
  const [rotateImage, setRotateImage] = useState(0);
  const [ocrText, setOcrText] = useState<any>();

  const [flip, setFlip] = useState(false);
  const rotate = () => {
    if (rotateImage < 360) {
      setRotateImage(rotateImage + 90);
    } else {
      setRotateImage(90);
    }
  };

  useEffect(() => {}, [fetchedCustomer]);
  return (
    <div>
      <SingleCustomerPageHeader
        customerList={customerList}
        setRejectedCount={setRejectedCount}
        allImagesRejected={allImagesRejected}
        imagesLength={imagesLength}
        getSingleCustomer={getSingleCustomer}
        fetchedCustomer={fetchedCustomer}
        rejectImage={rejectImage}
        imageRejectionReasons={imageRejectionReasons}
        image={image}
        rejectedCount={rejectedCount}
      />
      <div>
        <TransformWrapper initialScale={1}>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <TransformComponent>
                <div
                  style={{
                    transform: flip ? "scaleX(-1)" : "scaleX(1)",
                    height: "25rem",
                    position: "relative",
                    width: "42rem",
                  }}
                >
                  <img
                    style={{
                      transform: `rotate(${rotateImage}deg)`,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    src={image?.url}
                    alt=""
                  />
                </div>
              </TransformComponent>
              <Box
                marginTop={1}
                justifyContent="center"
                display="flex"
                flexDirection="row"
                border="1px solid #FFDAB9"
                borderRadius="1rem"
                width="50%"
                marginLeft="25%"
              >
                <div>
                  <Tooltip color="warning" title="Flip" placement="top" arrow>
                    <IconButton
                      color="warning"
                      onClick={() => {
                        setFlip(!flip);
                      }}
                    >
                      <FlipIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Zoom In" placement="top" arrow>
                    <IconButton color="warning" onClick={() => zoomIn()}>
                      <ZoomInIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Zoom Out" placement="top" arrow>
                    <IconButton color="warning" onClick={() => zoomOut()}>
                      <ZoomOutIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Rotate" placement="top" arrow>
                    <IconButton color="warning" onClick={rotate}>
                      <RotateRightIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Reset" placement="top" arrow>
                    <IconButton
                      color="warning"
                      onClick={() => resetTransform()}
                    >
                      <CropFreeIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Expand Image" placement="top" arrow>
                    <IconButton
                      color="warning"
                      onClick={() => {
                        setImageUrl(image?.url);
                        setOpenImage(true);
                      }}
                    >
                      <Expand />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Open Image in new tab" placement="top" arrow>
                    <IconButton
                      color="warning"
                      onClick={() =>
                        window.open(
                          image?.url,
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
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
};

export default GaImage;
