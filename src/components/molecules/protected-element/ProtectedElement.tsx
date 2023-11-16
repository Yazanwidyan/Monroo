import { useContext, useMemo, ReactNode } from "react";
import { AdminRole } from "../../../models/AdminInfo";
import {
  AdminContext,
  AdminContextType,
} from "../../../contexts/admin-context/AdminContext";

type ProtectedElementProps = {
  children: ReactNode;
  element?: ReactNode;
  allowedRoles: AdminRole[];
};

export default function ProtectedElement({
  element = <></>,
  ...props
}: ProtectedElementProps) {
  const { adminInfo } = useContext(AdminContext) as AdminContextType;

  const isAuthorized = useMemo(() => {
    if (!adminInfo) return false;

    return props.allowedRoles.includes(adminInfo?.role);
  }, [adminInfo, props.allowedRoles]);

  return isAuthorized ? <>{props.children}</> : <>{element}</>;
}
