import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {setIsAuth} = useContext(AuthContext)

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/api/login",{
        email,
        password,
    });
    const data = await res.data;
    console.log(data);
    setIsAuth(true);
    navigate('/users');
  };

  return (
    <div className="flex flex-col gap-3 rounded-md shadow-md w-fit p-3 mx-auto my-[30vh]">
      <div>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-2 py-2 rounded-md border-2 w-[300px] border-blue-100 transition-all delay-100 easy-in-out focus:border-blue-400 outline-none"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-2 py-2 rounded-md border-2 w-[300px] border-blue-100 transition-all delay-100 easy-in-out focus:border-blue-400 outline-none"
        />
      </div>
      <button
        type="submit"
        onClick={handleLogin}
        className="px-3 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-300 hover:text-black"
      >
        Login
      </button>
    </div>
  );
}

export default Login;
