
type Props = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  label,
  onClick,
  disabled = false,
}: Props) {

  return (
    <>
      <button 
        className={`border-2 border-gray-300 rounded-lg py-1 px-2 ${disabled ? "bg-gray-300" : "hover:bg-gray-100"} cursor-pointer w-full`}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </>
  );
}
