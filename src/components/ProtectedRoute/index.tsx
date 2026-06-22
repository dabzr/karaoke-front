import { useIsHost } from "../../hooks/useIsHost";
import { Loading } from "../Loading/index";
import { ElementType } from "react";
import { Navigate } from "react-router-dom";
import { useIsUser } from "../../hooks/useIsUser";
import { joinRoute } from "../../utils/routes";

type Props = {
  Component: ElementType;
  type?: "user" | "host";
}

export function ProtectedRoute({
  Component,
  type = "host",
}: Props) {
  
  const { isHost, isLoading: isLoadingHost } = useIsHost();
  const { isUser, isLoading: isLoadingUser } = useIsUser();

  if(isLoadingHost || isLoadingUser && (isHost === null || isUser === null)) return <Loading/>

  if(type === "host" && !isHost) return <Navigate to="/" replace/>

  if(type === "user" && !isUser) return <Navigate to={joinRoute} replace/>

  return (
    <Component/>
  );
}
