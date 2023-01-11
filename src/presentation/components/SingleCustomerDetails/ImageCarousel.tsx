import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import GaImage from "./Image";
import {
  ImageRejectionReasons,
  ImageRejectionReasonEntity,
} from "../../../domain/models/ImageRejectionReasons";
import { RemoteRejectImage } from "../../../data/usecases/customers/RemotRejectImage";
import { Customer } from "../../../domain/models/CustomerResponse";
import { fetchedCustomers } from "../../../domain/models/CustomersResponse";
export type image = {
  type: string;
  uuid: string;
  status: string;
  source: string;
  _id: string;
  url?: string;
  verification?: {
    status: string;
  };
};

type Props = {
  images: image[];
  fetchedCustomer: Customer;
  imageRejectionReasons: ImageRejectionReasonEntity[];
  rejectImage: RemoteRejectImage;
  getSingleCustomer: (id: Customer) => void;
  setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  setOpenImage: React.Dispatch<React.SetStateAction<boolean>>;
  customerList: fetchedCustomers;
};

const ImageCarousel: React.FC<Props> = ({
  images,
  imageRejectionReasons,
  getSingleCustomer,
  fetchedCustomer,
  rejectImage,
  setImageUrl,
  setOpenImage,
  customerList,
}) => {
  const [rejectedCount, setRejectedCount] = useState(0);
  let allImagesRejected = false;
  useEffect(() => {}, [fetchedCustomer]);
  return (
    <div>
      <div>
        <Carousel
          index={1}
          swipe={false}
          sx={{ width: "100%", height: "100%" }}
          navButtonsProps={{
            style: {
              backgroundColor: "orange",
              position: "relative",
              right: "10%",
            },
          }}
          navButtonsWrapperProps={{
            style: {
              // padding: " 2px 0 20px",
              top: 220,
            },
          }}
          animation="slide"
          autoPlay={false}
          navButtonsAlwaysVisible
          fullHeightHover={false}
        >
          {images?.map((image, ind) => {
            return (
              <GaImage
                key={image._id}
                customerList={customerList}
                allImagesRejected={allImagesRejected}
                imagesLength={images.length}
                getSingleCustomer={getSingleCustomer}
                fetchedCustomer={fetchedCustomer}
                rejectImage={rejectImage}
                imageRejectionReasons={imageRejectionReasons}
                image={image}
                setRejectedCount={setRejectedCount}
                rejectedCount={rejectedCount}
                setImageUrl={setImageUrl}
                setOpenImage={setOpenImage}
              />
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default ImageCarousel;
