import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from "react";

type Props = {
  label: string;
  required?: boolean;
  onChange: (value: string) => void;
  value: string;
  maxLength: number;
  disabled?: boolean;
  error?: string;
}

export function PasswordInput({ 
  label, 
  required = false,
  onChange,
  value,
  maxLength = Number.MAX_SAFE_INTEGER,
  disabled = false,
  error = "",
}: Props) {
  const [visibility, setVisibility] = useState<boolean>(false);
  const toggleVisibility = () => setVisibility((prev) => !prev);

  useEffect(() => {
    if(disabled) setVisibility(false);
  }, [disabled])

  const handleChange = (newValue: string) => {
    if(newValue.length <= maxLength) onChange(newValue); 
  };

  return (
    <div className="flex flex-col gap-1">
      <div className={`${error === "" ? "" : "text-red-500"} font-bold`}>{label} {required ? "" : " (Opcional)"}</div>
      <div className="relative flex items-center w-full">
        <input 
          className={`border-2 border-gray-300 rounded-lg px-4 min-h-10 w-full ${error === "" ? "" : "border-red-500"} ${disabled ? "bg-gray-300" : ""}`}
          type={visibility ? "text" : "password"}
          value={value}
          required
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
        >
        </input>
        <button className={`absolute right-3 flex items-center text-gray-500 ${disabled ? "" : "hover:text-gray-700"}`} onClick={toggleVisibility} disabled={disabled}>
          { visibility ? <VisibilityIcon/> : <VisibilityOffOutlinedIcon/>}
        </button>
      </div>
      <div className="min-h-[25px] max-h-[25px] text-red-500">{error}</div>
    </div>
  );
}
