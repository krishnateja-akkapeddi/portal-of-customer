const Endpoints = {
  FETCH_CUSTOMERS: "/v1/profiler/data-entry/customers/basic?page=:pageNumber",
  GET_CUSTOMER_BY_ID: "/v1/profiler/data-entry/customers/basic/id/:id",
  GET_READ_LINK: "/v1/file/:uuid",
  GET_IMAGE_REJECTION_REASONS:
    "/v1/profiler/data-entry/customers/images/rejection-reasons",
  VERIFY_CONTACT:
    "/v1/profiler/data-entry/customers/id/:customerId/contacts/:contactId/verification/verify",
  VERIFY_FIRMNAME:
    "/v1/profiler/data-entry/customers/id/:customerId/firmNames/:firmNameId/verification/verify",
  REJECT_IMAGE:
    "/v1/profiler/data-entry/customers/id/:customerId/images/:imageId/verification/reject",
  ADD_ADDITIONAL_FIELDS: "/v1/profiler/data-entry/customers/basic/id/:id",
  VERIFY_GST_NUM:
    "/v1/profiler/data-entry/customers/id/:id/gstNumber/verification/verify",
  VERIFY_PAN_NUM:
    "/v1/profiler/data-entry/customers/id/:id/panNumber/verification/verify",
  GET_DEPT: "/organizations/departments",
  GET_STATES: "/addresses/states",
  CREATE_BATCH: "/v1/profiler/data-entry/customers/batches",
  END_BATCH: "/v1/profiler/data-entry/customers/batches/complete",
  BATCH_SIZE: "/v1/profiler/data-entry/customers/batches/batch-sizes",
};

export default Endpoints;
