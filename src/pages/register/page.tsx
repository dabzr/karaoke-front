import { Input } from "../../components/Input/index";
import { Button } from "../../components/Button/index";
import { useRegister } from "../../hooks/useRegister";
import { Loading } from "../../components/Loading/index";
import { PasswordInput } from "../../components/PasswordInput";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Tooltip } from "@mui/material";
import { strings, backString, createAccountString, alreadyHasAccountString, loginString } from "../../utils/strings";
import { language, url } from "../../utils/settings";
import { loginRoute } from "../../utils/routes";
import { TopBar } from "../../components/TopBar";
import { Toast } from "../../components/Toast";

export function RegisterPage() {

  const { 
    email,
    setEmail,
    isLoading,
    handleLogin,
    error,
    password,
    changePassword,
    returnPage, 
    emailError,
    passwordError,
    confirmPassword,
    verifyConfirmPassword,
    confirmPasswordError,
    handleCloseError,
  } = useRegister();

  if(isLoading) return <Loading/>

  return (
    <div className="flex flex-col h-full"> 
      <Toast error={error} handleCloseError={handleCloseError}/>
      <TopBar/>
      <div className="flex justify-center items-center p-4 top-56 w-full z-90 flex-col min-h-[calc(100vh-56px)]">
        <div className="fixed left-4 z-110 top-23 justify-start">
          <button onClick={returnPage} className="p-2 hover:bg-indigo rounded-full transition-colors cursor-pointer">
            <Tooltip title={strings[language][backString]}>
              <ArrowBackIcon className="text-white"/>
            </Tooltip>
          </button>
        </div>
        <div className="flex flex-col w-100 justify-center items-center shadow-md rounded-sm bg-white">
          <div className="flex flex-col items-center w-full max-w-102 m-0">
            <div className="flex flex-col w-100 justify-center items-center shadow-md rounded-sm">
              <div className="flex flex-col justify-start p-6 w-full">
                <h1 className="text-[1.25rem] self-start font-bold leading-6">Criar Conta</h1>
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
                      onChange={(value) => changePassword(value)}
                      value={password}
                      maxLength={100}
                      error={passwordError}
                    />
                    <PasswordInput
                      label={"Confirmar Senha"}
                      required
                      onChange={(value) => verifyConfirmPassword(value)}
                      value={confirmPassword}
                      maxLength={100}
                      error={confirmPasswordError}
                    />
                  </div>
                  <div className="flex flex-col gap-5 w-full justify-center">
                    <Button
                      label={strings[language][createAccountString]}
                      onClick={() => handleLogin()}
                      disabled={isLoading || password !== confirmPassword}
                    />
                    <p>
                      {strings[language][alreadyHasAccountString]}&nbsp;
                      <a href={`${url + loginRoute}`} className="underline font-bold">
                        {strings[language][loginString]}
                      </a>
                    </p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
