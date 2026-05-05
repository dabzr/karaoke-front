import { Route, Routes } from "react-router-dom";
import { roomRoute, roomsRoute, joinRoute } from "../utils/routes";
import { RoomsPage } from "./room/page";
import { RoomPage } from "./room/[id]/page";
import { JoinPage } from "./join/page";
import { JoinIdPage } from "./join/[id]/page";
import { LoginPage } from "./login/page";
import { PublicRoute } from "../components/PublicRoute/index";
import { ProtectedRoute } from "../components/ProtectedRoute/index";

export const RoutesPages = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<PublicRoute Component={LoginPage}/>} />
        <Route path={roomsRoute} element={<ProtectedRoute Component={RoomsPage}></ProtectedRoute>} />
        <Route path={roomsRoute} element={<ProtectedRoute Component={RoomsPage}></ProtectedRoute>} />
        <Route path={roomRoute + "/:id"} element={<RoomPage/>} />
        <Route path={joinRoute} element={<PublicRoute Component={JoinPage}/>} />
        <Route path={joinRoute + "/:id"} element={<PublicRoute Component={JoinIdPage} />} />
      </Routes>
    </>
  )
}
