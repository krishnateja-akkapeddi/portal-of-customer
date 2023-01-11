import React, { useState } from "react";
import ImageCarousel from "./ImageCarousel";
import { Customer } from "../../../domain/models/CustomerResponse";
import DynamicInputFields from "./DynamicInputFields";
import { ImageRejectionReasonEntity } from "../../../domain/models/ImageRejectionReasons";
import { RemoteVerifyContact } from "../../../data/usecases/customers/RemoteVerifyContact";
import { RemoteVerifyFirmName } from "../../../data/usecases/customers/RemoteVerifyFirmname";
import { RemoteRejectImage } from "../../../data/usecases/customers/RemotRejectImage";
import { RemotePostAdditionalDetails } from "../../../data/usecases/customers/RemotePostAdditionalDetails";
import { RemoteVerifyGst } from "../../../data/usecases/customers/RemoteVerifyGst";
import { RemoteVerifyPan } from "../../../data/usecases/customers/RemoteVerifyPan";
import ImageDraggableDialogBox from "./ImageDraggableDialogBox";
import { fetchedCustomers } from "../../../domain/models/CustomersResponse";

type Props = {
  setCompletedItem: React.Dispatch<React.SetStateAction<Customer | undefined>>;
  fetchedCustomer: Customer;
  imageRejectionReasons: ImageRejectionReasonEntity[];
  verifyContact: RemoteVerifyContact;
  verifyFirmName: RemoteVerifyFirmName;
  getSingleCustomer: (id: Customer, noLoading?: boolean) => void;
  rejectImage: RemoteRejectImage;
  postAdditionalFields: RemotePostAdditionalDetails;
  verifyGst: RemoteVerifyGst;
  verifyPan: RemoteVerifyPan;
  setUpdateCustomerList: React.Dispatch<React.SetStateAction<boolean>>;
  customerList: fetchedCustomers;
  isBatchSelected: boolean;
};

const SingleCustomerDetails = (props: Props) => {
  const [openImage, setOpenImage] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  return (
    <div
      className="stylishScroll"
      style={{
        padding: "10px 10px 0px 32px",
        height: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px 70px 20px 40px",
        }}
      >
        {openImage && (
          <ImageDraggableDialogBox
            setOpenImage={setOpenImage}
            openImage={openImage}
            imageUrl={imageUrl}
          />
        )}
        <ImageCarousel
          fetchedCustomer={props.fetchedCustomer}
          getSingleCustomer={props.getSingleCustomer}
          rejectImage={props.rejectImage}
          imageRejectionReasons={props.imageRejectionReasons}
          images={props.fetchedCustomer?.images}
          setImageUrl={setImageUrl}
          setOpenImage={setOpenImage}
          customerList={props.customerList}
        />
        <DynamicInputFields
          customerList={props.customerList}
          setUpdateCustomerList={props.setUpdateCustomerList}
          verifyGst={props.verifyGst}
          verifyPan={props.verifyPan}
          postAdditionalFields={props.postAdditionalFields}
          getSingleCustomer={props.getSingleCustomer}
          verifyFirmName={props.verifyFirmName}
          verifyContact={props.verifyContact}
          fetchedCustomer={props.fetchedCustomer}
          setCompletedItem={props.setCompletedItem}
        />
      </div>
    </div>
  );
};

export default SingleCustomerDetails;
