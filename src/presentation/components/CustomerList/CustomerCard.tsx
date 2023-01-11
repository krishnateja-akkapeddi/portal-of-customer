import { Card, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import React, { useEffect, useState } from "react";

import { Customer } from "../../../domain/models/CustomerResponse";
type Props = {
  customer: Customer | any;
  getSingleCustomer: (id: Customer) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCard: React.Dispatch<React.SetStateAction<string>>;
  index: number;
  fetchedCustomer: Customer;
};

const CustomerCard: React.FC<Props> = ({
  customer,
  getSingleCustomer,
  setLoading,
  setSelectedCard,
  fetchedCustomer,
  index,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    if (isClicked === false && index === 0) {
      getSingleCustomer(customer);
      setSelectedCard(customer?._id);
    }
  }, []);
  return (
    <div
      onClick={() => {
        setLoading(true);
        getSingleCustomer(customer);
        setSelectedCard(customer?._id);
      }}
      className="cardStyles"
      style={{
        marginTop: "22px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <Card sx={{ border: "1px solid #FFDAB9" }}>
        <div
          id="cardElement"
          className="subCardStyles"
          style={{
            overflow: "hidden",
            height: "76%",
            padding: "12px 16px 12px 16px",
            backgroundColor:
              fetchedCustomer?._id === customer?._id ? "#FFECE1" : "#ffff",
          }}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            <div style={{ width: "85%" }} className=" inline">
              <Typography fontSize={12}>
                {customer?.firmNames[0]?.name?.toUpperCase() ??
                  "No Existing Firm Names"}
              </Typography>
            </div>
          </div>

          <div style={{ marginTop: "16px" }}>
            <Chip label="Pending" variant="outlined" color="secondary" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CustomerCard;
