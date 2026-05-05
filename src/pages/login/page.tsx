import { TopBar } from "../../components/TopBar/index";
import { Input } from "../../components/Input/index";
import { Button } from "../../components/Button/index";
import { useLogin } from "../../hooks/useLogin";
import { Loading } from "../../components/Loading/index";

export function LoginPage() {

  const { email, setEmail, isLoading, handleLogin, error } = useLogin();

  if(isLoading) return <Loading/>

  return (
    <div className="flex flex-col p-14 min-h-screen"> 
      <TopBar/>
      <div className="flex flex-col items-center h-screen justify-center">
        <div className="flex flex-col w-100 justify-center items-center">
          <Input
            label={"Email"}
            required
            onChange={(value) => setEmail(value)}
            value={email}
            maxLength={100}
            error={error}
          />
          <div>
            <Button
              label={"Logar"}
              onClick={() => handleLogin()}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
