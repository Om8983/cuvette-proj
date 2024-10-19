// import { useRecoilState } from "recoil"

import { useNavigate } from "react-router-dom"
import { Logout } from "./NavBarAuthLinks/Logout"

// import { isUserLoggedIn } from "./store/atoms/UserAtom"


export const Navbar = () => { 
  const navigate = useNavigate();
  // const user = useRecoilState(isUserLoggedIn)
  const handleClick = (navTab : string) => {
    navigate(`/${navTab}`)
  }
  return (
    <>
      {
        !document.cookie ?
          <>
            <button onClick={() => handleClick('signup')}>SignUp</button>
            <button onClick={() => handleClick('login')}>Login</button>
          </>
          :
          <Logout />
      }
    </>
  )
}
