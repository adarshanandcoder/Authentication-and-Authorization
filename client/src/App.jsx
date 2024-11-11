import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./screens/Home"
import Login from "./screens/Login"
import Signup from "./screens/Signup"
import Users from "./screens/Users"
import Navbar from "./components/Navbar"
import AuthContext from "./context/AuthContext"
import { useState } from "react"

function App() {

  const [isAuth , setIsAuth] = useState(false);
  const [user , setUser] = useState('');

  return (
    <>
      <AuthContext.Provider value = {{isAuth, setIsAuth, user, setUser}}>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/users" element={<Users/>} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default App
