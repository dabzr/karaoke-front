import { Navbar } from "../../../../components/Navbar";
import { useHostRoom } from "../../../../hooks/useHostRoom";
import { ButtonGroup } from "../../../../components/ButtonGroup/index";
import { strings, queueString, participantsString, dataString, roomCodeString, roomNotFoundString } from "../../../../utils/strings";
import { language } from "../../../../utils/settings";
import { RoomData } from "../RoomData";
import { SongQueue } from "../../../../components/SongQueue/index";
import { Loading } from "../../../../components/Loading/index";

export function HostRoomPage() { 

  const { 
    room,
    activeButton, 
    setActiveButton,
    handleEdit,
    qrCodeUrl,
    isLoading,
    queue,
  } = useHostRoom();

  if(isLoading) return <Loading/>

  if(!room) {
    return (
      <div className="flex flex-col p-14 min-h-screen"> 
        <Navbar/>
        <div className="flex flex-col items-center h-screen justify-center">
          {strings[language][roomNotFoundString]}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-14 min-h-screen"> 
      <Navbar/>
      <div className="flex items-center justify-between text-[1cm] mx-20 h-20">
        <div>
          {room.name}
        </div>
        <div>
          {`${strings[language][roomCodeString]}: ${room.code}`}
          {qrCodeUrl && (
            <img
              src={qrCodeUrl}
              className="inline-block ml-4 w-24 h-15 shadow-sm border border-gray-200"
            />
          )}
        </div>
      </div> 
      <ButtonGroup 
        buttonsText={[strings[language][queueString], strings[language][participantsString], strings[language][dataString]]}
        activeButtonText={activeButton}
        onChange={(button) => setActiveButton(button)}
      />
      <div className="flex flex-col bg-gray-50 shadow-md mx-20 mb-5 px-20 overflow-y-auto h-180">
        {activeButton === strings[language][queueString] && 
          <div className="py-10">
            <SongQueue songs={queue}/>
          </div>
        }
        {activeButton === strings[language][participantsString] && <div></div>}
        {activeButton === strings[language][dataString] && 
          <RoomData
            room={room}
            handleEdit={handleEdit}
          />
        }
      </div>
    </div>
  );
}
