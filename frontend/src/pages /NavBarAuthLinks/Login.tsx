
import axios from "axios"
import { BlurBox } from "../../components/BlurBox"
import { InputBox } from "../../components/InputBox"
import { Button } from "../../components/Button"
import { GoogleBtn } from "../../components/GoogleBtn"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { isUserLoggedIn } from "../store/atoms/UserAtom"

export const Login: React.FC = () => {



    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")

    const navigate = useNavigate();

    const setUser = useSetRecoilState(isUserLoggedIn)
    // collecting user info and creating user...
    const handleOnclick = async () => {

        interface User {
            email: string
            password: string
        }

        const userLoginCred: User = {
            email: email,
            password: password
        }

        axios.post("http://localhost:3000/app/v1/login", userLoginCred, { withCredentials: true })
            .then((AxiosResponse) => {
                if (AxiosResponse.status === 200) {
                    setUser(true)
                    alert("User Login Successfull!")
                    navigate("/dashboard")
                    return;
                }
            })
            .catch((AxiosError) => {
                if (AxiosError.status === 404) {
                    alert("User Doesn't exist. Please SingUp")
                    navigate("/signup")
                    return;
                } else if (AxiosError.status === 401) {
                    alert("Please Enter Valid Credentials")
                    navigate('/login')
                    return;
                } else if (AxiosError.status === 500) {
                    alert("Internal Server Error")
                    navigate('/login')
                    return;
                }else{
                    console.error("unexpected error occured")
                    navigate('/login')
                }
            })

    }

    // redirecting the user to external google auth page...
    const googleAuthBtn = () => {
        try {
            // the ideal approach to redirect the user to the external auth page is by using "window.open"or "window.location.href", which would take/redirect the user to the auth page. 
            window.open("http://localhost:3000/auth/google")
            return;
        } catch (e) {
            console.log("Error while redirecting to authentication page");
        }
    }
    return (
        <>

            <div className="flex justify-end" >
                <img src="/watercolor.jpg" alt="star_img" className="w-screen h-screen absolute " />
                <BlurBox>
                    {/* input boxesx */}

                    <InputBox content={"Email"} value="email" setValue={setEmail}></InputBox>
                    <InputBox content={"Password"} value="password" setValue={setPass}></InputBox>
                    {/*  signup button */}
                    <Button handlOnClick={handleOnclick} content="Login"></Button>

                    {/* login redirect */}
                    <div className="font-medium font-serif">
                        <span>Don't Have an Account?</span> <a href="http://localhost:5173/signup" className="cursor-pointer
                        hover:text-[#0d7395]  transition ease-in-out hover:scale-110     
                        ">SignUp</a>
                    </div>
                    <GoogleBtn content="Login with Google" handleOnclick={googleAuthBtn} ></GoogleBtn>
                </BlurBox>

            </div>
        </>
    )
}
// const response = await axios.post("http://localhost:3000/app/v1/login", userLoginCred, {withCredentials: true})

// if(response.status === 200){
//     setUser(true)
//     alert("User Login Successfull!")
//     navigate("/dashboard")
//     return;
// }
// if(response.status === 404){
//     alert("User Doesn't exist. Please SingUp")
//     navigate("/signup")
//     return;
// }
// if(response.status === 401){
//     alert("Please Enter Valid Credentials")
//     navigate('/login')
//     return;
// }
// if(response.status === 500){
//     alert("Internal Server Error")
//     navigate('/login')
//     return;
// }
