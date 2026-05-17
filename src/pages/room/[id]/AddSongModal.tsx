import Modal from '@mui/material/Modal';
import { useState } from "react";
import { youtubeLinkRegex } from "../../../utils/regex";
import { useParams } from 'react-router-dom';
import { addSong } from '../../../services/song';
import { strings, requiredFieldString, youtubeUrlRequired, addSongString } from '../../../utils/strings';
import { AddSongForm } from '../../../components/AddSongForm/index';
import { language } from '../../../utils/settings';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { getVideoData } from '../../../services/youtube';
import { IVideo } from '../../../interfaces/youtube';

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
  const [nameError, setNameError] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");
  const [artistNameError, setArtistNameError] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [urlError, setUrlError] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [showAddSongForm, setShowAddSongForm] = useState<boolean>(true);
  const [videos, setVideos] = useState<IVideo[]>([]);

  const validations = [
    {
      condition: () => name === "",
      error: () => setNameError(strings[language][requiredFieldString]),
    },
    {
      condition: () => url && !(youtubeLinkRegex.test(url)),
      error: () => setUrlError(strings[language][youtubeUrlRequired]),
    }
  ]

  const validate = () => {
    let hasError = false;
    setNameError("");
    setUrlError("");
    for(const validation of validations) {
      if(validation.condition()) {
        hasError = true;
        validation.error();
      }
    }
    return hasError;
  }

  const handleAdd = () => {
    setButtonDisabled(true);
    const hasError = validate();
    if(hasError) {
      setButtonDisabled(false);
      return;
    }
    addSong(id ?? "", name, artistName, url)
    .then(() => {
      handleClose();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonDisabled(false);
    })
  }

  const handleClose = () => {
    setName("");
    setUrl("");
    onClose();
  }

  const searchVideos = () => {
    getVideoData(name)
      .then((data) => {
        setVideos(data);
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white border-2 border-gray-100 p-2 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="p-2 text-xl">{strings[language][addSongString]}</div>
          <div className="bg-gray-400 w-full h-[2px]"></div>
          {showAddSongForm 
            ?
            <AddSongForm
              name={name}
              setName={(value: string) => setName(value)}
              nameError={nameError}
              artistName={artistName}
              setArtistName={(value: string) => setArtistName(value)}
              artistNameError={artistNameError}
              url={url}
              setUrl={(value: string) => setUrl(value)}
              urlError={urlError}
              buttonDisabled={buttonDisabled}
              handleClose={handleClose}
              handleAdd={handleAdd}
            />
            :
            <div>
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-2">
                  <div>
                    <Input
                      label={"Pesquisar música"}
                      value={name}
                      onChange={(value: string) => setName(value)}
                      required={true}
                    />
                  </div>
                  <Button
                    label="Pesquisar"
                    disabled={name === ""}
                    onClick={searchVideos}
                  />
                </div>
                <div>
                  {videos.map((video) => 
                    <div className="flex gap-2 items-center">
                      <div>
                        <img src={video.thumbnailUrl}></img>
                      </div>
                      <div className="flex flex-col">
                        <span>{video.title}</span>
                        <span>{video.channelTitle}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </Modal>
  );
}
