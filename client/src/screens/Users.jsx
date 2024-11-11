import axios from 'axios';
axios.defaults.withCredentials=true;
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';


function Users() {
    const {user, setUser} = useContext(AuthContext)

    const sendRequest = async() => {
        const response = await fetch("http://localhost:5000/api/users", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Sends cookies with the request
        });
        
        const data = await response.json();
        console.log("User data:", data); // Check if this displays the user object
        setUser(data.message)
        
    }
    useEffect(()=>{
        sendRequest();
    },[])
    
    // const sendReq = async () => {
    //     try {
    //         const res = await axios.get('http://localhost:5000/api/users', {
    //             withCredentials: true
    //         });
    //         const data = res.data;
    //         console.log("API Response:", data);
    //         setUser(data.message); // Adjust this if the response structure is different
    //     } catch (err) {
    //         console.error("Error fetching user data:", err);
    //         setError("Failed to fetch user data");
    //     }
    // };

    // useEffect(() => {
    //     sendReq();
    // }, []);

    return (
        <div className='flex justify-center items-center h-[80vh]'>
            {user&& user.name}
        </div>
    );
}

export default Users;
