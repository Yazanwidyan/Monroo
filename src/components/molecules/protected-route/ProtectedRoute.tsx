import { useContext, useMemo, ReactNode, FC } from "react";
import { Navigate } from "react-router-dom";

import { AdminRole } from "../../../models/AdminInfo";
import {
  AdminContext,
  AdminContextType,
} from "../../../contexts/admin-context/AdminContext";

type ProtectedRouteProps = {
  allowedRoles: AdminRole[];
  redirectPath: string;
  children: ReactNode
};

const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  const { adminInfo } = useContext(AdminContext) as AdminContextType;

  const isAuthorized = useMemo(() => {
    if(!adminInfo) return false;

    return props.allowedRoles.includes(adminInfo?.role)
  }, [adminInfo, props.allowedRoles]);

  return (isAuthorized ? <>{props.children}</> : <Navigate to={props.redirectPath} />)
}

export default ProtectedRoute;
