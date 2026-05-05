import { TopBar } from "../../components/TopBar/index";
import { Input } from "../../components/Input/index";
import { Button } from "../../components/Button/index";
import { useJoin } from "../../hooks/useJoin";
import { strings, enterString, writeRoomCodeString } from "../../utils/strings";
import { language } from "../../utils/settings";

export function JoinPage() {

  const {code, setCode, codeError, handleEnter, isLoading } = useJoin();

  return (
    <div className="flex flex-col p-14 min-h-screen"> 
      <TopBar/>
      <div className="flex flex-col items-center h-screen justify-center">
        <div className="flex flex-col w-60">
          <Input
            label={strings[language][writeRoomCodeString]}
            required
            onChange={(value) => setCode(value)}
            value={code}
            maxLength={10}
            error={codeError}
          />
          <Button
            label={strings[language][enterString]}
            onClick={() => handleEnter()}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
