import { useEffect, useState } from "react";
import img01 from "../assets/img-01.jpg";
import img02 from "../assets/img-02.jpg";
import img03 from "../assets/img-03.jpg";
import { useNavigate } from "react-router-dom";
import { loginRoute } from "../utils/routes";

export function useMainPage() {
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
  const navigator = useNavigate();

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
  }, [index]);

  const changeSlide = (alpha: number) => {
    if(isTransitioning) return;
    const nextIndex = (((index + alpha) % carouselData.length) + carouselData.length) % carouselData.length;
    setIsTransitioning(true);
    setAnimation(true);
    setIndex(nextIndex);
  }

  const setSlide = (i: number) => setIndex(i);

  const goToLogin = () => navigator(loginRoute);

  return {
    animation,
    setSlide,
    carouselData,
    changeSlide,
    index,
    carouselLength,
    setIsTransitioning,
    goToLogin,
  }
}
