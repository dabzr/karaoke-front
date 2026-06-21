import { TopBar } from "../../../components/TopBar";
import { strings, roomNotFoundString, backString, roomCodeString } from "../../../utils/strings";
import { language } from "../../../utils/settings";
import { useTv } from "../../../hooks/useTv";
import { Loading } from "../../../components/Loading/index";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { GeneralLayout } from "../../../components/GeneralLayout"
import { Tooltip } from "@mui/material";

export function TvPage() { 

  const { 
    room, 
    isLoading,
    videoUrl,
    returnPage,
    qrCodeUrl,
  } = useTv();

  if(isLoading) return <Loading/>

  if(!room) {
    return (
      <div className="flex flex-col p-14 min-h-screen"> 
        <TopBar/>
        <div className="flex flex-col items-center h-screen justify-center">
          {strings[language][roomNotFoundString]}
        </div>
      </div>
    );
  }

  if(videoUrl) {
    return (
      <div className="fixed inset-0 flex flex-col py-14 h-screen overflow-hidden">
        <div className="flex p-2">
          <TopBar/>
        </div>
        <div className="flex items-center justify-center pt-20">
          <iframe 
            className="w-[90vw] h-[90vh] max-w-7xl max-h-180 aspect-video"
            src={`https://www.youtube.com/embed/${videoUrl}`}
            title="YouTube video player" 
            style={{ border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
            allowFullScreen
          />
        </div>
      </div>
    )
  }

  return (
    <GeneralLayout screenName={room.name}>
      <div className="flex flex-col justify-center h-full items-center -m-2">
        <span className="text-[50px] text-white bold">{`${strings[language][roomCodeString]}: ${room.code}`}</span>
        {qrCodeUrl && (
          <img
            src={qrCodeUrl}
            className="inline-block ml-4 w-200 h-190 shadow-sm border border-gray-200"
          />
        )}
      </div>
    </GeneralLayout>
  );
}
