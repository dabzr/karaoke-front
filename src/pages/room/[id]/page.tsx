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
    lastSong,
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
    <div className={`fixed inset-0 flex flex-col pt-14 h-screen overflow-hidden transition-all duration-500 ${lastSong ? 'pb-28' : 'py-14'}`}> 
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

      <div 
        className={`fixed left-0 right-0 bg-indigo text-white px-5 py-3 z-50 transition-all duration-500 ease-in-out transform ${
          lastSong 
            ? "bottom-0 opacity-100 translate-y-0" 
            : "-bottom-24 opacity-0 translate-y-full"
        }`}
      >
        <div className="flex flex-col max-w-full overflow-hidden"> 
          <span className="text-xs opacity-75 uppercase tracking-wider font-bold mb-0.5">
            Tocando agora
          </span>
          
          <div className="overflow-hidden whitespace-nowrap w-full relative h-7">
            <span className="inline-block font-bold text-lg">
              {lastSong ? lastSong.name : ""}
            </span>
          </div>

          <span className="text-sm opacity-80 truncate block mt-0.5">
            {lastSong ? lastSong.artistName : ""}
          </span>
        </div> 
      </div>
    </div>
  );
}
