import { Modal, Tooltip } from "@mui/material";
import { language } from "../../utils/settings";
import { closeString, strings } from "../../utils/strings";
import { Plans } from "../../components/Plans";

type Props = {
  open: boolean,
  closeModal: () => void;
  onClick: (value: string) => void;
}

export function PlansModal({
  open,
  closeModal,
  onClick,
}: Props) {
  return (
    <Modal open={open}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 bg-white border-2 border-gray-100 p-2 max-h-[90vh] overflow-y-auto">
        <div className="absolute right-5">
          <Tooltip title={strings[language][closeString]}>
            <button onClick={closeModal}>X</button>
          </Tooltip>
        </div>
        <Plans onClick={onClick} className="flex flex-row w-full justify-around max-w-7xl mx-auto px-0"/>
      </div>
    </Modal>
  );
}
