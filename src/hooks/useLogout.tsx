import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigator = useNavigate();

  const handleLogout = () => {
    logout();
    navigator("/");
  }

  return { handleLogout };
}
