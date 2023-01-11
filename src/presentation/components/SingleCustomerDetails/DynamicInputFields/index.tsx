import React from "react";

import Swal from "sweetalert2";
import { Customer } from "../../../../domain/models/CustomerResponse";
import CustomerFields from "./CustomerFields";
import { RemoteVerifyContact } from "../../../../data/usecases/customers/RemoteVerifyContact";
import { RemoteVerifyFirmName } from "../../../../data/usecases/customers/RemoteVerifyFirmname";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import {
  AddAdditionalFields,
  AddAdditionalFieldsParams,
} from "../../../../domain/usages/customers/AddAdditionalDetails";
import GstField from "./GstField";
import PanField from "./PanField";
import { RemoteVerifyPan } from "../../../../data/usecases/customers/RemoteVerifyPan";
import { RemoteVerifyGst } from "../../../../data/usecases/customers/RemoteVerifyGst";
import { FetchState } from "../../../../domain/enums/FetchState";
import { fetchedCustomers } from "../../../../domain/models/CustomersResponse";

export type Props = {
  fetchedCustomer: Customer;
  verifyContact: RemoteVerifyContact;
  verifyFirmName: RemoteVerifyFirmName;
  getSingleCustomer: (id: any, noLoading?: boolean) => void;
  postAdditionalFields: AddAdditionalFields;
  verifyGst: RemoteVerifyGst;
  verifyPan: RemoteVerifyPan;
  setUpdateCustomerList: React.Dispatch<React.SetStateAction<boolean>>;
  setCompletedItem: React.Dispatch<React.SetStateAction<Customer | undefined>>;
  customerList: fetchedCustomers;
};

