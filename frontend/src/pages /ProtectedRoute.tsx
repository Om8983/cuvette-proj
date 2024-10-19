import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { isUserLoggedIn } from "./store/atoms/UserAtom"
import axios, { AxiosError } from "axios"
export const ProtectedRoute = () => {

  const setUser = useSetRecoilState(isUserLoggedIn)
  const navigate = useNavigate();

  // defining the type for the user coming from response.data
  // type res = {
  //   user: {
  //     id: string,
  //     username: string,
  //     email: string,
  //   }
  // }

  useEffect(() => {
    (async () => {
      try{
        const response = await axios.get('http://localhost:3000/auth/user', {withCredentials : true})
      if (response.status === 200) {
        // const { user } = response.data as res;
        setUser(true)
        navigate('/dashboard')
      }
      }catch(error){
        if(error instanceof AxiosError){
          if (error.response?.status === 404) {
            alert("Unauthorized User")
            navigate('/login')
          }
    
          if (error.response?.status === 500) {
            alert('Internal Server error')
            navigate('/login')
          }
        }
      }
    })()

    return () => {
      // console.log("cleanup successfull")
    }
  }, [navigate, setUser])

  return (
    <>
      Loading...
    </>
  )
}
