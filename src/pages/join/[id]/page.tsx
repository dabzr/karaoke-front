import { TopBar } from "../../../components/TopBar/index";
import { PasswordInput } from "../../../components/PasswordInput/index";
import { Input } from "../../../components/Input/index";
import { Button } from "../../../components/Button/index";
import { useJoinId } from "../../../hooks/useJoinId";
import { strings, enterString, roomNotFoundString, writePasswordString, writeNameString, backString } from "../../../utils/strings";
import { language } from "../../../utils/settings";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Tooltip } from "@mui/material";

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
    returnPage,
  } = useJoinId();

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
        <div className="flex flex-col h-screen">
          <div className="flex justify-start">
            <button onClick={returnPage} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Tooltip title={strings[language][backString]}>
                <ArrowBackIcon/>
              </Tooltip>
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="flex flex-col w-60">
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
      }
    </div>
  );
}
