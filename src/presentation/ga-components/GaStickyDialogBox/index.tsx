import React from "react";
import { createStyles, IconButton, makeStyles } from "@mui/material";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { Button, Typography } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import Resizable from "react-resizable-box";

type Props = {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  height: string;
};
export const DraggableDialogBox: React.FC<Props> = ({
  children,
  open,
  setOpen,
  height,
}) => {
  const position = { x: 550, y: 50 };

  return (
    <div>
      {open && (
        <Draggable
          bounds="body"
          handle="#draggable-dialog-title"
          defaultPosition={position}
        >
          <Paper
            sx={{
              position: "fixed",
              zIndex: 90,
            }}
            elevation={20}
          >
            <div
              id="draggable-dialog-title"
              style={{ backgroundColor: "#FFF7E7", cursor: "move" }}
            >
              <IconButton onClick={() => setOpen(false)}>
                <CloseOutlined color="error" style={{ cursor: "pointer" }} />
              </IconButton>
            </div>
            <div style={{ padding: "20px", position: "relative" }}>
              {children}
            </div>
          </Paper>
        </Draggable>
      )}
    </div>
  );
};
export default DraggableDialogBox;
