import { Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { RoomForm } from "../../components/RoomForm";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { IEditRoom, IRoom } from "../../interfaces/room";
import { strings, roomDataString, roomCodeString, editString, requiredFieldString } from "../../utils/strings";
import { language } from "../../utils/settings";

type Props = {
  handleEdit: (data: IEditRoom) => void;
  room: IRoom,
}

export function RoomData({
  handleEdit,
  room,
}: Props) {

  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [maxQuantity, setMaxQuantity] = useState<number | null>(null);
  const [maxQuantityError, setMaxQuantityError] = useState<string>("");
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [timeoutSeconds, setTimeoutSeconds] = useState<number | null>(null);

  useEffect(() => {
    if(!room) return;
    setName(room.name);
    setPassword(room.password ?? "");
    setMaxQuantity(room.maxQuantity);
    setTimeoutSeconds(room.timeoutSeconds);
  }, [room])

  const stopEdit = () => {
    setNameError("");
    setMaxQuantityError("");
    setOnEdit(false);
  }

  const successEdit = () => {
    stopEdit();
    if(!maxQuantity || !timeoutSeconds) return;
    handleEdit({ name, password, maxQuantity, timeoutSeconds });
  }

  const handleClose = () => {
    stopEdit();
    if(!room) return;
    setName(room.name);
    setPassword(room.password ?? "");
    setMaxQuantity(room.maxQuantity);
    setTimeoutSeconds(room.timeoutSeconds);
  }

  const validations = [
    {
      "condition": () => name.trim() === "", 
      "error": () => setNameError(strings[language][requiredFieldString])
    },
    {
      "condition": () => maxQuantity === null,
      "error": () => setMaxQuantityError(strings[language][requiredFieldString])
    },
  ];

  return (
    <>
      <div className="relative flex px-100 py-10">
        <div className="absolute right-106 top-15">
          <button onClick={() => setOnEdit(true)}>
            <Tooltip title={strings[language][editString]}>
              <EditIcon/>
            </Tooltip>
          </button>
        </div>
        <RoomForm
          title={strings[language][roomDataString]}
          name={name}
          setName={setName}
          nameError={nameError}
          nameDisabled={!onEdit}
          password={password}
          setPassword={setPassword}
          passwordDisabled={!onEdit}
          maxQuantity={maxQuantity}
          setMaxQuantity={setMaxQuantity}
          maxQuantityDisabled={!onEdit}
          maxQuantityError={maxQuantityError}
          handleClose={handleClose}
          handleSuccess={successEdit}
          validations={validations}
          successButtonText={strings[language][editString]}
          buttonDisabled={!onEdit}
          timeoutTimeDisabled={!onEdit}
          timeoutTime={timeoutSeconds}
          setTimeoutTime={setTimeoutSeconds}
        >
          <Input
            label={strings[language][roomCodeString]}
            value={room.code}
            disabled={true}
            required={true}
          />
        </RoomForm>
      </div>
    </>
  );
}
