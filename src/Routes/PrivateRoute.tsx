import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const userInfo = useSelector((state: AppState) => state?.auth?.data);
  return userInfo?.email !== "" ? (
    <Outlet />
  ) : (
    <>
      <Navigate to={`${process.env.PUBLIC_URL}/`} />
      <Navigate to={`${process.env.PUBLIC_URL}/login`} />
    </>
  );
};

export default PrivateRoute;
