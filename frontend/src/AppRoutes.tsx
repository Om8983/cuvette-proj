// all our page routes will be defined here within the react router dom 
import { Routes, Route } from "react-router-dom"
import { Signup } from "./pages /NavBarAuthLinks/Signup"
import { Login } from "./pages /NavBarAuthLinks/Login"
import { Home } from "./pages /Home"
import { Dashboard } from "./pages /Dashboard"
import { ProtectedRoute } from "./pages /ProtectedRoute"
import { Landing } from "./pages /Landing"

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<Landing />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* protected route */}
        <Route path="/protectedRoute" element={<ProtectedRoute />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  )
}
