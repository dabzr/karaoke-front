import { Input } from "../Input";
import { Button } from "../Button";
import { strings, addString, songNameString, urlString, cancelString, artistNameString } from '../../utils/strings';
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
  buttonDisabled: boolean;
  handleClose: () => void;
  handleAdd: () => void;
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
  buttonDisabled,
  handleClose,
  handleAdd,
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
      <div className="bg-gray-400 w-full h-[2px]"></div>
      <div className="flex justify-between w-full mt-2">
        <Button
          label={strings[language][cancelString]} 
          onClick={handleClose}
          disabled={buttonDisabled}
        />
        <Button 
          label={strings[language][addString]}
          onClick={handleAdd}
          disabled={buttonDisabled}
        />
      </div>
    </>
  );
}
