import { Input } from "../../components/Input/index";
import { Button } from "../../components/Button/index";
import { useLogin } from "../../hooks/useLogin";
import { Loading } from "../../components/Loading/index";
import { PasswordInput } from "../../components/PasswordInput";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Tooltip } from "@mui/material";
import { strings, backString, notHaveAccountYetString, createOneString, loginString } from "../../utils/strings";
import { language, url } from "../../utils/settings";
import { registerRoute } from "../../utils/routes";
import { Toast } from "../../components/Toast";
import { TopBar } from "../../components/TopBar";

export function LoginPage() {

  const { 
    email,
    setEmail,
    isLoading,
    handleLogin,
    error,
    password,
    setPassword,
    returnPage, 
    emailError,
    passwordError,
    handleCloseError,
  } = useLogin();

  if(isLoading) return <Loading/>

  return (
    <div className="flex flex-col h-full bg-[#C19BDD]"> 
      <Toast error={error} handleCloseError={handleCloseError}/>
      <TopBar/>
      <div className="flex justify-center items-center p-4 top-56 w-full z-90 flex-col min-h-[calc(100vh-56px)]">
        <div className="fixed left-4 z-110 top-16 justify-start">
          <button onClick={returnPage} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <Tooltip title={strings[language][backString]}>
              <ArrowBackIcon/>
            </Tooltip>
          </button>
        </div>
        <div className="flex flex-col w-100 justify-center items-center shadow-md rounded-sm bg-white">
          <div className="flex flex-col justify-start p-6 w-full">
            <h1 className="text-[1.25rem] self-start font-bold leading-6">{strings[language][loginString]}</h1>
            <div className="flex flex-col justify-start w-full grow shrink basis-[0%]">
              <div className="mt-6 mb-4 mx-0">
                <Input
                  label={"Email"}
                  required
                  onChange={(value) => setEmail(value)}
                  value={email}
                  maxLength={100}
                  error={emailError}
                />
                <PasswordInput
                  label={"Senha"}
                  required
                  onChange={(value) => setPassword(value)}
                  value={password}
                  maxLength={100}
                  error={passwordError}
                />
              </div>
            <div className="flex flex-col gap-5 w-full justify-center">
              <Button
                label={strings[language][loginString]}
                onClick={() => handleLogin()}
                disabled={isLoading}
              />
              <p>
                {strings[language][notHaveAccountYetString]}&nbsp;
                <a href={`${url + registerRoute}`} className="underline font-bold">
                  {strings[language][createOneString]}
                </a>
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
