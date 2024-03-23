import { useMemo, ReactNode } from 'react';

type ProtectedElementProps = {
    children: ReactNode;
    element?: ReactNode;
    allowedRoles: [];
};

export default function ProtectedElement({ element = <></>, ...props }: ProtectedElementProps) {
    const {} = '';

    const isAuthorized = useMemo(() => {
        return props.allowedRoles;
    }, [props.allowedRoles]);

    return isAuthorized ? <>{props.children}</> : <>{element}</>;
}
