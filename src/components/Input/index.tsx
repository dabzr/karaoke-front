
type Props = {
  label: string;
  required?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
  value: string;
  maxLength?: number;
  error?: string;
  disabled?: boolean;
  type?: string;
  inputMode?: "search" | "text" | "email" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined;
  ref?: any;
};

export function Input({
  label,
  required = false,
  onChange, 
  placeholder = "",
  value,
  maxLength = Number.MAX_SAFE_INTEGER,
  error = "",
  disabled = false,
  type = "text",
  inputMode = undefined,
  ref,
}: Props) {

  const handleChange = (newValue: string) => {
    if(newValue.length <= maxLength && onChange) onChange(newValue); 
  };
  
  return (
    <>
      <div className={`${error === "" ? "" : "text-red-500"} font-bold`}>{label} {required ? "" : " (Opcional)"}</div>
      <input 
        className={`border-2 border-gray-300 rounded-lg px-4 min-h-10 w-full ${error === "" ? "" : "border-red-500"} ${disabled ? "bg-gray-300" : ""}`}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        inputMode={inputMode}
        ref={ref}
      >
      </input>
      <div className="min-h-[25px] max-h-[25px] text-red-500">{error}</div>
    </>
  );
}
