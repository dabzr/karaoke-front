import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function TopBar({ children }: Props) {
  return (
    <div className="fixed inset-x-0 top-0 z-10 border-b border-gray-950/5">
      <div className="relative flex h-14 items-center justify-between px-4 sm:px-6 bg-gray-400">
        <div className="flex-1" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono font-bold text-[0.8cm] whitespace-nowrap">
          KARA
        </div>
        <div className="flex flex-1 justify-end">
          {children}
        </div>
      </div>
    </div>
  );
}
