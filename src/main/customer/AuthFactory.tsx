import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "../../Base";
import { LocalJsonStorage } from "../../infra/http/LocalJsonStorage";
import { pageRoutes } from "../../Routes";
import Swal from "sweetalert2";
import AuthenticationPage from "../../presentation/pages/AuthenticationPage";

const AuthFactory = () => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const authToken = new URLSearchParams(search).get("Authorization");

  useEffect(() => {
    if (authToken) {
      const storage = LocalJsonStorage.getInstance();
      storage.add(AUTH_TOKEN_KEY, authToken);
      navigate(pageRoutes.customerProfiling);
    } else {
      Swal.fire("Authentication Failed", "", "error");
    }
  }, []);

  return (
    <>
      <div>
        <AuthenticationPage />
      </div>
    </>
  );
};

export default AuthFactory;
