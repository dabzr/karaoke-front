import { useIsHost } from "../../hooks/useIsHost";
import { Loading } from "../Loading/index";
import { ElementType } from "react";
import { Navigate } from "react-router-dom";
import { managerRoomRoute, profileRoute } from "../../utils/routes";

type Props = {
  Component: ElementType;
}

export function PublicRoute({
  Component
}: Props) {
  
  const { host, isLoading, logout } = useIsHost();

  if(isLoading) return <Loading/>
  
  if(host) return <Navigate to={profileRoute} replace/>

  logout();
  return (
    <Component/>
  );
}
