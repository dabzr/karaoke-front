import { ISong } from "../../interfaces/song";
import { truncateString } from "../../utils/truncateString";
import { replaceCaseSensitive } from "../../utils/replaceCaseSensitive";
import { Tooltip } from "@mui/material";

type Props = {
  song: ISong;
  index: number;
}

export function SongItem({ song, index }: Props) {
  const normalizedString = replaceCaseSensitive(song.name, "karaoke");

  return (
    <div className="grid grid-cols-3 h-20 items-center text-center border border-gray-200 text-xl">
      <div>{`${index + 1}°`}</div>
      <div className="flex flex-col">
        <Tooltip title={normalizedString}>
          <div>{truncateString(normalizedString, 30)}</div>
        </Tooltip>
      </div>
      <div>{song.user.name}</div>
    </div>
  );
}
