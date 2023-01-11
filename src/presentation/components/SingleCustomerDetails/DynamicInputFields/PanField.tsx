import {
  Add,
  Info,
  InfoOutlined,
  RemoveCircleOutline,
} from "@mui/icons-material";
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
  Tooltip,
  Typography,
} from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ErrorOutline";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import React from "react";
import { RemoteVerifyPan } from "../../../../data/usecases/customers/RemoteVerifyPan";
import { Customer } from "../../../../domain/models/CustomerResponse";
import Swal from "sweetalert2";
import { FetchState } from "../../../../domain/enums/FetchState";
import { GaDataValidator } from "@goapptiv/data-validator";
type Props = {
  fetchedCustomer: Customer;
  setPanNumber: React.Dispatch<React.SetStateAction<string>>;
  verifyPan: RemoteVerifyPan;
  getSingleCustomer: (id: Customer, noLoading?: boolean) => void;
  isPanField: boolean;
  setIsPanField: React.Dispatch<React.SetStateAction<boolean>>;
  panNumber: string;
  showPanNumber: boolean;
  setShowPanNumber: React.Dispatch<React.SetStateAction<boolean>>;
};

const PanField: React.FC<Props> = ({
  fetchedCustomer,
  setPanNumber,
  verifyPan,
  getSingleCustomer,
  isPanField,
  setIsPanField,
  panNumber,
  showPanNumber,
  setShowPanNumber,
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
      const data = await verifyPan.verify(fetchedCustomer._id, params);
      setOpen(false);
      !data.success
        ? Swal.fire({
            icon: "error",
            title: "Unable to verify Pan",
            text: data.errors
              ? data?.errors[0]?.message
              : "Something went wrong",
          })
        : Swal.fire({
            icon: "success",
            title: "Pan Number Successfully Verified",
          });

      setLoading(FetchState.DEFAULT);
      getSingleCustomer(fetchedCustomer, false);
      setPanNumber("");
    } catch (error) {
      setLoading(FetchState.DEFAULT);
      // getSingleCustomer(fetchedCustomer);
      Swal.fire({ text: "Unable to fetch States", icon: "error" });
    }
  }
  const handlePanFieldsChange = (e: any) => {
    setIsPanField(GaDataValidator.isPanValid(e.target.value));
    setPanNumber(e.target.value);
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
                  Are you sure you want to confirm the Pan Number ?
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
          {fetchedCustomer?.panNumber && (
            <div style={{ width: "120px", marginTop: "12px" }}>
              <label style={{ color: "#79747E" }}>
                <Typography fontSize={16} color="inherit">
                  PAN Number
                </Typography>
              </label>
            </div>
          )}
          <div>
            {fetchedCustomer?.panNumber && (
              <OutlinedInput
                size="small"
                sx={{
                  mb: "15px",
                  width: "240px",
                }}
                fullWidth
                disabled
                id="outlined-adornment-password"
                value={fetchedCustomer?.panNumber}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      disabled={fetchedCustomer?.identification?.pan.sources.includes(
                        "data_entry_profiler"
                      )}
                      aria-label="verify"
                      edge="end"
                      onClick={() => {
                        handleClickOpen();
                      }}
                    >
                      {fetchedCustomer?.identification?.pan.sources.includes(
                        "data_entry_profiler"
                      ) ? (
                        <CheckCircleOutlineIcon color="success" />
                      ) : (
                        <ReportGmailerrorredIcon color="warning" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Pan Number"
              ></OutlinedInput>
            )}

            <div>
              {showPanNumber && (
                <div>
                  <TextField
                    size="small"
                    error={!isPanField}
                    helperText={
                      !isPanField && "Please enter the valid PAN number"
                    }
                    required
                    label="Pan Number"
                    sx={{ mb: "15px", width: "200px" }}
                    type="string"
                    onChange={(e) => {
                      handlePanFieldsChange(e);
                    }}
                    value={panNumber}
                  />
                  <IconButton
                    onClick={() => {
                      setShowPanNumber(false);
                      setPanNumber("");
                    }}
                  >
                    <RemoveCircleOutline
                      color="error"
                      sx={{ marginTop: "8px" }}
                    />
                  </IconButton>
                </div>
              )}

              {!showPanNumber && !fetchedCustomer?.panNumber && (
                <div style={{ marginBottom: "18px", width: "294px" }}>
                  <Button
                    color="warning"
                    disabled={
                      fetchedCustomer?.firmNames?.find(
                        (val) => val?.verification?.status === "verified"
                      ) === undefined &&
                      fetchedCustomer?.contacts?.find(
                        (val) => val?.verification?.status === "verified"
                      ) === undefined
                    }
                    onClick={() => setShowPanNumber(true)}
                    variant="text"
                  >
                    <Add color="inherit" />
                    <Typography fontSize={13} color="inherit">
                      Add Pan Number
                    </Typography>
                  </Button>
                  <div style={{ paddingLeft: "10px", marginRight: "50px" }}>
                    <span>
                      <Typography color="primary.info">
                        {fetchedCustomer?.firmNames?.find(
                          (val) => val?.verification?.status === "verified"
                        ) === undefined &&
                          fetchedCustomer?.contacts?.find(
                            (val) => val?.verification?.status === "verified"
                          ) === undefined && (
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
                                PAN can be added only if firm name or contact
                                number is verified
                              </Typography>
                            </>
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

export default PanField;
