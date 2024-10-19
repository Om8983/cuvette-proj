// all our page routes will be defined here within the react router dom 
import { Routes, Route } from "react-router-dom"
import { Signup } from "./pages /NavBarAuthLinks/Signup"
import { Login } from "./pages /NavBarAuthLinks/Login"
import { Home } from "./pages /Home"
import { Dashboard } from "./pages /Dashboard"
import { ProtectedRoute } from "./pages /ProtectedRoute"


export const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* home page which would be common */}
        <Route path="/" element={<Home />}></Route>
        {/* auth pages */}
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* protected route to determine if cookies are sent and are valid by making backend call*/}
        <Route path="/protectedRoute" element={<ProtectedRoute />}></Route>
        {/* dashboard route is being protected here */}
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  )
}
