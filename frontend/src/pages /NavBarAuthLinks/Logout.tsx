import Cookies from "js-cookie"
import { Button } from "../../components/Button"
import { useSetRecoilState } from "recoil"
import { isUserLoggedIn } from "../store/atoms/UserAtom"
import { useNavigate } from "react-router-dom"

export const Logout = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(isUserLoggedIn);
  const handleLogout = () => {
    Cookies.remove("accessToken", {path : "document.cookie"})
    Cookies.remove("refreshToken", {path : "document.cookie"})
    setUser(false);
    navigate('/');
  }
  return (
    <>

      <Button className="ring-0 hover:text-green-400   text-neutral-50 " handlOnClick={handleLogout} content="Log Out"></Button>

    </>
  )
}
