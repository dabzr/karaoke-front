import { Navbar } from "../../../../components/Navbar";
import { useHostRoom } from "../../../../hooks/useHostRoom";
import { ButtonGroup } from "../../../../components/ButtonGroup/index";
import { strings, queueString, participantsString, dataString, roomNotFoundString, nextString, songString, positionString, singerString, removeString} from "../../../../utils/strings";
import { language } from "../../../../utils/settings";
import { RoomData } from "../../../../components/RoomData/index";
import { SongQueue } from "../../../../components/SongQueue/index";
import { Loading } from "../../../../components/Loading/index";
import { ApiUser } from "../../../../interfaces/user";
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from "@mui/material";
import { SongItem } from "../../../../components/SongItem/index";
import { Toast } from "../../../../components/Toast";
import { Button } from "../../../../components/Button";
import TvIcon from '@mui/icons-material/Tv';
import { GeneralLayout } from "../../../../components/GeneralLayout";

export function ManagerRoomPage() { 

  const { 
    room,
    activeButton, 
    setActiveButton,
    handleEdit,
    isLoading,
    queue,
    users,
    handleNextSong,
    handleRemoveSong,
    error,
    handleCloseError,
    id,
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
    <GeneralLayout screenName={room.name} error={error} handleCloseError={handleCloseError}> 
      <div className="flex flex-col w-full">
        <ButtonGroup 
          buttonsText={[strings[language][queueString], strings[language][participantsString], strings[language][dataString]]}
          activeButtonText={activeButton}
          onChange={(button) => setActiveButton(button)}
        />
        <div className="flex flex-col bg-gray-50 shadow-md mx-20 mb-5 px-20 overflow-y-auto h-180 rounded-b-lg rounded-tr-lg">
          {activeButton === strings[language][queueString] && 
            <div className="relative py-10">
              <SongQueue 
                songs={queue} 
                header={[
                  strings[language][positionString],
                  strings[language][songString],
                  strings[language][singerString],
                  strings[language][removeString]
                ]}
                generateSongItem={(song, index) => {
                  return <SongItem 
                    song={song} 
                    index={index} 
                    children={
                      <div>
                        <button onClick={() => handleRemoveSong(song.id)}>
                          <Tooltip title={strings[language][removeString]}>
                            <DeleteIcon/>
                          </Tooltip>
                        </button>
                      </div>
                    }
                    className={"grid-cols-4"}
                  />
                }}
              />
              <div className="absolute -right-5">
                <a target="_blank" href={`/tv/${id}`}>
                  <Tooltip title="Abrir segunda tela">
                    <TvIcon/>
                  </Tooltip>
                </a>
              </div>
            </div>
          }
          {activeButton === strings[language][participantsString] && 
            <div className="py-10">
              {users.map((user: ApiUser) => 
                <div className="grid grid-cols-1 h-20 items-center text-center border border-gray-200 text-xl">
                  <div>{user.name}</div>
                </div>
                )
              }
            </div>
          }
          {activeButton === strings[language][dataString] && 
            <RoomData
              room={room}
              handleEdit={handleEdit}
            />
          }
        </div>
        <div className="flex justify-center w-full">
          <div>
            <Button onClick={handleNextSong} label={strings[language][nextString]}/>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
}
