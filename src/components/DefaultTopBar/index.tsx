import { TopBar } from "../TopBar/index";
import { strings, loginString, createAccountString } from "../../utils/strings";
import { language } from "../../utils/settings";
import { loginRoute, registerRoute } from "../../utils/routes";

export function DefaultTopBar() {

  return (
    <div className="relative">
      <a className="cursor-pointer block ml-2.5 font-bold text-base fixed left-3 z-1001 text-white top-7 md:hidden" href={loginRoute}>
        <span>{strings[language][loginString]}</span>
      </a>
      <TopBar>
        <div className="flex items-center relative">
          <a className="cursor-pointer ml-2.5 font-bold text-base hidden md:block" href={loginRoute}>
            <span>{strings[language][loginString]}</span>
          </a>
          <a className="cursor-pointer block ml-2.5 font-bold text-base" href={registerRoute}>
            <span>{strings[language][createAccountString]}</span>
          </a>
        </div>
      </TopBar>
    </div>
  );
}
