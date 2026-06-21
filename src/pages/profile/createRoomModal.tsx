import Modal from '@mui/material/Modal';
import { strings, requiredFieldString, createRoomString, createString } from "../../utils/strings";
import { language } from "../../utils/settings";
import { useState } from 'react';
import { ICreateRoomParams } from '../../mappers/room';
import { RoomForm } from '../../components/RoomForm/index';

type Props = {
  open: boolean;
  onClose: () => void;
  handleCreateRoom: (data: ICreateRoomParams) => void;
}

export function CreateRoomModal({
  open,
  onClose,
  handleCreateRoom,
}: Props) {
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [maxQuantity, setMaxQuantity] = useState<number | null>(null);
  const [maxQuantityError, setMaxQuantityError] = useState<string>("");
  const [timeoutTime, setTimeoutTime] = useState<number | null>(null);

  const handleClose = () => {
    setName("");
    setPassword("");
    setMaxQuantity(null);
    setNameError("");
    setMaxQuantityError("");
    setTimeoutTime(null);
    onClose();
  }

  const handleCreate = () => {
    handleCreateRoom({ name, password, maxQuantity, timeoutTime });
    handleClose();
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
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 bg-white border-2 border-gray-100 p-2 max-h-[90vh] overflow-y-auto">
        <RoomForm
          title={strings[language][createRoomString]}
          successButtonText={strings[language][createString]}
          name={name}
          setName={setName}
          nameError={nameError}
          password={password}
          setPassword={setPassword}
          maxQuantity={maxQuantity}
          setMaxQuantity={setMaxQuantity}
          maxQuantityError={maxQuantityError}
          handleClose={handleClose}
          handleSuccess={handleCreate}
          validations={validations}
          timeoutTime={timeoutTime}
          setTimeoutTime={setTimeoutTime}
        />
      </div>
    </Modal>
  );
}
