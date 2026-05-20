import { useNavigate, useParams } from "react-router-dom";

export function useVideo() {
  const { id } = useParams();
  const navigator = useNavigate();

  const returnPage = () => navigator(-1);

  return {
    id,
    returnPage,
  }
}
