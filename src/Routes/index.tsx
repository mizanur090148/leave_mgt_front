import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LayoutRoutes from "./LayoutRoutes";
import { authRoutes } from "./AuthRoutes";
import Login from "../Componant/Authentication/Login";
import Signup from "../Componant/Authentication/Signup";
import { useSelector } from "react-redux";

const RouterData = () => {
  const login = localStorage.getItem("token");
  //const userInfo = useSelector((state: AppState) => state?.auth?.data);

  return (
    <BrowserRouter basename={"/"}>
      <Routes>
        {login ? (
          <>
            <Route
              path={`${process.env.PUBLIC_URL}` || "/"}
              element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard`} />}
            />
          </>
        ) : (
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Login />} />
        )}
        <Route path={"/"} element={<PrivateRoute />}>
          <Route path={`/*`} element={<LayoutRoutes />} />
        </Route>
        {authRoutes.map(({ path, Component }, i) => (
          <Route path={path} element={Component} key={i} />
        ))}
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Login />} />
        <Route path={`${process.env.PUBLIC_URL}/login`} element={<Login />} />
        <Route path={`${process.env.PUBLIC_URL}/signup`} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterData;
