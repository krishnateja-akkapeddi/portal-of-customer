import { createElement } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import indexRoutes, { pageRoutes } from "./Routes";

function App() {
  return (
    <Routes>
      {/* 
      * Todo: 
      <Route path="/" element={<Navigate to={pageRoutes.authenticate} />} /> */}
      {indexRoutes.map((prop, key) => {
        return (
          <Route key={key} path={prop.path} element={prop.component}></Route>
        );
      })}
    </Routes>
  );
}

export default App;
