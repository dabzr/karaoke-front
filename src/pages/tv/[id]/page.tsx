import { TopBar } from "../../../components/TopBar";
import { strings, roomNotFoundString, roomCodeString } from "../../../utils/strings";
import { language } from "../../../utils/settings";
import { useTv } from "../../../hooks/useTv";
import { Loading } from "../../../components/Loading/index";
import { GeneralLayout } from "../../../components/GeneralLayout"

export function TvPage() { 

  const { 
    room, 
    isLoading,
    videoUrl,
    qrCodeUrl,
    isFullscreen,
    containerRef,
    toggleFullscreen,
    emoji,
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
        <div className="relative flex items-center justify-center">
          <div ref={containerRef} className="relative
            flex
            items-center
            justify-center
            bg-black
            w-[90vw]
            h-[90vh]
            fullscreen:w-screen
            fullscreen:h-screen"
          >
            <iframe 
              className={isFullscreen ? "w-screen h-screen" : "w-[90vw] h-[90vh]"}
              src={`https://www.youtube.com/embed/${videoUrl}?fs=0&controls=0`}
              title="YouTube video player" 
              style={{ border: 'none' }}
            />
            {emoji?.emoji && (
              <div 
                key={Math.random()}
                className="absolute right-4 bottom-6 text-white text-7xl pointer-events-none select-none"
                style={{
                  animation: 'emoji-float-fade 2s ease-out forwards'
                }}
              >
                {emoji.emoji}
                
                <style>{`
                  @keyframes emoji-float-fade {
                    0% {
                      transform: translateY(0);
                      opacity: 1;
                    }
                    100% {
                      transform: translateY(-150px);
                      opacity: 0;                   
                    }
                  }
                `}</style>
              </div>
            )}
              <button className="absolute text-white right-4 bottom-6" onClick={toggleFullscreen}>
                <svg height="24" viewBox="0 0 24 24" width="24">
                  {isFullscreen ? 
                    <path d="M3.29 3.29C3.11 3.46 3.01 3.70 3.00 3.94C2.98 4.19 3.06 4.43 3.22 4.63L3.29 4.70L7.58 8.99H5C4.73 8.99 4.48 9.10 4.29 9.29C4.10 9.47 4 9.73 4 9.99C4 10.26 4.10 10.51 4.29 10.70C4.48 10.89 4.73 10.99 5 10.99H11V4.99C11 4.73 10.89 4.47 10.70 4.29C10.51 4.10 10.26 3.99 10 3.99C9.73 3.99 9.48 4.10 9.29 4.29C9.10 4.47 9 4.73 9 4.99V7.58L4.70 3.29L4.63 3.22C4.43 3.06 4.19 2.98 3.94 3.00C3.70 3.01 3.46 3.11 3.29 3.29ZM19 13H13V19C13 19.26 13.10 19.51 13.29 19.70C13.48 19.89 13.73 20 14 20C14.26 20 14.51 19.89 14.70 19.70C14.89 19.51 15 19.26 15 19V16.41L19.29 20.70L19.36 20.77C19.56 20.92 19.80 21.00 20.04 20.99C20.29 20.98 20.52 20.87 20.70 20.70C20.87 20.52 20.98 20.29 20.99 20.04C21.00 19.80 20.92 19.56 20.77 19.36L20.70 19.29L16.41 15H19C19.26 15 19.51 14.89 19.70 14.70C19.89 14.51 20 14.26 20 14C20 13.73 19.89 13.48 19.70 13.29C19.51 13.10 19.26 13 19 13Z" fill="white"></path>
                    :
                    <path d="M10 3H3V10C3 10.26 3.10 10.51 3.29 10.70C3.48 10.89 3.73 11 4 11C4.26 11 4.51 10.89 4.70 10.70C4.89 10.51 5 10.26 5 10V6.41L9.29 10.70L9.36 10.77C9.56 10.92 9.80 11.00 10.04 10.99C10.29 10.98 10.52 10.87 10.70 10.70C10.87 10.52 10.98 10.29 10.99 10.04C11.00 9.80 10.92 9.56 10.77 9.36L10.70 9.29L6.41 5H10C10.26 5 10.51 4.89 10.70 4.70C10.89 4.51 11 4.26 11 4C11 3.73 10.89 3.48 10.70 3.29C10.51 3.10 10.26 3 10 3ZM20 13C19.73 13 19.48 13.10 19.29 13.29C19.10 13.48 19 13.73 19 14V17.58L14.70 13.29L14.63 13.22C14.43 13.07 14.19 12.99 13.95 13.00C13.70 13.01 13.47 13.12 13.29 13.29C13.12 13.47 13.01 13.70 13.00 13.95C12.99 14.19 13.07 14.43 13.22 14.63L13.29 14.70L17.58 19H14C13.73 19 13.48 19.10 13.29 19.29C13.10 19.48 13 19.73 13 20C13 20.26 13.10 20.51 13.29 20.70C13.48 20.89 13.73 21 14 21H21V14C21 13.73 20.89 13.48 20.70 13.29C20.51 13.10 20.26 13 20 13Z" fill="white"></path>
                  }
                </svg>
              </button>
          </div>
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
