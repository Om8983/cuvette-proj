// here we will be defining the top navbar which remains fixed throughout all the pages or the ones we specify. The specific pages are the childrens of the Landing page which we will be defining in Approutes.tsx 

// To let you know I won't be using this in this small project want to try out different UI 
import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"


export const Landing = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
        </>
    )
}
