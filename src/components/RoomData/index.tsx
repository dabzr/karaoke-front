import { Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { RoomForm } from "../../components/RoomForm";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { IRoom } from "../../interfaces/room";
import { strings, roomDataString, roomCodeString, editString, requiredFieldString } from "../../utils/strings";
import { language } from "../../utils/settings";
import { ICreateRoomParams } from "../../mappers/room";

type Props = {
  handleEdit: (newData: ICreateRoomParams) => void;
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
  const [timeoutTime, setTimeoutTime] = useState<number | null>(null);

  useEffect(() => {
    if(!room) return;
    setName(room.name);
    setPassword(room.password ?? "");
    setMaxQuantity(room.maxQuantity);
  }, [room])

  const stopEdit = () => {
    setNameError("");
    setMaxQuantityError("");
    setOnEdit(false);
  }

  const successEdit = () => {
    stopEdit();
    handleEdit({ name, password, maxQuantity });
  }

  const handleClose = () => {
    stopEdit();
    if(!room) return;
    setName(room.name);
    setPassword(room.password ?? "");
    setMaxQuantity(room.maxQuantity);
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
      <div className="absolute left-9/10 pt-2">
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
        timeoutTime={timeoutTime}
        setTimeoutTime={setTimeoutTime}
      >
        <Input
          label={strings[language][roomCodeString]}
          value={room.code}
          disabled={true}
          required={true}
        />
      </RoomForm>
    </>
  );
}
