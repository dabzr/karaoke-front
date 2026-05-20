import { useVideo } from "../../../hooks/useVideo";
import { DefaultTopBar } from "../../../components/DefaultTopBar";
import { backString, strings } from "../../../utils/strings";
import { language } from "../../../utils/settings";
import { Tooltip } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function VideoPage() {

  const { 
    id, 
    returnPage,
  } = useVideo();

  return (
    <div className="fixed inset-0 flex flex-col py-14 h-screen overflow-hidden">
      <div className="flex p-2">
        <DefaultTopBar/>
        <div className="flex justify-start">
          <button onClick={returnPage} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Tooltip title={strings[language][backString]}>
              <ArrowBackIcon/>
            </Tooltip>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center pt-10">
        <iframe 
          className="w-[90vw] h-[90vh] max-w-[1280px] max-h-[720px] aspect-video"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player" 
          style={{ border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
          allowFullScreen
        />
      </div>
    </div>
  )
}
