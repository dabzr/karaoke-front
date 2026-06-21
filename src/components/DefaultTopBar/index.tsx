import { TopBar } from "../TopBar/index";
import { strings, loginString, createAccountString } from "../../utils/strings";
import { language } from "../../utils/settings";
import { loginRoute, registerRoute } from "../../utils/routes";

export function DefaultTopBar() {

  return (
    <TopBar>
      <div className="flex items-center">
        <a className="cursor-pointer block ml-2.5 font-bold text-base" href={loginRoute}>
          <span>{strings[language][loginString]}</span>
        </a>
        <a className="cursor-pointer block ml-2.5 font-bold text-base" href={registerRoute}>
          <span>{strings[language][createAccountString]}</span>
        </a>
      </div>
    </TopBar>
  );
}
