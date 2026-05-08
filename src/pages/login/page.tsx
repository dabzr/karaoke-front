import { Input } from "../../components/Input/index";
import { Button } from "../../components/Button/index";
import { useLogin } from "../../hooks/useLogin";
import { Loading } from "../../components/Loading/index";
import { PasswordInput } from "../../components/PasswordInput";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Tooltip } from "@mui/material";
import { strings, backString, notHaveAccountYetString, createOneString } from "../../utils/strings";
import { language, url } from "../../utils/settings";
import { registerRoute } from "../../utils/routes";
import { DefaultTopBar } from "../../components/DefaultTopBar";
import { Toast } from "../../components/Toast";

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
    <div className="flex flex-col p-14 min-h-screen"> 
      <Toast error={error} handleCloseError={handleCloseError}/>
      <DefaultTopBar/>
      <div className="flex justify-start">
        <button onClick={returnPage} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Tooltip title={strings[language][backString]}>
            <ArrowBackIcon/>
          </Tooltip>
        </button>
      </div>
      <div className="flex flex-col items-center h-screen justify-center">
        <div className="flex flex-col w-100 justify-center items-center">
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
          <div className="flex flex-col gap-5 w-100 mt-2 justify-center">
            <Button
              label={"Logar"}
              onClick={() => handleLogin()}
              disabled={isLoading}
            />
            <div className="flex justify-center gap-2">
              <label>
                {strings[language][notHaveAccountYetString]}
              </label>
              <a href={`${url + registerRoute}`} className="text-blue-600 underline visited:text-blue-600">
                {strings[language][createOneString]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
