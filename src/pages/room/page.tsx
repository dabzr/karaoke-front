import { Navbar } from "../../components/Navbar";
import { strings, createRoomString, addRoomString } from "../../utils/strings";
import { language } from "../../utils/settings";
import { Tooltip } from "@mui/material";
import { useRooms } from "../../hooks/useRooms";
import { CreateRoomModal } from "./createRoomModal";
import { Loading } from "../../components/Loading";
import { Toast } from "../../components/Toast";

export function RoomsPage() { 
  const { 
    open,
    handleOpen,
    handleClose,
    handleCreateRoom,
    isLoading,
    error,
    handleCloseError,
  } = useRooms();

  if(isLoading) return <Loading/>

  return (
    <div className="flex flex-col h-full"> 
      <Navbar/>
      <Toast error={error} handleCloseError={() => handleCloseError()}/>
      <div className="flex items-center p-4 pt-14 w-full z-90 flex-col min-h-[calc(100vh-52px)]">
        <h1 className="flex items-center justify-center text-[1cm] h-20">{strings[language][createRoomString]}</h1>
        <div className="flex items-center justify-center h-full flex-1">
          <Tooltip title={strings[language][addRoomString]}>
            <button onClick={handleOpen} className="border-dashed border-5 w-60 h-60 border-gray-500 text-[6rem] text-gray-500 rounded-lg">+</button>
          </Tooltip>
          <CreateRoomModal open={open} onClose={handleClose} handleCreateRoom={handleCreateRoom}/>
        </div>
      </div>
    </div>
  );
}
