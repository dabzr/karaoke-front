
type Props = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Button({
  label,
  onClick,
  disabled = false,
  className,
}: Props) {

  return (
    <>
      <button 
        className={className ?? `bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 px-8 py-3 rounded-xl font-bold text-sm text-white transition-all cursor-pointer shadow-md hover:shadow-lg w-full transform hover:-translate-y-0.5 ${disabled ? "bg-indigo-300" : "hover:bg-indigo-100"}`}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </>
  );
}
