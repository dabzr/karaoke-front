import { useIsHost } from "../../hooks/useIsHost";
import { Loading } from "../Loading/index";
import { ElementType } from "react";
import { Navigate } from "react-router-dom";
import { roomsRoute } from "../../utils/routes";

type Props = {
  Component: ElementType;
}

export function PublicRoute({
  Component
}: Props) {
  
  const { isHost, isLoading, error, logout } = useIsHost();

  if(isLoading) return <Loading/>
  
  if(isHost) return <Navigate to={roomsRoute} replace/>

  logout();
  return (
    <Component/>
  );
}
