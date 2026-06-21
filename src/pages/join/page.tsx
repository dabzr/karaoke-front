import { TopBar } from "../../components/TopBar/index";
import { Input } from "../../components/Input/index";
import { Button } from "../../components/Button/index";
import { useJoin } from "../../hooks/useJoin";
import { strings, enterString, writeRoomCodeString } from "../../utils/strings";
import { language } from "../../utils/settings";

export function JoinPage() {

  const { code, setCode, codeError, handleEnter, isLoading } = useJoin();

  return (
    <div className="flex flex-col h-full"> 
      <TopBar/>
      <div className="flex justify-center items-center p-4 top-56 z-90 flex-col min-h-[calc(100vh-56px)]">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col max-w-[320px] mt-0 mx-6 mb-5 justify-start w-full grow shrink basis-[0%] bg-gray-100 p-4 rounded-sm shadow-black">
            <div className="flex flex-col justify-items items-center">
              <Input
                label={strings[language][writeRoomCodeString]}
                required
                onChange={(value) => setCode(value.toUpperCase())}
                value={code}
                maxLength={10}
                error={codeError}
              />
            </div>
            <Button
              label={strings[language][enterString]}
              onClick={() => handleEnter()}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
