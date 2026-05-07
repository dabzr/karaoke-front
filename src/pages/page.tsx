import { TopBar } from "../components/TopBar/index";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import { Tooltip } from "@mui/material";
import { strings, loginString, createAccountString } from "../utils/strings";
import { language } from "../utils/settings";
import { loginRoute, registerRoute } from "../utils/routes";
import { useNavigate } from "react-router-dom";

export function HomePage() {   

  const navigator = useNavigate();

  return (
    <>
      <TopBar>
        <div className="flex justify-between w-20">
          <button onClick={() => navigator(loginRoute)}>
            <Tooltip title={strings[language][loginString]}>
              <LoginIcon/>
            </Tooltip>
          </button>
          <button onClick={() => navigator(registerRoute)}>
            <Tooltip title={strings[language][createAccountString]}>
              <PersonAddIcon/>
            </Tooltip>
          </button>
        </div>
      </TopBar>
    </>
  );
}
