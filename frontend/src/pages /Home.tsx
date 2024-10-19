// import { Navbar } from "./Navbar"
import { useNavigate } from "react-router-dom"
import { Logout } from "./NavBarAuthLinks/Logout"
import { Button } from "../components/Button";
// import { Dashboard } from "./Dashboard";
export const Home = () => {
  const navigate = useNavigate();
  // const user = useRecoilState(isUserLoggedIn)
  const handleClick = (navTab: string) => {
    navigate(`/${navTab}`)
  }

  return (
    <>
      <div className=" w-screen h-screen bg-homeGrad flex justify-around ">
        <div className="h-[50px] w-[40rem] justify-evenly flex mt-5">
          <div className=" w-[150px] h-[80px]  mb-[36rem] ">
            <a href="/" >
              <img src="webpsyche.jpg" alt="webimg" />
            </a>
          </div>

          <Button className=" hover:text-green-400   text-neutral-50 " handlOnClick={() => handleClick('protectedRoute')} content="Dashboard"></Button>

          {
            !document.cookie ?
              <div className="flex gap-6  ">
                <Button className="  hover:text-green-400   text-neutral-50 " handlOnClick={() => handleClick('signup')} content="Sign Up"></Button>
                <Button className="  hover:text-green-400  text-neutral-50" handlOnClick={() => handleClick('login')} content="Sign In"></Button>
              </div>
              :
              <Logout />
          }

        </div>

      </div>
    </>
  )
}
