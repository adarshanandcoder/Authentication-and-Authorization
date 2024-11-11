import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/signup", {
                name,
                email, 
                password,
            });
            const data = await res.data;
            console.log(data);
            navigate("/login");
            
        } catch (error) {
            console.error("Error in signup request:", error);
        }
    };
    

  return (
    <div className="flex flex-col gap-3 rounded-md shadow-md w-fit p-3 mx-auto my-[30vh]">
      <div>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="px-2 py-2 rounded-md border-2 w-[300px] border-blue-100 transition-all delay-100 easy-in-out focus:border-blue-400 outline-none"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email id"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
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
          onChange={(e)=>setPassword(e.target.value)}
          className="px-2 py-2 rounded-md border-2 w-[300px] border-blue-100 transition-all delay-100 easy-in-out focus:border-blue-400 outline-none"
        />
      </div>
      <button
        type="submit"
        onClick={handleSignup}
        className="px-3 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-300 hover:text-black"
      >
        Signup
      </button>
    </div>
  );
}

export default Signup;
