import Avatar from '@mui/material/Avatar';
import { strings, defaultAvatarString, profileString, logoutString } from "../../utils/strings";
import { language } from "../../utils/settings";
import { Tooltip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useLogout } from "../../hooks/useLogout";
import { TopBar } from "../TopBar/index";

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
    <TopBar>
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
    </TopBar>
  );
} 
