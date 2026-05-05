import { ISong } from "../../interfaces/song";
import { SongItem } from "../SongItem/index";
import { strings, positionString, songString, singerString, noMusicString } from "../../utils/strings";
import { language } from "../../utils/settings";

type Props = {
  songs: ISong[];
}

export function SongQueue({ songs }: Props) {

  if(songs.length === 0){
    return (
      <div className="flex items-center justify-center h-150">
        {strings[language][noMusicString]}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 bg-gray-300 h-20 items-center text-center text-xl">
        <div>{strings[language][positionString]}</div>
        <div>{strings[language][songString]}</div>
        <div>{strings[language][singerString]}</div>
      </div>
      <div className="flex flex-col items-begin h-full">
        {songs.map((song, index) => <SongItem song={song} index={index}/>)}
      </div>
    </div>
  );
}
