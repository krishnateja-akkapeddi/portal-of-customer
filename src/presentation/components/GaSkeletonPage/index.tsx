import React from "react";
import Skeleton from "@mui/material/Skeleton";

import { Box, Chip, Typography } from "@mui/material";
type Props = {};

const SkeletonPage = (props: Props) => {
  return (
    <div
      id="rightDiv"
      className="stylishScroll"
      style={{
        padding: "36px 10px 0px 32px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px 80px 20px 40px",
        }}
      >
        <div style={{ paddingTop: "0px" }}>
          <div style={{ paddingRight: "0px" }}>
            <div
              className="inline"
              style={{ float: "right", paddingBottom: "21px" }}
            >
              <Skeleton animation="wave" height={50}>
                <Chip
                  label="Pending to Validate"
                  variant="outlined"
                  color="secondary"
                />
              </Skeleton>
            </div>
          </div>
          <div className=" inline">
            <Skeleton animation="wave">
              <Typography>Customer Summary</Typography>
            </Skeleton>
          </div>
        </div>

        <br />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="60%"
          sx={{ paddingLeft: "40%" }}
          height={300}
        />
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            marginRight: "2rem",
            marginTop: "1rem",
          }}
        >
          <Skeleton width={200} height={30} />
        </div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            marginRight: "1rem",
            marginTop: "8px",
          }}
        >
          <Skeleton width={30} height={20} />
        </div>
        <br />
        <Box
          marginLeft={10}
          display="flex"
          flexDirection="row"
          alignContent="center"
          gap={10}
        >
          <div className=" inline">
            <Skeleton height={60} width={250} />
          </div>
          <div className=" inline">
            <Skeleton height={60} width={250} />
          </div>
        </Box>
        <div>
          <br />

          <Skeleton animation="wave" width="70%" height="60px" />
          <Skeleton animation="wave" width="70%" height="60px" />
        </div>
        <br />
        <div className="inline" style={{ marginRight: "30px" }}>
          <Skeleton height={60} width={250} />
        </div>
        <div className="inline">
          <Skeleton height={60} width={250} />
        </div>
        <br />
        <br />
        <br />

        <div>
          <Skeleton width="100%" height={70} animation="wave">
            <Typography>Customer Summary</Typography>
          </Skeleton>
        </div>
        <div />
      </div>
    </div>
  );
};

export default SkeletonPage;
