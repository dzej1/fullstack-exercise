import { Navigate } from "react-router";
import { useUser } from "../../../hooks";

function RequireAuth({
  children,
  admin,
}: {
  children: JSX.Element;
  admin: boolean;
}) {
  const { isLogged, isAdmin } = useUser();

  if (admin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return isLogged ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;
