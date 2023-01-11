import React, { useCallback, useEffect, useState } from "react";
import { FetchCustomers } from "../../domain/usages/customers/FetchCustomers";
import CustomersList from "../components/CustomerList";
import SingleCustomerDetails from "../components/SingleCustomerDetails";
import TobeBuilt from "../components/ToBeBuilt";
import { Customer } from "../../domain/models/CustomerResponse";
import { RemoteFetchSingleCustomer } from "../../data/usecases/customers/RemoteFetchSingleCustomer";
import { RemoteFetchImageRejectionReasons } from "../../data/usecases/customers/RemoteFetchRejectionReasons";
import { ImageRejectionReasonEntity } from "../../domain/models/ImageRejectionReasons";
import { RemoteVerifyContact } from "../../data/usecases/customers/RemoteVerifyContact";
import { RemoteVerifyFirmName } from "../../data/usecases/customers/RemoteVerifyFirmname";
import { RemoteVerifyPan } from "../../data/usecases/customers/RemoteVerifyPan";
import { RemoteVerifyGst } from "../../data/usecases/customers/RemoteVerifyGst";

import { RemoteRejectImage } from "../../data/usecases/customers/RemotRejectImage";
import { RemotePostAdditionalDetails } from "../../data/usecases/customers/RemotePostAdditionalDetails";
import { fetchedCustomers } from "../../domain/models/CustomersResponse";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import SkeletonPage from "../components/GaSkeletonPage";
import SelectBatch from "../components/SelectBatch";
import { CreateBatch } from "../../domain/usages/customers/CreateBatch";
import { EndBatch } from "../../domain/usages/customers/EndBatch";
import { FetchBatchSizes } from "../../domain/usages/customers/BatchSizes";

type Props = {
  fetchCustomers: FetchCustomers;
  fetchSingleCustomer: RemoteFetchSingleCustomer;
  fetchImageRejectionReasons: RemoteFetchImageRejectionReasons;
  verifyContact: RemoteVerifyContact;
  verifyFirmName: RemoteVerifyFirmName;
  rejectImage: RemoteRejectImage;
  additionalFields: RemotePostAdditionalDetails;
  verifyGst: RemoteVerifyGst;
  verifyPan: RemoteVerifyPan;
  createBatch: CreateBatch;
  endBatch: EndBatch;
  fetchBatches: FetchBatchSizes;
};

const CustomerValidationPage: React.FC<Props> = ({
  fetchCustomers,
  fetchSingleCustomer,
  fetchImageRejectionReasons,
  verifyContact,
  rejectImage,
  verifyFirmName,
  additionalFields,
  verifyGst,
  verifyPan,
  createBatch,
  endBatch,
  fetchBatches,
}) => {
  const [fetchedCustomer, setFetchedCustomer] = useState<Customer>(
    {} as Customer
  );
  const [isBatchSelected, setIsBatchSelected] = useState<boolean>(false);
  const [completedItem, setCompletedItem] = useState<Customer>();
  const [customerList, setCustomerList] = useState<fetchedCustomers>([]);
  const [batches, setBatches] = useState();
  const [updateCustomerList, setUpdateCustomerList] = useState<boolean>(false);

  const [imageRejectionReasons, setImageRejectionReasons] = useState<
    ImageRejectionReasonEntity[]
  >([] as ImageRejectionReasonEntity[]);

  const [loading, setLoading] = useState(true);

  const getSingleCustomer = async (
    singleCustomerDetails: Customer | any,
    noLoading?: boolean
  ) => {
    noLoading && setLoading(true);
    const params = {};
    try {
      const response = await fetchSingleCustomer.fetch(
        singleCustomerDetails._id,
        params
      );
      setFetchedCustomer(response.data);
      setLoading(false);
    } catch (err) {
      Swal.fire({ text: "Unable to fetch States", icon: "error" });
    }
  };

  const getImageRejectionReasons = useCallback(async () => {
    const params = {};
    try {
      const response = await fetchImageRejectionReasons.fetch(params);
      setImageRejectionReasons(response?.data?.reasons);
    } catch (err) {
      Swal.fire({ text: "Unable to fetch States", icon: "error" });
    }
  }, [fetchCustomers]);

  useEffect(() => {
    getImageRejectionReasons();
  }, [fetchCustomers]);

  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <SelectBatch
        isBatchSelected={isBatchSelected}
        setIsBatchSelected={setIsBatchSelected}
      />
      <Grid container spacing={2}>
        <Grid item xs={2.5}>
          <CustomersList
            isBatchSelected={isBatchSelected}
            completedItem={completedItem}
            updateCustomerList={updateCustomerList}
            fetchCustomers={fetchCustomers}
            setLoading={setLoading}
            getSingleCustomer={getSingleCustomer}
            customerList={customerList}
            setCustomerList={setCustomerList}
            fetchedCustomer={fetchedCustomer}
          />
        </Grid>
        <Grid sx={{ paddingTop: "3px" }} item xs={7}>
          {isBatchSelected && !loading ? (
            <SingleCustomerDetails
              isBatchSelected={isBatchSelected}
              customerList={customerList}
              setCompletedItem={setCompletedItem}
              setUpdateCustomerList={setUpdateCustomerList}
              verifyGst={verifyGst}
              verifyPan={verifyPan}
              postAdditionalFields={additionalFields}
              rejectImage={rejectImage}
              getSingleCustomer={getSingleCustomer}
              verifyFirmName={verifyFirmName}
              verifyContact={verifyContact}
              imageRejectionReasons={imageRejectionReasons}
              fetchedCustomer={fetchedCustomer}
            />
          ) : (
            <SkeletonPage />
          )}
        </Grid>
        <Grid item xs={2}>
          <TobeBuilt />
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomerValidationPage;
