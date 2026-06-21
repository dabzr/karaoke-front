import { TopBar } from "../../../components/TopBar";
import { strings, roomNotFoundString, addSongString } from "../../../utils/strings";
import { language } from "../../../utils/settings";
import { useUserRoom } from "../../../hooks/useUserRoom";
import { SongQueue } from "../../../components/SongQueue/index";
import { Loading } from "../../../components/Loading/index";
import { AddSongModal } from "./AddSongModal";
import { Button } from "../../../components/Button";
import { Toast } from "../../../components/Toast";

export function RoomPage() { 

  const { 
    room, 
    isLoading,
    open,
    openModal,
    onClose,
    queue,
    message,
    handleCloseError,
  } = useUserRoom();

  if(isLoading) return <Loading/>

  if(!room) {
    return (
      <div className="flex flex-col p-14 min-h-screen"> 
        <TopBar/>
        <div className="flex flex-col items-center h-screen justify-center">
          {strings[language][roomNotFoundString]}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col py-14 h-screen overflow-hidden"> 
      <Toast severity={"success"} error={message} handleCloseError={handleCloseError}/>
      <TopBar/>
      <div className="flex items-center justify-center text-[1cm] mx-24 h-20">
        <h1 className="flex items-center justify-center pt-5 text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
          {room.name}
        </h1>
      </div> 
      <div className="bg-gray-50 shadow-md mb-5 overflow-y-auto flex-1 mx-4">
        <SongQueue songs={queue}/>
      </div>
      <div>
        <div className="flex justify-center items-center px-30">
          <Button onClick={openModal} label={strings[language][addSongString]}/>
        </div>
        <AddSongModal open={open} onClose={onClose}/>
      </div>
    </div>
  );
}
