import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  Dialog,
  DialogContent,
  Button,
  CircularProgress,
  DialogActions,
  Box,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { Customer } from "../../../../domain/models/CustomerResponse";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ReportGmailerrorredIcon from "@mui/icons-material/ErrorOutline";
import { RemoteVerifyContact } from "../../../../data/usecases/customers/RemoteVerifyContact";
import Swal from "sweetalert2";
import { Add, Close, Error } from "@mui/icons-material";
import { RemoteVerifyFirmName } from "../../../../data/usecases/customers/RemoteVerifyFirmname";
import { FieldType } from "../../../../domain/enums/FieldTypes";
import { FetchState } from "../../../../domain/enums/FetchState";
import { GaDataValidator } from "@goapptiv/data-validator";
type Props = {
  fetchedCustomer: Customer;
  verifyContact: RemoteVerifyContact;
  verifyFirmName: RemoteVerifyFirmName;
  getSingleCustomer: (id: Customer, noLoading?: boolean) => void;
  setNewEmailFields: React.Dispatch<
    React.SetStateAction<
      {
        type: string;
        value: string;
      }[]
    >
  >;
  newEmailFields: {
    type: string;
    value: string;
  }[];
  newMobileFields: {
    type: string;
    value: string;
  }[];
  setNewMobileFields: React.Dispatch<
    React.SetStateAction<
      {
        type: string;
        value: string;
      }[]
    >
  >;
  newFirmFields: string[];
  setNewFirmFields: React.Dispatch<React.SetStateAction<string[]>>;
};
const ExistingCustomerFields: React.FC<Props> = ({
  fetchedCustomer,
  verifyContact,
  verifyFirmName,
  getSingleCustomer,
  newEmailFields,
  setNewEmailFields,
  newMobileFields,
  setNewMobileFields,
  newFirmFields,
  setNewFirmFields,
}) => {
  const [open, setOpen] = React.useState(false);
  const [contactId, setContactId] = React.useState<string>("");
  const [fieldType, setFieldType] = React.useState<string | undefined>("");
  const [loading, setLoading] = React.useState(FetchState.DEFAULT);
  const handleClickOpen = (contactId: string, type?: string) => {
    setOpen(true);
    setContactId(contactId);
    setFieldType(type);
  };
  async function handleConfirm() {
    const params = {};
    setLoading(FetchState.LOADING);
    try {
      if (fieldType === FieldType.FIRMNAME) {
        const data = await verifyFirmName.verify(
          fetchedCustomer._id,
          contactId,
          params
        );
        setOpen(false);
        !data.success
          ? Swal.fire({
              icon: "error",
              title: "Unable to verify firmname",
              text: data.errors
                ? data?.errors[0]?.message.toUpperCase()
                : "Something went wrong",
            })
          : Swal.fire({
              icon: "success",
              title: "Firmname Successfully Verified",
            });

        setLoading(FetchState.DEFAULT);
        getSingleCustomer(fetchedCustomer, false);
        setContactId("");
      } else {
        const data = await verifyContact.verify(
          fetchedCustomer._id,
          contactId,
          params
        );
        setOpen(false);
        !data.success
          ? Swal.fire({
              icon: "error",
              title: "Unable to verify contact",
              text: data?.errors
                ? data?.errors[0].message.toUpperCase()
                : "Something went wrong",
            })
          : Swal.fire({
              icon: "success",
              title: "Contact Successfully Verified",
            });
        setLoading(FetchState.DEFAULT);
        getSingleCustomer(fetchedCustomer);
      }
    } catch (error) {
      setLoading(FetchState.DEFAULT);
    }
  }
  useEffect(() => {}, [fetchedCustomer]);
  return (
    <Grid container>
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
                Do you want to confirm the
                {fieldType === FieldType.FIRMNAME ? " Firm Name " : " Contact"}?
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

      <div style={{ width: "100%" }}>
        {fetchedCustomer?.firmNames?.map((val) => {
          const type = "firmName";
          return (
            <OutlinedInput
              key={val._id}
              size="small"
              disabled
              fullWidth
              className="stylishScroll"
              sx={{
                mb: "15px",
                padding: "2px",
                overflowX: "clip",
                fontSize: "13px",
              }}
              id="outlined-adornment-password"
              value={val.name}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    disabled={val.verification?.status === "verified"}
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() => {
                      handleClickOpen(val._id, type);
                    }}
                  >
                    {val.verification?.status === "verified" ? (
                      <CheckCircleOutlineIcon color="success" />
                    ) : (
                      <ReportGmailerrorredIcon color="warning" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          );
        })}

        <div>
          {newFirmFields.map((firmField, index) => {
            if (index !== 0)
              return (
                <Box key={index} display="flex">
                  <div>
                    <TextField
                      required
                      name="FirmName"
                      value={newFirmFields[index]}
                      size="small"
                      label="Firm Name"
                      onChange={(e) => {
                        setNewFirmFields((current) =>
                          current.map((string, i) => {
                            if (i === index) {
                              return e.target.value;
                            }
                            return string;
                          })
                        );
                      }}
                    />
                  </div>
                  <div>
                    <IconButton
                      onClick={() => {
                        setNewFirmFields((current) =>
                          current.filter((obj, ind) => {
                            return ind !== index;
                          })
                        );
                      }}
                      sx={{ display: "inline" }}
                    >
                      <Close />
                    </IconButton>
                  </div>
                </Box>
              );
          })}

          <Button
            disabled={
              fetchedCustomer?.firmNames?.find(
                (val) => val?.verification?.status === "verified"
              ) === undefined &&
              fetchedCustomer?.contacts?.find(
                (val) => val?.verification?.status === "verified"
              ) === undefined &&
              !fetchedCustomer.identification?.gst.sources.includes(
                "data_entry_profiler"
              ) &&
              !fetchedCustomer.identification?.pan.sources.includes(
                "data_entry_profiler"
              )
            }
            color="warning"
            onClick={() => {
              setNewFirmFields((current) => [...current, ""]);
            }}
          >
            <Add color="inherit" />
            <Typography fontSize={13} color="inherit">
              Add Firm Name
            </Typography>
          </Button>
        </div>
      </div>
      <Box width="100%" display="flex" gap={7} flexDirection="row">
        <div style={{ width: "40%" }}>
          {fetchedCustomer?.contacts?.map((val) => {
            if (val.type === "mobile") {
              return (
                <OutlinedInput
                  key={val._id}
                  size="small"
                  fullWidth
                  className="stylishScroll"
                  sx={{
                    mb: "15px",
                    overflowX: "clip",
                    fontSize: "16px",
                  }}
                  disabled
                  id="outlined-adornment-password"
                  value={val.value}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        disabled={val.verification?.status === "verified"}
                        edge="end"
                        size="small"
                        onClick={() => handleClickOpen(val._id, val.type)}
                      >
                        {val.verification?.status === "verified" ||
                        !val.verification === null ? (
                          <CheckCircleOutlineIcon color="success" />
                        ) : (
                          <ReportGmailerrorredIcon color="warning" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              );
            }
          })}

          <div>
            {newMobileFields.map((mobileField, index) => {
              if (index !== 0)
                return (
                  <Box key={index} display="flex">
                    <div>
                      <TextField
                        required
                        error={
                          !GaDataValidator.isMobileNumberValid(
                            newMobileFields[index]?.value
                          )
                        }
                        value={newMobileFields[index]?.value}
                        size="small"
                        label="Mobile"
                        type="number"
                        helperText={
                          !GaDataValidator.isMobileNumberValid(
                            newMobileFields[index]?.value
                          ) && "Enter a valid 10 digit mobile number"
                        }
                        onChange={(e) => {
                          setNewMobileFields((current) =>
                            current.map((obj, i) => {
                              if (i === index) {
                                return {
                                  ...obj,
                                  type: "mobile",
                                  value: e.target.value,
                                };
                              }
                              return obj;
                            })
                          );
                          GaDataValidator.isMobileNumberValid(
                            newMobileFields[index]?.value
                          );
                        }}
                      />
                    </div>
                    <div>
                      <IconButton
                        onClick={() => {
                          setNewMobileFields((current) =>
                            current.filter((obj, ind) => {
                              return ind !== index;
                            })
                          );
                        }}
                        sx={{ display: "inline" }}
                      >
                        <Close />
                      </IconButton>
                    </div>
                  </Box>
                );
            })}

            <Button
              disabled={
                fetchedCustomer?.firmNames?.find(
                  (val) => val?.verification?.status === "verified"
                ) === undefined &&
                fetchedCustomer?.contacts?.find(
                  (val) => val?.verification?.status === "verified"
                ) === undefined &&
                !fetchedCustomer.identification?.gst.sources.includes(
                  "data_entry_profiler"
                ) &&
                !fetchedCustomer.identification?.pan.sources.includes(
                  "data_entry_profiler"
                )
              }
              color="warning"
              onClick={() => {
                setNewMobileFields((current) => [
                  ...current,
                  { value: "", type: "mobile" },
                ]);
              }}
            >
              <Add color="inherit" />
              <Typography fontSize={13} color="inherit">
                Add Mobile Number
              </Typography>
            </Button>
          </div>
        </div>
        <div style={{ width: "47%" }}>
          {fetchedCustomer?.contacts?.map((val) => {
            if (val.type === "email") {
              return (
                <OutlinedInput
                  key={val._id}
                  sx={{
                    mb: "15px",
                    fontSize: "14px",
                  }}
                  size="small"
                  fullWidth
                  disabled
                  id="outlined-adornment-password"
                  value={val.value}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        disabled={val?.verification?.status === "verified"}
                        aria-label="verify"
                        edge="end"
                        onClick={() => {
                          handleClickOpen(val._id, val.type);
                        }}
                      >
                        {val.verification?.status === "verified" ? (
                          <CheckCircleOutlineIcon color="success" />
                        ) : (
                          <ReportGmailerrorredIcon color="warning" />
                        )}{" "}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              );
            }
          })}

          <div>
            {newEmailFields.map((emailField, index) => {
              if (index !== 0)
                return (
                  <Box key={index} display="flex">
                    <div>
                      <TextField
                        required
                        error={
                          !GaDataValidator.isEmailValid(
                            newEmailFields[index]?.value
                          )
                        }
                        helperText={
                          !GaDataValidator.isEmailValid(
                            newEmailFields[index]?.value
                          ) && "Enter a valid email address"
                        }
                        value={newEmailFields[index]?.value}
                        size="small"
                        label="email"
                        type="email"
                        onChange={(e) => {
                          setNewEmailFields((current) =>
                            current.map((obj, i) => {
                              if (i === index) {
                                return {
                                  ...obj,
                                  type: "email",
                                  value: e.target.value,
                                };
                              }

                              return obj;
                            })
                          );
                          GaDataValidator.isEmailValid(
                            newEmailFields[index]?.value
                          );
                        }}
                      />
                    </div>
                    <div>
                      <IconButton
                        onClick={() => {
                          setNewEmailFields((current) =>
                            current.filter((obj, ind) => {
                              return ind !== index;
                            })
                          );
                        }}
                        sx={{ display: "inline" }}
                      >
                        <Close />
                      </IconButton>
                    </div>
                  </Box>
                );
            })}

            <Button
              disabled={
                fetchedCustomer?.firmNames?.find(
                  (val) => val?.verification?.status === "verified"
                ) === undefined &&
                fetchedCustomer?.contacts?.find(
                  (val) => val?.verification?.status === "verified"
                ) === undefined &&
                !fetchedCustomer.identification?.gst.sources.includes(
                  "data_entry_profiler"
                ) &&
                !fetchedCustomer.identification?.pan.sources.includes(
                  "data_entry_profiler"
                )
              }
              color="warning"
              onClick={() => {
                setNewEmailFields((current) => [
                  ...current,
                  { value: "", type: "email" },
                ]);
              }}
            >
              <Add color="inherit" />
              <Typography fontSize={13} color="inherit">
                Add Email Id
              </Typography>
            </Button>
          </div>
        </div>
      </Box>
    </Grid>
  );
};

export default ExistingCustomerFields;
