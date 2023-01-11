import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { RemoteRejectImage } from "../../../data/usecases/customers/RemotRejectImage";
import {
  ImageRejectionReasons,
  ImageRejectionReasonEntity,
} from "../../../domain/models/ImageRejectionReasons";
import Swal from "sweetalert2";
import { Customer } from "../../../domain/models/CustomerResponse";
import { image } from "./ImageCarousel";
import { fetchedCustomers } from "../../../domain/models/CustomersResponse";
type Props = {
  image?: image;
  imageRejectionReasons: ImageRejectionReasonEntity[];
  rejectImage: RemoteRejectImage;
  getSingleCustomer: (Customer: any) => void;
  fetchedCustomer: Customer;
  imagesLength: number;
  allImagesRejected: boolean;
  setRejectedCount: React.Dispatch<React.SetStateAction<number>>;
  customerList: fetchedCustomers;
  rejectedCount: number;
};

const SingleCustomerPageHeader: React.FC<Props> = ({
  image,
  imageRejectionReasons,
  rejectImage,
  getSingleCustomer,
  fetchedCustomer,
  allImagesRejected,
  imagesLength,
  setRejectedCount,
  customerList,
  rejectedCount,
}) => {
  const [open, setOpen] = React.useState(false);
  const [reasonCode, setReasonCode] = React.useState("");
  const [loading, setLoading] = React.useState("default");

  const handleClickOpen = () => {
    setOpen(true);
  };
  async function handleConfirm() {
    const params = { reasonCode: reasonCode };
    setLoading("loading");
    let rejCount;
    try {
      setRejectedCount((prev) => {
        rejCount = prev + 1;
        return prev + 1;
      });

      const data = await rejectImage.reject(
        fetchedCustomer._id,
        image ? image._id : "",
        params
      );

      setOpen(false);
      data?.success
        ? Swal.fire({
            icon: "success",
            title: "Image Successfully Rejected",
          })
        : Swal.fire({
            title: "Unable to reject the image",
            text: data.errors ? data.errors[0].message : "Something went wrong",
            icon: "error",
          });
      if (rejCount == imagesLength) {
        let removableIndex = customerList.findIndex(
          (val) => val._id === fetchedCustomer._id
        );
        customerList.splice(removableIndex, 1);
        getSingleCustomer(customerList[removableIndex]);
        setLoading("default");
        setRejectedCount(0);
        return;
      }
      setLoading("default");
      getSingleCustomer(fetchedCustomer);
    } catch (error: any) {
      setLoading("default");
      Swal.fire({
        title: error?.message,
        text: error[0].message,
        icon: "error",
      });
    }
  }
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {}, [rejectedCount]);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <>
            <div
              style={{
                width: "427px",
                height: "343",
                padding: "10px 0px 0px 4px",
              }}
            >
              <Typography color="inherit" fontWeight={24}>
                Reject
              </Typography>
              <div style={{ padding: "10px 0px 0px 10px" }}>
                <RadioGroup>
                  {imageRejectionReasons?.map(
                    (reason: ImageRejectionReasonEntity) => {
                      return (
                        <FormControlLabel
                          key={reason.code}
                          onChange={() => setReasonCode(reason.code)}
                          label={
                            <Typography>
                              {reason.message.toUpperCase()}
                            </Typography>
                          }
                          control={
                            <Radio value={reason.code} color="warning" />
                          }
                        />
                      );
                    }
                  )}
                </RadioGroup>
              </div>
            </div>
          </>
        </DialogContent>
        <DialogActions>
          <>
            <div style={{ paddingBottom: "15px", paddingRight: "23px" }}>
              <Button
                disabled={!reasonCode ? true : false}
                variant="contained"
                color={reasonCode ? "warning" : "info"}
                onClick={handleConfirm}
              >
                <Typography color="inherit">
                  {loading === "loading" ? (
                    <CircularProgress size={25} sx={{ color: "white" }} />
                  ) : (
                    "Reject Image"
                  )}
                </Typography>
              </Button>
            </div>
          </>
        </DialogActions>
      </Dialog>
      <div className=" inline">
        <Typography fontSize={14}>
          {image?.type === "purchase_invoice"
            ? "Purchase Invoice"
            : image?.type === "banner"
            ? "Banner"
            : image?.type?.toUpperCase()}
        </Typography>
      </div>
      <div
        className="inline"
        style={{
          float: "right",
          paddingBottom: "21px",
        }}
        // style={{ marginLeft: "25rem", paddingBottom: "10px" }}
      >
        <Button
          disabled={image?.verification?.status === "rejected"}
          color={image?.verification?.status === "rejected" ? "info" : "error"}
          variant="text"
          onClick={handleClickOpen}
        >
          <Typography
            fontSize={14}
            color={
              image?.verification?.status === "rejected"
                ? "primary.info"
                : "primary.error"
            }
          >
            {image?.verification?.status === "rejected" ? "Rejected" : "Reject"}
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default SingleCustomerPageHeader;
