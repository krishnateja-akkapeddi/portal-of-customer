import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { fontSize } from "@mui/system";
type Props = {
  isBatchSelected: boolean;
  setIsBatchSelected: (isBatchSelected: boolean) => void;
};
export default function SelectBatch(props: Props) {
  const [open, setOpen] = React.useState(!props.isBatchSelected);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        PaperProps={{
          sx: {
            position: "fixed",
            top: "20%",
            left: "28%",
            m: 0,
            padding: "1rem",
          },
        }}
        maxWidth="xl"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle fontSize={18} fontWeight="bold" id="alert-dialog-title">
          Select Batch
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ color: "gray" }} fontSize={16}>
            Choose how many customers you want to verify
          </Typography>
          <br />
          <FormControl sx={{ marginBottom: "2rem" }}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="100"
                control={<Radio />}
                label="Verify 100 customers"
              />
              <FormControlLabel
                value="200"
                control={<Radio />}
                label="Verify 200 customers"
              />
              <FormControlLabel
                value="500"
                control={<Radio />}
                label="Verify 500 customers"
              />
            </RadioGroup>
          </FormControl>
          <br />
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={() => {
                props.setIsBatchSelected(true);
                setOpen(false);
              }}
              size="small"
              sx={{ marginRight: "2rem" }}
              color="warning"
              variant="contained"
            >
              Select Batch
            </Button>
            <Button onClick={() => setOpen(false)} size="small" color="error">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
