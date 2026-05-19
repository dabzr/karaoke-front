import { Input } from "../Input";
import { strings, songNameString, urlString, artistNameString } from '../../utils/strings';
import { language } from '../../utils/settings';

type Props = {
  name: string;
  setName: (value: string) => void;
  nameError: string;
  artistName: string;
  setArtistName: (value: string) => void;
  artistNameError: string;
  url: string;
  setUrl: (value: string) => void;
  urlError: string;
}

export function AddSongForm({
  name,
  setName,
  nameError,
  artistName,
  setArtistName,
  artistNameError,
  url,
  setUrl,
  urlError,
}: Props){
  return (
    <>
      <div className="p-2">
        <Input
          label={strings[language][songNameString]}
          value={name}
          onChange={setName}
          required={true}
          maxLength={50}
          error={nameError}
        />
        <Input
          label={strings[language][artistNameString]}
          value={artistName}
          onChange={setArtistName}
          maxLength={50}
          error={artistNameError}
        />
        <Input
          label={strings[language][urlString]} 
          value={url}
          onChange={setUrl}
          maxLength={30}
          error={urlError}
        />
      </div>
    </>
  );
}
