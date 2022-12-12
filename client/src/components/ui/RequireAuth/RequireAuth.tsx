import { Navigate } from "react-router";
import { useUser } from "../../../hooks";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isLogged } = useUser();

  return isLogged ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;
