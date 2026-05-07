import { TopBar } from "../../components/TopBar/index";
import { Input } from "../../components/Input/index";
import { Button } from "../../components/Button/index";
import { useRegister } from "../../hooks/useRegister";
import { Loading } from "../../components/Loading/index";
import { PasswordInput } from "../../components/PasswordInput";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Tooltip } from "@mui/material";
import { strings, backString, createAccountString } from "../../utils/strings";
import { language } from "../../utils/settings";

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
  } = useRegister();

  if(isLoading) return <Loading/>

  return (
    <div className="flex flex-col p-14 min-h-screen"> 
      <TopBar/>
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
          <div>
            <Button
              label={strings[language][createAccountString]}
              onClick={() => handleLogin()}
              disabled={isLoading || confirmPassword && password !== confirmPassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
