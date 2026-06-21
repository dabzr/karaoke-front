import { TopBar } from "../../../components/TopBar";
import { strings, roomNotFoundString, addSongString } from "../../../utils/strings";
import { language } from "../../../utils/settings";
import { useUserRoom } from "../../../hooks/useUserRoom";
import { SongQueue } from "../../../components/SongQueue/index";
import { Loading } from "../../../components/Loading/index";
import { AddSongModal } from "./AddSongModal";

export function RoomPage() { 

  const { 
    room, 
    isLoading,
    open,
    openModal,
    onClose,
    queue,
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
      <TopBar/>
      <div className="flex items-center justify-center text-[1cm] mx-20 h-20">
        <div>
          {room.name}
        </div>
      </div> 
      <div className="bg-gray-50 shadow-md mb-5 overflow-y-auto flex-1 mx-4">
        <SongQueue songs={queue}/>
      </div>
      <div className="flex justify-center pb-15 shrink-0">
        <button className="bg-gray-200 p-4 rounded-md shadow-md" onClick={openModal}>
          {strings[language][addSongString]}
        </button>
        <AddSongModal open={open} onClose={onClose}/>
      </div>
    </div>
  );
}
