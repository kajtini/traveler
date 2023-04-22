import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";

const ProtectedRoutes = () => {
  const user = useAppSelector(selectUser);

  const auth = !!user;

  return auth ? <Outlet /> : <Navigate to="/signUp" />;
};

export default ProtectedRoutes;
