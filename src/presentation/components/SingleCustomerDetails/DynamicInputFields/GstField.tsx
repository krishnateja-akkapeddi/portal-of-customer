import React from "react";
import Swal from "sweetalert2";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Add, InfoOutlined, RemoveCircleOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Customer } from "../../../../domain/models/CustomerResponse";
import { RemoteVerifyGst } from "../../../../data/usecases/customers/RemoteVerifyGst";
import { FetchState } from "../../../../domain/enums/FetchState";
import ReportGmailerrorredIcon from "@mui/icons-material/ErrorOutline";
import { GaDataValidator } from "@goapptiv/data-validator";
type Props = {
  fetchedCustomer: Customer;
  setGstNumber: React.Dispatch<React.SetStateAction<string>>;
  verifyGst: RemoteVerifyGst;
  getSingleCustomer: (id: Customer, noLoading?: boolean) => void;
  isGstField: boolean;
  setShowGst: React.Dispatch<React.SetStateAction<boolean>>;
  showGst: boolean;
  gstNumber: string;
  setIsGstField: React.Dispatch<React.SetStateAction<boolean>>;
};

const GstField: React.FC<Props> = ({
  fetchedCustomer,
  setGstNumber,
  verifyGst,
  getSingleCustomer,
  isGstField,
  setIsGstField,
  showGst,
  setShowGst,
  gstNumber,
}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(FetchState.DEFAULT);
  const handleClickOpen = (contactId?: string, type?: string) => {
    setOpen(true);
  };
  async function handleConfirm() {
    const params = {};
    setLoading(FetchState.LOADING);
    try {
      const data = await verifyGst.verify(fetchedCustomer._id, params);
      setOpen(false);
      !data.success
        ? Swal.fire({
            icon: "error",
            title: "Unable to verify GST",
            text: data.errors ? data.errors[0].message : "Something went wrong",
          })
        : Swal.fire({
            icon: "success",
            title: "Gst Number Successfully Verified",
          });
      setLoading(FetchState.DEFAULT);
      getSingleCustomer(fetchedCustomer, false);
      setGstNumber("");
    } catch (error) {
      setLoading(FetchState.DEFAULT);
      Swal.fire({
        icon: "error",
        title: "Unable to verify GST",
      });
    }
  }
  const handleGstFieldsChange = (e: any) => {
    setIsGstField(!GaDataValidator.isGstinValid(e.target.value));
    setGstNumber(e.target.value);
  };
  return (
    <>
      <div>
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
                  Are you sure you want to confirm the Gst Number ?
                </Typography>
              </div>
            </>
          </DialogContent>
          <DialogActions>
            <>
              <div style={{ paddingBottom: "15px", paddingRight: "23px" }}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleConfirm}
                >
                  <Typography color="inherit">
                    {loading === FetchState.LOADING ? (
                      <CircularProgress size={25} sx={{ color: "white" }} />
                    ) : (
                      "confirm"
                    )}
                  </Typography>
                </Button>
              </div>
            </>
          </DialogActions>
        </Dialog>

        <Box gap={0} display="flex" justifyContent="center" flexDirection="row">
          {fetchedCustomer?.gstNumber && (
            <div style={{ width: "120px", marginTop: "12px" }}>
              <label style={{ color: "#79747E" }}>
                <Typography color="inherit">GST Number</Typography>
              </label>
            </div>
          )}
          <div style={{ width: "250px" }}>
            {fetchedCustomer?.gstNumber && (
              <OutlinedInput
                size="small"
                sx={{
                  mb: "15px",
                  width: "230px",
                }}
                fullWidth
                disabled
                id="gstNumber"
                value={fetchedCustomer?.gstNumber}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      disabled={fetchedCustomer?.identification?.gst.sources.includes(
                        "data_entry_profiler"
                      )}
                      aria-label="verify"
                      edge="end"
                      onClick={() => {
                        handleClickOpen();
                      }}
                    >
                      {fetchedCustomer?.identification?.gst.sources.includes(
                        "data_entry_profiler"
                      ) ? (
                        <CheckCircleOutlineIcon color="success" />
                      ) : (
                        <ReportGmailerrorredIcon color="warning" />
                      )}{" "}
                    </IconButton>
                  </InputAdornment>
                }
                label="Gst Number"
              ></OutlinedInput>
            )}

            <div>
              {showGst && (
                <div>
                  <TextField
                    size="small"
                    error={isGstField}
                    helperText={
                      isGstField && "Please enter the valid GST Number"
                    }
                    required
                    label="GST Number"
                    sx={{ mb: "15px", width: "200px" }}
                    type="string"
                    onChange={(e) => {
                      handleGstFieldsChange(e);
                    }}
                    value={gstNumber}
                  />
                  <IconButton
                    onClick={() => {
                      setShowGst(false);
                      setGstNumber("");
                    }}
                  >
                    <RemoveCircleOutline
                      color="error"
                      sx={{ marginTop: "8px" }}
                    />
                  </IconButton>
                </div>
              )}

              {!showGst && !fetchedCustomer?.gstNumber && (
                <div style={{ marginBottom: "18px", width: "294px" }}>
                  <Button
                    disabled={
                      fetchedCustomer?.firmNames?.find(
                        (val) => val?.verification?.status === "verified"
                      ) === undefined &&
                      fetchedCustomer?.contacts?.find(
                        (val) => val?.verification?.status === "verified"
                      ) === undefined
                    }
                    onClick={() => setShowGst(true)}
                    color="warning"
                    variant="text"
                  >
                    <Add color="inherit" />
                    <Typography fontSize={13} color="inherit">
                      Add GST Number
                    </Typography>
                  </Button>
                  <div style={{ paddingLeft: "10px", marginRight: "50px" }}>
                    <span>
                      <Typography color="InfoText">
                        {fetchedCustomer?.firmNames?.find(
                          (val) => val?.verification?.status === "verified"
                        ) === undefined &&
                        fetchedCustomer?.contacts?.find(
                          (val) => val?.verification?.status === "verified"
                        ) === undefined ? (
                          <>
                            {" "}
                            <InfoOutlined
                              sx={{
                                fontSize: "15px",
                                float: "left",
                                margin: "2px",
                              }}
                            />
                            <Typography fontSize={10}>
                              GST can be added only if firm name or contact
                              number is verified
                            </Typography>
                          </>
                        ) : (
                          ""
                        )}
                      </Typography>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};

export default GstField;
