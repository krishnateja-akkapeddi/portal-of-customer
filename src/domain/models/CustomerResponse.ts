import { ErrorEntity } from "./Errors";

export type Customer = {
  _id: string;
  firmNames: [
    {
      verification?: { status: string };
      name: string;
      source: string;
      _id: string;
    }
  ];
  contacts: [
    {
      verification?: { status: string };
      type: string;
      value: string;
      status: string;
      source: string;
      _id: string;
    }
  ];
  images: {
    type: string;
    uuid: string;
    status: string;
    source: string;
    _id: string;
    url?: string;
    verification?: {
      status: string;
    };
  }[];
  identification?: {
    _id: string;
    customer: string;
    gst: {
      gst: string;
      status: string;
      sources: [string];
    };
    pan: {
      pan: string;
      status: string;
      sources: [string];
    };
  };
  gstNumber: string | null;
  panNumber: string | null;
};

export type FetchedCustomerResponse = {
  success: boolean;
  data: Customer;
  errors?: ErrorEntity[];
};
