import { Route, Routes } from "react-router-dom";
import { roomRoute, joinRoute, loginRoute, registerRoute, managerRoomRoute, tvRoute, profileRoute } from "../utils/routes";
import { JoinPage } from "./join/page";
import { JoinIdPage } from "./join/[id]/page";
import { LoginPage } from "./login/page";
import { PublicRoute } from "../components/PublicRoute/index";
import { ProtectedRoute } from "../components/ProtectedRoute/index";
import { HomePage } from "./page";
import { RegisterPage } from "./register/page";
import { ManagerRoomPage } from "./manager/room/[id]/page";
import { RoomPage } from "./room/[id]/page";
import { TvPage } from "./tv/[id]/page";
import { ProfilePage } from "./profile/page";

export const RoutesPages = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<PublicRoute Component={HomePage}/>} />
        <Route path={loginRoute} element={<PublicRoute Component={LoginPage}/>} />
        <Route path={registerRoute} element={<PublicRoute Component={RegisterPage}/>} />
        <Route path={managerRoomRoute + "/:id"} element={<ProtectedRoute Component={ManagerRoomPage}/>} />
        <Route path={roomRoute + "/:id"} element={<ProtectedRoute Component={RoomPage} type="user"/>} />
        <Route path={joinRoute} element={<PublicRoute Component={JoinPage}/>} />
        <Route path={joinRoute + "/:id"} element={<PublicRoute Component={JoinIdPage} />} />
        <Route path={tvRoute + "/:id"} element={<ProtectedRoute Component={TvPage} />} />
        <Route path={profileRoute} element={<ProtectedRoute Component={ProfilePage}/>} />
      </Routes>
    </>
  )
}