const DynamicInputFields: React.FC<Props> = ({
  fetchedCustomer,
  verifyContact,
  verifyFirmName,
  getSingleCustomer,
  postAdditionalFields,
  verifyGst,
  verifyPan,
  customerList,
}) => {
  const [newFirmFields, setNewFirmFields] = React.useState([""]);
  const [newEmailFields, setNewEmailFields] = React.useState([
    { type: "email", value: "" },
  ]);
  const [newMobileFields, setNewMobileFields] = React.useState([
    { type: "mobile", value: "" },
  ]);
  const [gstNumber, setGstNumber] = React.useState("");
  const [panNumber, setPanNumber] = React.useState("");
  const [showGst, setShowGst] = React.useState(false);
  const [showPanNumber, setShowPanNumber] = React.useState(false);
  const [isGstField, setIsGstField] = React.useState(false);
  const [isPanField, setIsPanField] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(FetchState.DEFAULT);
  const saveAdditionalDetails = async () => {
    setLoading(FetchState.LOADING);
    newEmailFields?.shift();
    newMobileFields?.shift();
    newFirmFields.shift();
    let params: AddAdditionalFieldsParams.Params = {
      firmNames: newFirmFields,
      gstNumber: gstNumber.trim(),
      panNumber: panNumber.trim(),
      contacts: [...newEmailFields, ...newMobileFields],
    };
    if (params?.contacts?.length === 0) {
      delete params["contacts"];
    }
    if (params?.firmNames?.length === 0) {
      delete params["firmNames"];
    }
    if (!params?.gstNumber) {
      delete params["gstNumber"];
    }
    if (!params?.panNumber) {
      delete params["panNumber"];
    }
    try {
      const data = await postAdditionalFields.post(fetchedCustomer._id, params);
      setOpen(false);
      data?.success
        ? await Swal.fire({
            icon: "success",
            title: "Details Successfully Added",
          }).then(async () => {
            let removableIndex = customerList.findIndex(
              (val) => val._id === fetchedCustomer._id
            );
            const keysToDelete: (keyof typeof params)[] = [
              "contacts",
              "firmNames",
              "gstNumber",
              "panNumber",
            ];

            keysToDelete.forEach((i) => {
              delete params[i];
            });
            setNewFirmFields([""]);
            setNewEmailFields([{ type: "email", value: "" }]);
            setNewMobileFields([{ type: "mobile", value: "" }]);
            setGstNumber("");
            setShowGst(false);
            setShowPanNumber(false);
            setPanNumber("");
            // getSingleCustomer(fetchedCustomer, false);
            customerList.splice(removableIndex, 1);
            getSingleCustomer(customerList[removableIndex]);
            setLoading(FetchState.DEFAULT);
            return;
          })
        : await Swal.fire({
            title: "Failed to addd the details",
            text: data?.errors[0]?.message,
            icon: "error",
          }).then(() => {
            setLoading(FetchState.DEFAULT);
            getSingleCustomer(fetchedCustomer, false);
            setGstNumber("");
            setShowGst(false);
            setShowPanNumber(false);
            setPanNumber("");
          });
    } catch (error: any) {
      Swal.fire({
        title: error?.message,
        text: error[0].message,
        icon: "error",
      });
      setLoading(FetchState.DEFAULT);
      getSingleCustomer(fetchedCustomer, false);
      setGstNumber("");
      setShowGst(false);
      setShowPanNumber(false);
      setPanNumber("");
    }
  };

  return (
    <div>
      <div style={{ marginTop: "30px" }}>
        <Dialog onBackdropClick={() => setOpen(false)} open={open}>
          <DialogContent>
            <>
              <div
                style={{
                  width: "427px",
                  height: "343",
                  padding: "10px 0px 0px 4px",
                }}
              >
                <Typography color="inherit">
                  Are you sure you want to add these details?
                </Typography>
              </div>
            </>
          </DialogContent>
          <DialogActions>
            <>
              <div style={{ paddingBottom: "15px", paddingRight: "23px" }}>
                <Button
                  role="button"
                  variant="contained"
                  color="warning"
                  name="submitButton"
                  onClick={saveAdditionalDetails}
                >
                  <Typography color="inherit">
                    {loading === FetchState.LOADING ? (
                      <CircularProgress size={25} sx={{ color: "white" }} />
                    ) : (
                      "confirm additional details"
                    )}
                  </Typography>
                </Button>
              </div>
            </>
          </DialogActions>
        </Dialog>

        <form
          role="form"
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          <div>
            <div style={{ marginBottom: "20px", marginTop: "19px" }}>
              <Typography>Basic Details</Typography>
            </div>
            <CustomerFields
              setNewFirmFields={setNewFirmFields}
              newFirmFields={newFirmFields}
              getSingleCustomer={getSingleCustomer}
              verifyFirmName={verifyFirmName}
              verifyContact={verifyContact}
              fetchedCustomer={fetchedCustomer}
              newEmailFields={newEmailFields}
              setNewEmailFields={setNewEmailFields}
              newMobileFields={newMobileFields}
              setNewMobileFields={setNewMobileFields}
            />
          </div>

          <div style={{ marginTop: "10px", width: "672px" }}>
            <Box display="flex" flexDirection="row">
              <GstField
                setShowGst={setShowGst}
                showGst={showGst}
                gstNumber={gstNumber}
                getSingleCustomer={getSingleCustomer}
                setGstNumber={setGstNumber}
                fetchedCustomer={fetchedCustomer}
                verifyGst={verifyGst}
                isGstField={isGstField}
                setIsGstField={setIsGstField}
              />
              <PanField
                showPanNumber={showPanNumber}
                setShowPanNumber={setShowPanNumber}
                panNumber={panNumber}
                isPanField={isPanField}
                setIsPanField={setIsPanField}
                getSingleCustomer={getSingleCustomer}
                setPanNumber={setPanNumber}
                fetchedCustomer={fetchedCustomer}
                verifyPan={verifyPan}
              />
            </Box>
          </div>

          <div style={{ marginTop: "40px" }}>
            <Button
              type="submit"
              disabled={
                fetchedCustomer?.firmNames?.find(
                  (val) => val?.verification?.status === "verified"
                ) === undefined &&
                fetchedCustomer?.images?.find(
                  (val) => val?.verification?.status === "rejected"
                ) === undefined &&
                fetchedCustomer?.contacts?.find(
                  (val) => val?.verification?.status === "verified"
                ) === undefined &&
                !fetchedCustomer?.identification?.gst.sources.includes(
                  "data_entry_profiler"
                ) &&
                !fetchedCustomer?.identification?.pan?.sources?.includes(
                  "data_entry_profiler"
                )
              }
              fullWidth
              variant="contained"
              color="warning"
            >
              Mark as Complete
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicInputFields;
