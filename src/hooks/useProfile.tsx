import { useLogout } from "./useLogout";
import { useIsHost } from "./useIsHost";
import { useState } from "react";
import { usePlan } from "./usePlan";
import { useEffect } from "react";
import { createRoom } from "../services/rooms";
import { useNavigate } from "react-router-dom";
import { ICreateRoomParams } from "../mappers/room";
import { managerRoomRoute } from "../utils/routes";

export function useProfile() {

  const { handleLogout } = useLogout();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { host, room } = useIsHost();
  const { plan, buyPlan } = usePlan();
  const [planModal, setPlanModal] = useState<boolean>(false);
  const [roomModal, setRoomModal] = useState<boolean>(false);
  const navigator = useNavigate();

  useEffect(() => {
    closePlanModal();
  }, [plan])

  const openPlanModal = () => setPlanModal(true);
  const closePlanModal = () => setPlanModal(false);

  const openRoomModal = () => setRoomModal(true);
  const closeRoomModal = () => setRoomModal(false);

  const handleCreateRoom = (data: ICreateRoomParams) => {
    setIsLoading(true);
    createRoom(data)
      .then((room) => {
        navigator(`${managerRoomRoute}/${room.code}`)
      })
      .catch((error) => {
        const message = error.response.data.message;
        setError(message);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const goToRoom = () => navigator(managerRoomRoute + `/${room?.code || ""}`);
  const handleCloseError = () => setError(""); 

  return {
    handleLogout,
    host,
    isLoading,
    buyPlan,
    plan,
    openPlanModal,
    planModal,
    closePlanModal,
    roomModal,
    openRoomModal,
    closeRoomModal,
    handleCreateRoom,
    room,
    goToRoom,
    error,
    handleCloseError,
  }
}
