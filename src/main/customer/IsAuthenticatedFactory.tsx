import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../../Base";
import { LocalJsonStorage } from "../../infra/http/LocalJsonStorage";
import { pageRoutes } from "../../Routes";

type Props = { children: React.ReactNode };

const IsAuthenticatedFactory = (props: Props) => {
  const { children } = props;
  const navigate = useNavigate();

  async function isAuthenticated() {
    const store = LocalJsonStorage.getInstance();
    const token = await store.get(AUTH_TOKEN_KEY);

    if (!token) {
      navigate(pageRoutes.authenticate);
    }
  }

  useEffect(() => {
    isAuthenticated();
  }, []);

  return <div>{children}</div>;
};

export default IsAuthenticatedFactory;
