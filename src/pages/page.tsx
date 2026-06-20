import { DefaultTopBar } from "../components/DefaultTopBar";
import { useEffect, useState } from "react";
import img01 from "../assets/img-01.jpg";
import img02 from "../assets/img-02.jpg";
import img03 from "../assets/img-03.jpg";
import GitHubIcon from '@mui/icons-material/GitHub';

export function HomePage() {   
  const carouselData = [
    { img: img03, text: "Faça seu karaokê ser mais divertido!" },
    { img: img01, text: "Organize seu karaokê facilmente!" },
    { img: img02, text: "Preços acessíveis" },
    { img: img03, text: "Faça seu karaokê ser mais divertido!" },
    { img: img01, text: "Organize seu karaokê facilmente!" },
  ];

  const carouselLength = 3;

  const [index, setIndex] = useState<number>(1);
  const [animation, setAnimation] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    if (index === 4 || index === 0) {
      const resetTimer = setTimeout(() => {
        setAnimation(false);
        setIndex(index * -(1/2) + 3);
        
        setIsTransitioning(false); 
      }, 700); 

      return () => clearTimeout(resetTimer);
    }

    const timer = setInterval(() => {
      changeSlide(1);
      setIsTransitioning(false);
    }, 5000);

    return () => clearInterval(timer);
  }, [index, carouselLength]);

  const changeSlide = (alpha: number) => {
    if(isTransitioning) return;
    const nextIndex = (((index + alpha) % carouselData.length) + carouselData.length) % carouselData.length;
    setAnimation(true);
    setIsTransitioning(true);
    setIndex(nextIndex);
  }

  const setSlide = (i: number) => setIndex(i);

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(30px) scale(0.6); opacity: 0; }
          30% { opacity: 0.7; }
          80% { opacity: 0.4; }
          100% { transform: translateY(-70px) scale(1.1); opacity: 0; }
        }
        .note-svg-1 { animation: floatUp 2.8s infinite ease-in-out; }
        .note-svg-2 { animation: floatUp 3.4s infinite ease-in-out 0.8s; }
        .note-svg-3 { animation: floatUp 2.2s infinite ease-in-out 1.5s; }
      `}</style>

      <DefaultTopBar />
      <div className="pt-14 min-h-screen text-neutral-800 font-sans">
        
        <div className="relative flex flex-col justify-center h-[70vh] overflow-hidden w-full bg-neutral-950 shadow-inner">
          
          <div 
            className={`absolute inset-0 flex w-full h-full ${animation ? "transition-transform duration-700 ease-in-out" : ""} z-0`}
            style={{ transform: `translateX(-${index * 100}%)` }}
            onTransitionEnd={() => setIsTransitioning(false)}
          >
            {carouselData.map((slide, i) => (
              <div key={i} className="relative w-full h-full shrink-0 flex items-center justify-center">
                <img 
                  src={slide.img} 
                  className="absolute inset-0 w-full h-full object-cover blur-xs brightness-[0.4]" 
                  alt={`Slide ${i}`}
                />
                <div className="relative z-10 w-full max-w-4xl px-8 text-center text-white drop-shadow-xl">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight wrap-break-words">
                    {slide.text}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex flex-row w-full justify-between items-center px-6 pointer-events-none">
            <button className="cursor-pointer pointer-events-auto transition-transform hover:scale-105 active:scale-95" onClick={() => changeSlide(-1)}>
              <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="black" opacity="0.4"/>
                <polyline points="55,35 40,50 55,65" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button className="cursor-pointer pointer-events-auto transition-transform hover:scale-105 active:scale-95" onClick={() => changeSlide(1)}>
              <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="black" opacity="0.4"/>
                <polyline points="45,35 60,50 45,65" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-row w-full justify-center gap-2.5">
            {carouselData.map((_, i) => {
              if(i === 0 || i > carouselLength) return;
              return (
                <button key={i} className="cursor-pointer group" onClick={() => setSlide(i)}>
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${((index === 0 || index > carouselLength) ? index * -(1/2) + 3 : index) === i ? "bg-white scale-125" : "bg-white/30 group-hover:bg-white/60"}`} />
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex py-20 justify-around items-center max-w-7xl mx-auto px-6">
          <div className="flex flex-col w-150 gap-4">
            <span className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight wrap-break-words">
              Sistema de gerenciamento de karaokê
            </span>
            <span className="text-lg md:text-xl text-white font-medium leading-relaxed wrap-anywhere">
              Organize e gerencie a fila facilmente, tornando a experiência do seu usuário mais divertida.
            </span>
          </div>
          
          <div className="relative flex items-center justify-center w-36 h-36">
            
            <svg viewBox="0 0 24 24" width="24" height="24" className="note-svg-1 absolute text-white top-2 left-2 fill-current">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>

            <svg viewBox="0 0 24 24" width="28" height="28" className="note-svg-2 absolute text-white top-4 right-2 fill-current">
              <path d="M16 3h5v3h-5v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h3V4h-5V3zM6 13.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V9h4v4.55z"/>
            </svg>

            <svg viewBox="0 0 24 24" width="20" height="20" className="note-svg-3 absolute text-white -top-2 left-14 fill-current">
              <path d="M12 2v11.05c-.54-.23-1.13-.35-1.75-.35-2.35 0-4.25 1.9-4.25 4.25S7.9 21.2 10.25 21.2c2.23 0 4.05-1.72 4.23-3.92l.02-.28V5.5h4V2h-6.5z"/>
            </svg>
            
            <svg 
              width="90" 
              height="90" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className="text-white animate-bounce [animation-duration:3.5s]"
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="9" y="2" width="6" height="10" rx="3" fill="currentColor" fillOpacity="0.15"/>
              <path d="M12 12v3" />
              <path d="M8 8a4 4 0 0 0 8 0" />
              
              <line x1="12" y1="15" x2="12" y2="22" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col w-full py-16 min-h-25 bg-white text-black justify-center items-center">
          <div className="flex w-full justify-center items-center font-extrabold text-4xl md:text-5xl">Porque você deveria usar nosso site?</div>
            <div className="flex max-w-150 pt-5 justify-center items-center text-center text-lg md:text-xl wrap-anywhere">Usar papel para controlar a fila é desgastante, evita conflitos e torna a experiência mais divertida</div>
        </div>

        <div className="flex flex-col pb-16 min-h-25 bg-white">
          <span className="flex text-3xl font-black text-black tracking-tight justify-center pb-10">
            Planos
          </span>
          <div className="flex flex-row w-full justify-around px-50 max-w-7xl mx-auto">
            
            <div className="flex flex-col rounded-2xl border border-neutral-200/80 shadow-sm hover:shadow-xl bg-white w-50 items-center p-6 transition-all duration-300 hover:-translate-y-1">
              <span className="text-xl font-bold text-neutral-500 mb-1">Diário</span>
              <span className="text-3xl font-black text-neutral-900 mb-6">R$ 0,00</span>
              <button className="bg-neutral-900 hover:bg-neutral-800 active:bg-black p-2.5 rounded-xl w-[90%] font-semibold text-sm text-white transition-colors cursor-pointer shadow-sm">
                Assinar
              </button>
            </div>
            
            <div className="flex flex-col rounded-2xl border border-neutral-200/80 shadow-sm hover:shadow-xl bg-white w-50 items-center p-6 transition-all duration-300 hover:-translate-y-1">
              <span className="text-xl font-bold text-neutral-500 mb-1">Mensal</span>
              <span className="text-3xl font-black text-neutral-900 mb-6">R$ 0,00</span>
              <button className="bg-neutral-900 hover:bg-neutral-800 active:bg-black p-2.5 rounded-xl w-[90%] font-semibold text-sm text-white transition-colors cursor-pointer shadow-sm">
                Assinar
              </button>
            </div>
            
            <div className="flex flex-col rounded-2xl border border-neutral-200/80 shadow-sm hover:shadow-xl bg-white w-50 items-center p-6 transition-all duration-300 hover:-translate-y-1">
              <span className="text-xl font-bold text-neutral-500 mb-1">Anual</span>
              <span className="text-3xl font-black text-neutral-900 mb-6">R$ 0,00</span>
              <button className="bg-neutral-900 hover:bg-neutral-800 active:bg-black p-2.5 rounded-xl w-[90%] font-semibold text-sm text-white transition-colors cursor-pointer shadow-sm">
                Assinar
              </button>
            </div>

          </div>
        </div>

        <div className="flex flex-row w-full bg-indigo text-white py-6 px-12 justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">Contatos:</span>
          </div>
          <a href="#" className="text-white hover:text-white transition-colors" aria-label="GitHub">
            <GitHubIcon className="text-3xl!" />
          </a>
        </div>

      </div>
    </>
  );
}
