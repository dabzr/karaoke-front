import { ISong } from "../../interfaces/song";

type Props = {
  song: ISong;
  index: number;
}

export function SongItem({ song, index }: Props) {
  return (
    <div className="grid grid-cols-3 h-20 items-center text-center border border-gray-200 text-xl">
      <div>{`${index + 1}°`}</div>
      <div className="flex flex-col">
        <div>{song.name}</div>
        <div>{song.artist || "-"}</div>
      </div>
      <div>{song.user.name}</div>
    </div>
  );
}
