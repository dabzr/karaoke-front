import { ISong } from "../../interfaces/song";
import { truncateString } from "../../utils/truncateString";
import { replaceCaseSensitive } from "../../utils/replaceCaseSensitive";
import { Tooltip } from "@mui/material";

type Props = {
  song: ISong;
  index: number;
  children?: ReactNode;
  className?: string;
}

export function SongItem({ 
  song, 
  index,
  children,
  className = ""
}: Props) {
  return (
    <div className={`grid grid-cols-3 min-h-20 py-3 items-center text-center border-b border-gray-200 text-base md:text-lg ${className}`}>
      <div className="font-medium">{`${index + 1}°`}</div>
      
      <div className="flex flex-col justify-center min-w-0 px-1">
        <Tooltip title={song.name}>
          <div className="truncate font-semibold text-gray-900">
            {song.name}
          </div>
          <div className="truncate text-sm text-gray-500 mt-0.5">
            {song.artistName || "-"}
          </div>
        </Tooltip>
      </div>
      
      <div className="truncate px-1 text-gray-700">{song.user.name}</div>
      <>{children}</>
    </div>
  );
}
