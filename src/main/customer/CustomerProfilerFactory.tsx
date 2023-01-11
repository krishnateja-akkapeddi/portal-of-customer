import { useEffect } from "react";
import {
  AUTH_HEADER_CUSTOMERSERVICE,
  AUTH_TOKEN_KEY,
  CUSTOMER_PROFILER_API_URL,
  DEPT_AUTH_TOK,
  MASTERS_URL,
} from "../../Base";
import { RemoteCreateBatch } from "../../data/usecases/customers/RemoteCreateBatch";
import { RemoteEndBatch } from "../../data/usecases/customers/RemoteEndBatch";
import { RemoteFetchBatchSizes } from "../../data/usecases/customers/RemoteFetchBatch";
import { RemoteFetchCustomers } from "../../data/usecases/customers/RemoteFetchCustomers";
import { RemoteFetchDepartments } from "../../data/usecases/customers/RemoteFetchDepartments";
import { RemoteFetchImageRejectionReasons } from "../../data/usecases/customers/RemoteFetchRejectionReasons";
import { RemoteFetchSingleCustomer } from "../../data/usecases/customers/RemoteFetchSingleCustomer";
import { RemoteFetchStates } from "../../data/usecases/customers/RemoteFetchStates";
import { RemotePostAdditionalDetails } from "../../data/usecases/customers/RemotePostAdditionalDetails";
import { RemoteRejectImage } from "../../data/usecases/customers/RemotRejectImage";
import { RemoteVerifyContact } from "../../data/usecases/customers/RemoteVerifyContact";
import { RemoteVerifyFirmName } from "../../data/usecases/customers/RemoteVerifyFirmname";
import { RemoteVerifyGst } from "../../data/usecases/customers/RemoteVerifyGst";
import { RemoteVerifyPan } from "../../data/usecases/customers/RemoteVerifyPan";

import Endpoints from "../../domain/Endpoints";

import { AxiosHttpClient } from "../../infra/http/AxiosHttpClient";
import { LocalJsonStorage } from "../../infra/http/LocalJsonStorage";
import CustomerValidationPage from "../../presentation/pages/CustomerProfiler";

const CustomerProfilerFactory = () => {
  const storage = LocalJsonStorage.getInstance();
  const token = storage.get(AUTH_TOKEN_KEY);

  const customerServiceAxiosHttpClient = AxiosHttpClient.getInstance();
  customerServiceAxiosHttpClient.setAuthHeaders({
    [AUTH_HEADER_CUSTOMERSERVICE]: `Bearer ${token}`,
  });
  const masterServiceAxiosHttpClient = AxiosHttpClient.getInstance();
  masterServiceAxiosHttpClient.setAuthHeaders({
    [AUTH_HEADER_CUSTOMERSERVICE]: `Bearer ${DEPT_AUTH_TOK}`,
  });
  const remoteFetchCustomers = new RemoteFetchCustomers(
    `${CUSTOMER_PROFILER_API_URL}${Endpoints.FETCH_CUSTOMERS}`,
    customerServiceAxiosHttpClient
  );
  const remoteGetCustomerById = new RemoteFetchSingleCustomer(
    `${CUSTOMER_PROFILER_API_URL}${Endpoints.GET_CUSTOMER_BY_ID}`,
    customerServiceAxiosHttpClient
  );
  const remoteFetchImageRejectionReasons = new RemoteFetchImageRejectionReasons(
    `${CUSTOMER_PROFILER_API_URL}${Endpoints.GET_IMAGE_REJECTION_REASONS}`,
    customerServiceAxiosHttpClient
  );
  const remoteVerifyContact = new RemoteVerifyContact(
    `${CUSTOMER_PROFILER_API_URL}${Endpoints.VERIFY_CONTACT}`,
    customerServiceAxiosHttpClient
  );
  const remoteVerifyFirmName = new RemoteVerifyFirmName(
    `${CUSTOMER_PROFILER_API_URL}${Endpoints.VERIFY_FIRMNAME}`,
    customerServiceAxiosHttpClient
  );
  const remoteVerifyGst = new RemoteVerifyGst(
    `${CUSTOMER_PROFILER_API_URL}${Endpoints.VERIFY_GST_NUM}`,
    customerServiceAxiosHttpClient
  );
  const remoteVerifyPan = new RemoteVerifyPan(
    `${CUSTOMER_PROFILER_API_URL}${Endpoints.VERIFY_PAN_NUM}`,
    customerServiceAxiosHttpClient
  );
  const remoteRejectImage = new RemoteRejectImage(
    `${CUSTOMER_PROFILER_API_URL}${Endpoints.REJECT_IMAGE}`,
    customerServiceAxiosHttpClient
  );
  const remoteAddBasicFields = new RemotePostAdditionalDetails(
    `${CUSTOMER_PROFILER_API_URL}${Endpoints.ADD_ADDITIONAL_FIELDS}`,
    customerServiceAxiosHttpClient
  );
  const remoteCreateBatch = new RemoteCreateBatch(
    `${CUSTOMER_PROFILER_API_URL}${Endpoints.CREATE_BATCH}`,
    customerServiceAxiosHttpClient
  );
  const remoteEndBatch = new RemoteEndBatch(
    `${CUSTOMER_PROFILER_API_URL}${Endpoints.END_BATCH}`,
    customerServiceAxiosHttpClient
  );

  const remoteFetchBatches = new RemoteFetchBatchSizes(
    `${CUSTOMER_PROFILER_API_URL}${Endpoints.BATCH_SIZE}`,
    customerServiceAxiosHttpClient
  );

  useEffect(() => {
    if (!token) window.location.replace("/");
    return;
  }, [token]);

  return (
    <CustomerValidationPage
      fetchBatches={remoteFetchBatches}
      fetchImageRejectionReasons={remoteFetchImageRejectionReasons}
      fetchCustomers={remoteFetchCustomers}
      fetchSingleCustomer={remoteGetCustomerById}
      verifyContact={remoteVerifyContact}
      verifyFirmName={remoteVerifyFirmName}
      rejectImage={remoteRejectImage}
      additionalFields={remoteAddBasicFields}
      verifyGst={remoteVerifyGst}
      verifyPan={remoteVerifyPan}
      createBatch={remoteCreateBatch}
      endBatch={remoteEndBatch}
    />
  );
};

export default CustomerProfilerFactory;
