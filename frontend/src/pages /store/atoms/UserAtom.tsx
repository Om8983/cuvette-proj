import { atom } from "recoil";

export const isUserLoggedIn = atom({
    key : "userToken",
    default : false 
})