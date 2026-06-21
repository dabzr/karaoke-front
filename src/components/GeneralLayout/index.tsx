import { ReactNode } from "react";
import { Navbar } from "../Navbar";
import { Toast } from "../Toast";

type Props = {
  children: ReactNode
  screenName: string;
  error?: string;
  handleCloseError?: () => void;
};

export function GeneralLayout({
  children,
  screenName,
  error,
  handleCloseError,
}: Props) {
  return (
    <> 
      <Navbar/>
      {(error && handleCloseError) ? <Toast error={error} handleCloseError={() => handleCloseError()}/> : <></>}
      <div className="flex items-center p-4 pt-16 w-full z-90 flex-col min-h-[calc(100vh-52px)]">
        <h1 className="flex items-center justify-center pt-5 text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
          {screenName}
        </h1>
        {children}
      </div> 
    </>
  )
}
