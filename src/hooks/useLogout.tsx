import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { profileRoute } from "../utils/routes";

export function useLogout() {
  const navigator = useNavigate();

  const handleLogout = () => {
    logout();
    navigator("/");
  }

  const goToProfilePage = () => {
    navigator(profileRoute);
  }

  return { handleLogout, goToProfilePage };
}
