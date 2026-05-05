import { useIsHost } from "../../hooks/useIsHost";
import { Loading } from "../Loading/index";
import { ElementType } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  Component: ElementType;
}

export function ProtectedRoute({
  Component
}: Props) {
  
  const { isHost, isLoading, error, logout } = useIsHost();

  if(isLoading) return <Loading/>
  
  if(!isHost) {
    logout();
    return <Navigate to="/" replace/>
  }

  return (
    <Component/>
  );
}
