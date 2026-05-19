import Modal from '@mui/material/Modal';
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { addSong } from '../../../services/song';
import { strings, addSongString, closeString, } from '../../../utils/strings';
import { language } from '../../../utils/settings';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { getVideoData } from '../../../services/youtube';
import { IVideo } from '../../../interfaces/youtube';
import { truncateString } from '../../../utils/truncateString';
import { Tooltip } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
}

export function AddSongModal({
  open,
  onClose,
}: Props) {

  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [videos, setVideos] = useState<IVideo[]>([]);

  const handleAdd = (name: string, url: string, artistName: string = "") => {
    addSong(id ?? "", name, artistName, url)
    .then(() => {
      handleClose();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleClose = () => {
    setName("");
    setVideos([]);
    onClose();
  }

  const setData = (index: number) => {
    if(videos.length === 0) return;
    if(index >= videos.length) return;
    const video = videos[index];
    handleAdd(video.title, "https://youtu.be/" + video.id);
    setVideos([]);
  }

  const searchVideos = () => {
    getVideoData(name.toLowerCase())
      .then((data) => {
        setVideos(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white border-2 border-gray-100 p-2 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex w-full items-center justify-center p-2">
            <span className="text-xl flex-1">{strings[language][addSongString]}</span>
            <Tooltip title={strings[language][closeString]}>
              <button onClick={handleClose}>X</button>
            </Tooltip>
          </div>
          <div className="bg-gray-400 w-full h-[2px]"></div>
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-2">
                <div>
                  <Input
                    label={"Pesquisar música"}
                    value={name}
                    onChange={(value: string) => {
                      setVideos([]);
                      setName(value)
                    }}
                    required={true}
                  />
                </div>
                <Button
                  label="Pesquisar"
                  disabled={name === ""}
                  onClick={searchVideos}
                />
              </div>
            </div>
            <div className="pb-2">
              {videos.map((video, index) => 
                <div className="flex items-center gap-2 pb-2">
                  <button className="h-10 w-20" onClick={() => setData(index)}>
                    <img className="h-full w-full object-contain" src={video.thumbnailUrl}></img>
                  </button>
                  <Tooltip title={video.title}>
                    <button className="flex-1 flex flex-col items-center align-center" onClick={() => setData(index)}>
                      <span>{truncateString(video.title, 30)}</span>
                      <span>{truncateString(video.channelTitle, 30)}</span>
                    </button>
                  </Tooltip>
                </div>
              )}
            </div>
        </div>
      </div>
    </Modal>
  );
}
