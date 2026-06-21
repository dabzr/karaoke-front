import { ISong } from "../../interfaces/song";
import { SongItem } from "../SongItem/index";
import { strings, positionString, songString, singerString, noMusicString } from "../../utils/strings";
import { language } from "../../utils/settings";
import { ReactNode } from "react";

type Props = {
  songs: ISong[];
  header?: string[];
  generateSongItem?: (song: ISong, index: number) => ReactNode;
}

export function SongQueue({ 
  songs,  
  header = [
    strings[language][positionString],
    strings[language][songString],
    strings[language][singerString]
  ],
  generateSongItem = (song, index) => <SongItem key={index} song={song} index={index}/>
}: Props) {

  if(songs.length === 0){
    return (
      <div className="flex items-center justify-center h-150">
        {strings[language][noMusicString]}
      </div>
    );
  }

  return (
    <div>
      <div className={`grid grid-cols-${header.length} bg-gray-300 h-20 items-center text-center text-xl`}>
        {header.map((label) => <div>{label}</div>)}
      </div>
      <div className="flex flex-col items-begin h-full">
        {songs.map((song, index) => generateSongItem(song, index))}
      </div>
    </div>
  );
}
