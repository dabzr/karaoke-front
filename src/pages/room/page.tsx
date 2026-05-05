import { Navbar } from "../../components/Navbar";
import { strings, roomsTitleString, addRoomString } from "../../utils/strings";
import { language } from "../../utils/settings";
import { Tooltip } from "@mui/material";
import { useRooms } from "../../hooks/useRooms";
import { RoomCard } from "./card";
import { CreateRoomModal } from "./createRoomModal";
import { Loading } from "../../components/Loading";
import { Toast } from "../../components/Toast";

export function RoomsPage() { 
  const { 
    rooms,
    open,
    handleOpen,
    handleClose,
    handleCreateRoom,
    navigator,
    isLoading,
    error,
    handleCloseError,
  } = useRooms();

  if(isLoading) return <Loading/>

  return (
    <div className="flex flex-col p-14 min-h-screen"> 
      <Toast error={error} handleCloseError={() => handleCloseError()}/>
      <Navbar/>
      <div className="flex items-center justify-center text-[1cm] h-20">{strings[language][roomsTitleString]}</div> 
      <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-y-10 gap-x-5 justify-items-start bg-gray-50 shadow-md mx-20 mb-5 p-20 overflow-y-auto h-180">
        {rooms.map((data) => <RoomCard data={data} navigator={navigator}/>)}
        <Tooltip title={strings[language][addRoomString]}>
        <button onClick={handleOpen} className="border-dashed border-5 w-60 h-60 border-gray-500 text-[6rem] text-gray-500 rounded-lg">+</button>
        </Tooltip>
        <CreateRoomModal open={open} onClose={handleClose} handleCreateRoom={handleCreateRoom}/>
      </div>
    </div>
  );
}
