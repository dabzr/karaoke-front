import { useIsHost } from "../../hooks/useIsHost";
import { Loading } from "../Loading/index";
import { ElementType } from "react";
import { Navigate } from "react-router-dom";
import { useIsUser } from "../../hooks/useIsUser";

type Props = {
  Component: ElementType;
  type?: "user" | "host";
}

export function ProtectedRoute({
  Component,
  type = "host",
}: Props) {
  
  const { host, isLoading: isLoadingHost, logout } = useIsHost();
  const { isUser, isLoading: isLoadingUser } = useIsUser();

  if(isLoadingHost || isLoadingUser) return <Loading/>
  
  if(type === "host" && !host) {
    logout();
    return <Navigate to="/" replace/>
  }

  if(type === "user" && !isUser) {
    logout();
    return <Navigate to="/join" replace/>
  }

  return (
    <Component/>
  );
}
