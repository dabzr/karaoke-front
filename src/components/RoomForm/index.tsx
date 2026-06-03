import { Dispatch, ReactNode, SetStateAction } from "react";
import { language } from "../../utils/settings";
import { cancelString, maxQuantityPlaceholderString, maxQuantityString, namePlaceholderString, nameString, passwordString, strings, timeoutString } from "../../utils/strings";
import { Button } from "../Button";
import { Input } from "../Input";
import { NumberInput } from "../NumberInput";
import { PasswordInput } from "../PasswordInput";

type Props = {
  title: string;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  nameError: string;
  nameDisabled?: boolean;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  passwordDisabled?: boolean;
  maxQuantity: number | null;
  setMaxQuantity: Dispatch<SetStateAction<number | null>>;
  maxQuantityDisabled?: boolean;
  maxQuantityError: string;
  handleClose: () => void;
  handleSuccess: () => void;
  validations: {"condition": () => boolean, "error": () => void}[];
  successButtonText: string;
  children?: ReactNode;
  buttonDisabled?: boolean;
  timeoutTime: number | null;
  setTimeoutTime: Dispatch<SetStateAction<number | null>>;
}

export function RoomForm({
  title,
  name,
  setName,
  nameError,
  nameDisabled = false,
  password,
  setPassword,
  passwordDisabled = false,
  maxQuantity,
  setMaxQuantity,
  maxQuantityError,
  maxQuantityDisabled = false,
  handleClose,
  handleSuccess,
  validations,
  successButtonText,
  children,
  buttonDisabled = false,
  timeoutTime,
  setTimeoutTime,
  timeoutTimeDisabled = false,
}: Props) {

  const validateErrors = () => {
    let hasError = false;
    for(const validation of validations) {
      if (validation.condition()){
        validation.error()
        hasError = true;
      }
    }
    return hasError;
  }

  const successFunction = () => {
    const hasError = validateErrors();
    if(hasError) return;
    handleSuccess();
  }

  return (
    <div className="flex flex-col justify-start p-6 w-full">
      <h1 className="text-[1.25rem] self-start font-bold leading-6">{title}</h1>
      <div className="flex flex-col justify-start w-full grow shrink basis-[0%]">
        <div className="mt-6 mb-4 mx-0">
          <Input
            label={strings[language][nameString]}
            value={name}
            onChange={setName}
            placeholder={strings[language][namePlaceholderString]}
            required
            maxLength={50}
            error={nameError}
            disabled={nameDisabled}
          />
          <PasswordInput
            label={strings[language][passwordString]} 
            value={password}
            onChange={setPassword}
            maxLength={30}
            disabled={passwordDisabled}
          />
          <NumberInput
            label={strings[language][maxQuantityString]}
            value={maxQuantity === null ? "" : String(maxQuantity)}
            onChange={setMaxQuantity}
            placeholder={strings[language][maxQuantityPlaceholderString]}
            required
            min={1}
            max={1000}
            error={maxQuantityError}
            disabled={maxQuantityDisabled}
          />
          <NumberInput
            label={strings[language][timeoutString]}
            value={timeoutTime === null ? "" : String(timeoutTime)}
            onChange={setTimeoutTime}
            placeholder={"1-10"}
            required
            min={1}
            max={10}
            disabled={timeoutTimeDisabled}
          />
          {children && <>{children}</>}
        </div>
        <div className="flex gap-5 w-full justify-center">
          <Button
            label={strings[language][cancelString]} 
            onClick={handleClose}
            disabled={buttonDisabled}
          />
          <Button 
            disabled={buttonDisabled}
            label={successButtonText}
            onClick={successFunction}
          />
        </div>
      </div>
    </div>
  );
}
