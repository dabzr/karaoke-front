import { Input } from "../Input/index";

type Props = {
  label: string;
  required?: boolean;
  onChange: (value: number | null) => void;
  placeholder: string;
  value: string;
  min: number;
  max: number;
  error: string;
  disabled?: boolean;
};

export function NumberInput({
  label,
  required = false,
  onChange,
  placeholder,
  value,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  error,
  disabled = false,
}: Props) {

  const handleChange = (newValue: string) => {
    if(newValue === ""){
      onChange(null);
      return;
    }
    if(!(/^[0-9]+$/.test(newValue))) return;
    if(parseInt(newValue) < min) return;
    if(parseInt(newValue) > max) return;
    onChange(parseInt(newValue));
  };

  return (
    <>
      <Input
        label={label}
        required={required}
        onChange={(value) => handleChange(value)}
        placeholder={placeholder}
        value={value}
        error={error}
        disabled={disabled}
      />
    </>
  );
}
