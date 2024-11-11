import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext"
import axios from "axios";
axios.defaults.withCredentials = true;

function Navbar() {

  const {isAuth , setIsAuth , setUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = async()=>{
    const response = await fetch("http://localhost:5000/api/logout", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      credentials: 'include', // Sends cookies with the request
  });
    if(response.status == 200){
      navigate('/')
      return response;
    }
    return new Error("Unable to logout user")
  }

  const handleLogout = async() => {
    
    logoutUser().then(()=>{
      setIsAuth(false);
      setUser({})
    }).catch((err)=>console.log(err))
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between px-3 py-4 mb-2 bg-blue-500">
      <h2 className="text-center font-bold text-xl text-white">Authenticate</h2>
      <div className="flex gap-5 justify-center">
        <Link
          to="/"
          className="text-lg font-semibold text-white list-none cursor-pointer"
        >
          Home
        </Link>
        <Link
          to="/login"
          className={`text-lg font-semibold text-white list-none cursor-pointer ${isAuth && "hidden" }`}
        >
          Login
        </Link>
        <Link
          to="#"
          className={`text-lg font-semibold text-white list-none cursor-pointer ${!isAuth && "hidden" }`}
          onClick={handleLogout}
        >
          Logout
        </Link>
        <Link
          to="/signup"
          className={`text-lg font-semibold text-white list-none cursor-pointer ${isAuth && "hidden" }`}
        >
          Signup
        </Link>
        
      </div>
    </div>
  );
}

export default Navbar;
