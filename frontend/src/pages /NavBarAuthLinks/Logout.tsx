import Cookies from "js-cookie"
import { Button } from "../../components/Button"
import { useRecoilState } from "recoil"
import { isUserLoggedIn } from "../store/atoms/UserAtom"

export const Logout = () => {
  const user = useRecoilState(isUserLoggedIn)
  const handleLogout = () => {
    Cookies.remove('accessToken', {path : ""})
    console.log(user);

  }
  return (
    <>
      <Button content="Logout" handlOnClick={handleLogout}></Button>
    </>
  )
}
