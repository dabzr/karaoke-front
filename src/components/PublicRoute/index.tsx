import { useIsHost } from "../../hooks/useIsHost";
import { useIsUser } from "../../hooks/useIsUser";
import { Loading } from "../Loading/index";
import { ElementType } from "react";
import { Navigate } from "react-router-dom";
import { managerRoomRoute, profileRoute, roomRoute } from "../../utils/routes";

type Props = {
  Component: ElementType;
}

export function PublicRoute({
  Component,
}: Props) {
  
  const { isHost, isLoading: isHostLoading, room } = useIsHost();
  const { isUser, isLoading: isLoadingUser, code } = useIsUser();
  const isLoading = isHostLoading || isLoadingUser;

  if(isLoading && (isHost === null || isUser === null)) return <Loading/>

  if(isHost) return <Navigate to={room ? `${managerRoomRoute}/${room.code}` : profileRoute } replace/>
  if(isUser) return <Navigate to={`${roomRoute}/${code}`} replace/>

  return (
    <Component/>
  );
}
