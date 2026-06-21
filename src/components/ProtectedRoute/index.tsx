import { useIsHost } from "../../hooks/useIsHost";
import { Loading } from "../Loading/index";
import { ElementType } from "react";
import { Navigate } from "react-router-dom";
import { profileRoute } from "../../utils/routes";

type Props = {
  Component: ElementType;
}

export function ProtectedRoute({
  Component,
}: Props) {
  
  const { host, room, isLoading, logout } = useIsHost();

  if(isLoading) return <Loading/>
  
  if(!host) {
    logout();
    return <Navigate to="/" replace/>
  }

  return (
    <Component/>
  );
}
