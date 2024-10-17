import { useRecoilState } from "recoil"
import { Login } from "./NavBarAuthLinks/Login"
import { Logout } from "./NavBarAuthLinks/Logout"
import { Signup } from "./NavBarAuthLinks/Signup"
import { isUserLoggedIn } from "./store/atoms/UserAtom"


export const Navbar = () => {
  const user = useRecoilState(isUserLoggedIn)

  return (
    <>
      {
        user
      }
    </>
  )
}
