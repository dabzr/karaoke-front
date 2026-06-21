import { TopBar } from "../../components/TopBar";
import { Avatar, Tooltip } from "@mui/material";
import { strings, logoutString } from "../../utils/strings";
import { language } from "../../utils/settings";
import LogoutIcon from '@mui/icons-material/Logout';
import { Loading } from "../../components/Loading";
import { useProfile } from "../../hooks/useProfile";
import { PlansModal } from "./PlansModal";
import { CreateRoomModal } from "./createRoomModal";
import { Toast } from "../../components/Toast";

export function ProfilePage() {

  const {
    handleLogout,
    host,
    isLoading,
    openPlanModal,
    planModal,
    buyPlan,
    closePlanModal,
    plan,
    roomModal,
    openRoomModal,
    closeRoomModal,
    handleCreateRoom,
    room,
    goToRoom,
    error,
    handleCloseError,
  } = useProfile();

  if(isLoading) return <Loading/>;

  return (
    <>
      <TopBar>
        <div className="flex gap-4">
          <button 
            onClick={handleLogout} 
              className="p-2 text-white hover:text-white rounded-full hover:bg-white/10 transition-all cursor-pointer"
          >
            <Tooltip title={strings[language][logoutString]}>
              <LogoutIcon />
            </Tooltip>
          </button>
        </div>
      </TopBar>
      
      <Toast error={error} handleCloseError={() => handleCloseError()}/>
      
      <div className="flex items-center p-4 pt-24 w-full z-90 flex-col min-h-[calc(100vh-52px)]">
        <h1 className="flex items-center justify-center h-20 text-4xl md:text-5xl font-black tracking-tight text-white mb-8">
          {"Perfil"}
        </h1>
        
        <div className="relative bg-white shadow-xl mt-16 mb-8 flex-col mx-4 p-8 pt-24 rounded-2xl w-full max-w-2xl border border-neutral-200">
          
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg">
            <Avatar sx={{ bgcolor: "#C19BDD", width: 130, height: 130, fontSize: 60, fontWeight: 'bold', border: '4px solid white' }}>
              {host ? host.email[0].toUpperCase() : "U"}
            </Avatar>
          </div>
          
          <div className="flex flex-col items-center w-full">
            <span className="text-xl md:text-2xl font-bold text-neutral-800 pb-6 tracking-tight text-center break-all">
              {`Email: ${host?.email}`} 
            </span>
            
            <div className="flex flex-col w-full border-t border-b border-neutral-100 py-6 my-2 items-center gap-2">
              <span className="text-base md:text-lg text-neutral-600 font-medium">
                {`Plano: `}
                <strong className="text-neutral-900 font-semibold">{plan ? plan.name : host?.plan.name}</strong> 
              </span>
              <span className="text-sm text-neutral-500 mb-4">
                {`Último pagamento: ${plan ? plan.lastPayment : host?.plan.lastPayment}`} 
              </span>
              
              <div className="flex flex-col items-center justify-center w-full">
                <button 
                  onClick={openPlanModal} 
                  className="bg-neutral-900 hover:bg-neutral-800 active:bg-black px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  {"Atualizar plano"}
                </button>
                <PlansModal open={planModal} closeModal={closePlanModal} onClick={(type: string) => buyPlan(type)}/>
              </div>
            </div>
            
            <div className="flex flex-col w-full pt-6 items-center">
              { room ? 
                <button 
                  onClick={goToRoom} 
                  className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 px-8 py-3 rounded-xl font-bold text-sm text-white transition-all cursor-pointer shadow-md hover:shadow-lg w-full max-w-sm text-center transform hover:-translate-y-0.5"
                >
                  {"Acessar Sala"}
                </button>
                : 
                <>
                  <div className="flex flex-col items-center text-center gap-4 w-full max-w-md">
                    <span className="text-base md:text-lg text-neutral-600 font-medium px-4">
                      {"Para usar a aplicação é necessário criar uma sala!"}
                    </span>
                    <button 
                      onClick={openRoomModal} 
                      className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 px-8 py-3 rounded-xl font-bold text-sm text-white transition-all cursor-pointer shadow-md hover:shadow-lg w-full max-w-xs transform hover:-translate-y-0.5"
                    >
                      {"Criar Sala"}
                    </button>
                    <CreateRoomModal open={roomModal} onClose={closeRoomModal} handleCreateRoom={handleCreateRoom}/>
                  </div>
                </>
              }
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}
