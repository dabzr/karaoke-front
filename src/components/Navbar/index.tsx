import Avatar from '@mui/material/Avatar';
import { strings, profileString, logoutString } from "../../utils/strings";
import { language } from "../../utils/settings";
import { Tooltip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useLogout } from "../../hooks/useLogout";
import { useIsHost } from "../../hooks/useIsHost";
import { TopBar } from "../TopBar/index";
import { Loading } from '../Loading';

type Props = {
  className?: string;
  onClick?: () => void;
}

export function Navbar({ 
  className = "", 
  onClick,
}: Props) {

  const { host, isLoading } = useIsHost();
  const { handleLogout, goToProfilePage } = useLogout();

  if(isLoading) return <Loading/>

  return (
    <TopBar>
      <div className="flex gap-10">
        <button className={`flex max-md:hidden items-center ${className}`} onClick={goToProfilePage}> 
          <Tooltip title={strings[language][profileString]}>
            <Avatar sx= {{ bgcolor: "#C19BDD" }}>{host ? host.email[0].toUpperCase() : "U"}</Avatar>
          </Tooltip>
        </button>
        <button className="p-2 text-white hover:text-white rounded-full hover:bg-white/10 transition-all cursor-pointer" onClick={handleLogout}>
          <Tooltip title={strings[language][logoutString]}>
            <LogoutIcon/>
          </Tooltip>
        </button>
      </div>
    </TopBar>
  );
} 
