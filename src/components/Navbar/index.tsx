import Avatar from '@mui/material/Avatar';
import { strings, defaultAvatarString, profileString, logoutString } from "../../utils/strings";
import { language } from "../../utils/settings";
import { Tooltip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useLogout } from "../../hooks/useLogout";

type Props = {
  className?: string;
  onClick?: () => void;
}

export function Navbar({ 
  className = "", 
  onClick,
}: Props) {

  const { handleLogout } = useLogout();

  return (
    <div className="fixed inset-x-0 top-0 z-10 border-b border-gray-950/5">
      <div className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6 bg-gray-400">
        <div className="font-mono font-bold text-[0.8cm]">KARA</div>
        <div className="flex gap-10">
          <button className={`flex max-md:hidden items-center ${className}`} onClick={onClick}> 
            <Tooltip title={strings[language][profileString]}>
              <Avatar>{strings[language][defaultAvatarString]}</Avatar>
            </Tooltip>
          </button>
          <button onClick={handleLogout}>
            <Tooltip title={strings[language][logoutString]}>
              <LogoutIcon/>
            </Tooltip>
          </button>
        </div>
      </div>
    </div>
  );
} 
