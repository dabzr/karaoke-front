import { TopBar } from "../../../components/TopBar/index";
import { PasswordInput } from "../../../components/PasswordInput/index";
import { Input } from "../../../components/Input/index";
import { Button } from "../../../components/Button/index";
import { useJoinId } from "../../../hooks/useJoinId";
import { strings, enterString, roomNotFoundString, writePasswordString, writeNameString } from "../../../utils/strings";
import { language } from "../../../utils/settings";
import { Loading } from "../../../components/Loading";
import { Toast } from "../../../components/Toast";

export function JoinIdPage() {

  const { 
    roomInfo, 
    password, 
    setPassword, 
    validateAccess, 
    isLoading, 
    name, 
    setName,
    handlePassword,
    handleEnter, 
    error,
    handleCloseError,
  } = useJoinId();

  if(isLoading) return <Loading/>

  if(!roomInfo) {
    return (
      <div className="flex flex-col p-14 min-h-screen"> 
        <TopBar/>
          <div className="flex flex-col items-center h-screen justify-center">
            {strings[language][roomNotFoundString]}
          </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-14 min-h-screen"> 
      <TopBar/>
      <Toast  error={error} handleCloseError={handleCloseError}/>
      {!validateAccess ? 
        <div className="flex flex-col items-center h-screen justify-center">
          <div className="flex flex-col w-60">
            <PasswordInput
              label={strings[language][writePasswordString]}
              required
              onChange={(value) => setPassword(value)}
              value={password}
              maxLength={10}
              error={error}
            />
            <Button
              label={strings[language][enterString]}
              onClick={() => handlePassword()}
              disabled={isLoading}
            />
          </div>
        </div>
        :
        <div className="flex justify-center items-center p-4 top-56 z-90 flex-col min-h-[calc(100vh-56px)]">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col max-w-[320px] mt-0 mx-6 mb-5 justify-start w-full grow shrink basis-[0%] bg-gray-100 p-4 rounded-sm shadow-black">
              <div className="flex flex-col justify-items items-center">
                <Input
                  label={strings[language][writeNameString]}
                  required
                  onChange={(value) => setName(value)}
                  value={name}
                  maxLength={10}
                />
                <Button
                  label={strings[language][enterString]}
                  onClick={() => handleEnter()}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
