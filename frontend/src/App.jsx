//This is the main file of the frontend. It is the first file that is executed when the frontend is started. It is responsible for rendering the main components of the frontend.
import react from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from './components/ProtectedRoute'



function Logout(){  //This function is used to log out the user. It clears the local storage and redirects the user to the login page.
  localStorage.clear()
  return <Navigate to="/login"/>
}

function RegisterAndLogout(){ //This function is used to log out the user. It clears the local storage and redirects the user to the login page.
  localStorage.clear()
  return <Register />
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/register" element={<RegisterAndLogout/>}/>
        <Route path = "*" element={<NotFound/>}/>
        <Route path = "/logout" element={<Logout/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
