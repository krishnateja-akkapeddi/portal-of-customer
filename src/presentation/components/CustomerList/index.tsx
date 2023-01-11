import React, { useCallback, useRef, useState } from "react";
import CustomerCard from "./CustomerCard";
import { fetchedCustomers } from "../../../domain/models/CustomersResponse";
import SkeletonCard from "../GaSkeletonCard";
import { Customer } from "../../../domain/models/CustomerResponse";
import { FetchCustomers } from "../../../domain/usages/customers/FetchCustomers";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography } from "@mui/material";

type Props = {
  fetchCustomers: FetchCustomers;
  getSingleCustomer: (id: Customer) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dynamicHeight?: string;
  updateCustomerList: boolean;
  completedItem: Customer | undefined;
  customerList: fetchedCustomers;
  fetchedCustomer: Customer;
  setCustomerList: React.Dispatch<React.SetStateAction<fetchedCustomers>>;
  isBatchSelected: boolean;
};
const cardStyle = {
  maxWidth: "100%",
  paddingTop: "22px",
  borderColor: "#94D2BD",
};
const skelArr: any = [];
for (let i = 0; i <= 16; i++) {
  skelArr.push(i);
}
const CustomersList: React.FC<Props> = ({
  getSingleCustomer,
  fetchCustomers,
  setLoading,
  completedItem,
  customerList,
  setCustomerList,
  fetchedCustomer,

  isBatchSelected,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const [fetchState, setFetchState] = useState("");
  const [selectedCard, setSelectedCard] = useState("");

  const hasMoreData = () => {
    return fetchState === "success" ? currentPage < lastPage : false;
  };

  const fetchCustomersList = useCallback(
    async (page: number, scrolled?: boolean) => {
      try {
        if (!scrolled) {
          setFetchState("loading");
        }
        let result = await fetchCustomers.fetch(page.toString());
        if (result.success) {
          setCurrentPage(result.data.page);
          setLastPage(result.data.totalPages);
          setTotalCustomers(result.data.total);
          if (scrolled) {
            setCustomerList((oldData: fetchedCustomers) => [
              ...oldData,
              ...result.data.result,
            ]);
          } else {
            setCustomerList(result.data.result);
          }
          setFetchState("success");
        }
      } catch (err) {
        setFetchState("loading");
      }
    },
    []
  );
  const scrollDiv = useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    fetchCustomersList(1, false);
  }, [isBatchSelected]);
  React.useEffect(() => {
    fetchCustomersList(currentPage);
  }, []);
  React.useEffect(() => {
    if (completedItem) {
      let findInd = customerList.findIndex((customer) => {
        return (customer._id = completedItem?._id);
      });
    }
  }, [completedItem, customerList]);

  return (
    <div
      ref={scrollDiv}
      id="scrollableDiv"
      className="stylishScroll"
      style={{
        width: "19%",
        paddingRight: "24px",
        paddingBottom: " 0px",
        paddingLeft: "20px",
        // left: "20px",
        height: "100vh",
        overflowY: `${customerList?.length > 10 ? "scroll" : "auto"}`,
        backgroundColor: "white",
        position: "fixed",
        top: 0,
      }}
    >
      <div style={{ position: "relative" }}>
        <div
          className="box-shadow"
          style={{
            position: "fixed",
            zIndex: 1000,
            backgroundColor: "white",
            width: "20%",
            left: "1%",
            paddingBottom: "1%",
          }}
        ></div>

        <div
          style={{
            position: "relative",
            zIndex: 0,
            marginBottom: "10%",
          }}
        >
          {isBatchSelected ? (
            fetchState === "loading" ? (
              <div>
                {skelArr.map((val: number, ind: number) => {
                  return (
                    <div key={val} style={cardStyle}>
                      <SkeletonCard />
                    </div>
                  );
                })}
              </div>
            ) : (
              <InfiniteScroll
                scrollableTarget="scrollableDiv"
                dataLength={customerList?.length}
                next={() => {
                  fetchCustomersList(currentPage + 1, true);
                }}
                hasMore={hasMoreData()}
                endMessage={
                  <Typography
                    textAlign="center"
                    marginTop={2}
                    children="That's all for now!"
                  />
                }
                loader={
                  <>
                    <br />
                    <SkeletonCard />
                    <br />
                    <SkeletonCard /> <br />
                    <SkeletonCard />
                    <br />
                    <SkeletonCard />
                    <br />
                    <SkeletonCard />
                  </>
                }
              >
                {isBatchSelected && fetchState === "loading" ? (
                  <div style={cardStyle}>
                    <SkeletonCard />
                  </div>
                ) : (
                  customerList.map((item, index) => {
                    return (
                      <CustomerCard
                        fetchedCustomer={fetchedCustomer}
                        setSelectedCard={setSelectedCard}
                        setLoading={setLoading}
                        key={item._id}
                        index={index}
                        getSingleCustomer={getSingleCustomer}
                        customer={item}
                      />
                    );
                  })
                )}
              </InfiniteScroll>
            )
          ) : (
            <div>
              {skelArr.map((val: number, ind: number) => {
                return (
                  <div key={val} style={cardStyle}>
                    <SkeletonCard />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersList;
