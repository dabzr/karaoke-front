import { Route, Routes } from "react-router-dom";
import { roomRoute, roomsRoute, joinRoute, loginRoute, registerRoute, managerRoomRoute, videoRoute, tvRoute } from "../utils/routes";
import { RoomsPage } from "./room/page";
import { JoinPage } from "./join/page";
import { JoinIdPage } from "./join/[id]/page";
import { LoginPage } from "./login/page";
import { PublicRoute } from "../components/PublicRoute/index";
import { ProtectedRoute } from "../components/ProtectedRoute/index";
import { HomePage } from "./page";
import { RegisterPage } from "./register/page";
import { ManagerRoomPage } from "./manager/room/[id]/page";
import { RoomPage } from "./room/[id]/page";
import { VideoPage } from "./video/[id]/page";
import { TvPage } from "./tv/[id]/page";

export const RoutesPages = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<PublicRoute Component={HomePage}/>} />
        <Route path={loginRoute} element={<PublicRoute Component={LoginPage}/>} />
        <Route path={registerRoute} element={<PublicRoute Component={RegisterPage}/>} />
        <Route path={roomsRoute} element={<ProtectedRoute Component={RoomsPage}></ProtectedRoute>} />
        <Route path={managerRoomRoute + "/:id"} element={<ManagerRoomPage/>} />
        <Route path={roomRoute + "/:id"} element={<RoomPage/>} />
        <Route path={joinRoute} element={<PublicRoute Component={JoinPage}/>} />
        <Route path={joinRoute + "/:id"} element={<PublicRoute Component={JoinIdPage} />} />
        <Route path={videoRoute + "/:id"} element={<ProtectedRoute Component={VideoPage} />} />
        <Route path={tvRoute + "/:id"} element={<ProtectedRoute Component={TvPage} />} />
      </Routes>
    </>
  )
}
