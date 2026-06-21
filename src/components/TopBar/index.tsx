import { ReactNode } from "react";
import logo from "../../assets/logo.svg";

type Props = {
  children?: ReactNode;
};

export function TopBar({ children }: Props) {
  return (
    <div className="fixed inset-x-0 top-0 z-1000 border-b border-gray-950/5">
        <div className="relative flex h-20 items-center justify-between px-4 sm:px-6 bg-indigo text-white">
        <div className="flex-1" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono font-bold text-[0.8cm] whitespace-nowrap">
          <a href="/">
            <img
              src={logo}
              alt="Logo"
              className="h-25 w-auto py-5"
            />
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          {children}
        </div>
      </div>
    </div>
  );
}
