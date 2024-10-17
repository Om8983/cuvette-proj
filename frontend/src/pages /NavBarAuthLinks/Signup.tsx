import axios from "axios"
import { BlurBox } from "../../components/BlurBox"
import { InputBox } from "../../components/InputBox"
import { Button } from "../../components/Button"
import { GoogleBtn } from "../../components/GoogleBtn"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { isUserLoggedIn } from "../store/atoms/UserAtom"


export const Signup: React.FC = () => {


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")

    const navigate = useNavigate();

    // importing atom to set user 
    const setUser = useSetRecoilState(isUserLoggedIn)

    // collecting user info and creating user...
    const handleUserInfo = async () => {

        interface User {
            username: string
            email: string
            password: string
        }

        const newUser: User = {
            username: username,
            email: email,
            password: password
        }

        const res = await axios.post("http://localhost:3000/app/v1/signup", newUser, { withCredentials: true })

        console.log(res);
        console.log(res.status);
        
        
        // if (res.status === 200) {
        //     setUser(true)
        //     alert("User Signup Successfull!")
        //     navigate("/dashboard")
        //     return;
        // } else if (res.status === 404) {
        //     alert("User doesn't exist. Please sign up.");
        //     navigate("/signup");
        // } else if (res.status === 401) {
        //     alert("Please enter valid credentials.");
        //     navigate('/login');
        // } else if (res.status === 500) {
        //     alert("Internal server error.");
        //     navigate('/login');
        // } else {
        //     console.error("Unexpected error");
        //     alert("An unexpected error occurred. Please try again.");
        // }
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
                    <InputBox content={"Username"} value="username" setValue={setUsername} ></InputBox>
                    <InputBox content={"Email"} value="email" setValue={setEmail}></InputBox>
                    <InputBox content={"Password"} value="password" setValue={setPass}></InputBox>
                    {/*  signup button */}
                    <Button handlOnClick={handleUserInfo} content="SignUp"></Button>

                    {/* login redirect */}
                    <div className="font-medium font-serif">
                        <span>Already a User?</span> <a href="http://localhost:5173/login" className="cursor-pointer
                        hover:text-[#0d7395]  transition ease-in-out hover:scale-110     
                    ">Login</a>
                    </div>
                    <GoogleBtn content="SignUp with Google" handleOnclick={googleAuthBtn} ></GoogleBtn>
                </BlurBox>

            </div>
        </>
    )
}
