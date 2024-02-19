"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";


    export default function LoginPage() {
        const router = useRouter();
        const [error,setError] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
        const [user, setUser] = React.useState({
            email: "",
            password: "",
            isEmployee:"",
        
        })
        const [buttonDisabled, setButtonDisabled] = React.useState(false);
        const [loading, setLoading] = React.useState(false);


            const onLogin = async () => {
                try {
                    setLoading(true);
                    const response = await axios.post("/api/users/login", user);
                    console.log("Login success", response.data);
                    toast.success("Login success");
                    router.push("/profile");
                } catch (error:any) {
                    console.log("Login failed", error.response.data.error);
                    setError(error.response.data.error);
                    setErrorMessage(error.response.data.error);
                    toast.error(error.response.data.error);
                } finally{
                setLoading(false);
            }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password));
    }, [user.email, user.password]);

    return (
        <div className="static bg-blue-900 flex flex-col items-center justify-center min-h-screen py-2">
            <div className="relative text-5xl" style={{ top: '-100px' }}>
            <h1>Login</h1> 
            </div>
            <label htmlFor="email" style={{ display: 'inline-block', width: '310px' }} >Email</label>
            <div className="relative">
                <input
                    className={`p-2 flex-none w-80 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black ${error && errorMessage == "User does not exist" ? 'border-red-700 border-4' : ''}`}
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter Your Email"
                    onBlur={() => setError(false)}
                />
                {error && errorMessage == "User does not exist" &&(
                    <><div className="absolute top-3 right-0 flex items-center pr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11 14a1 1 0 11-2 0 1 1 0 012 0zM10 2a8 8 0 100 16A8 8 0 0010 2zM9 12a1 1 0 112 0v-5a1 1 0 11-2 0v5z" clipRule="evenodd" />
                    </svg>
                </div><div className="relative bg-red-700 text-white rounded-lg p-2 text-sm bottom-3 left-0 ">{errorMessage}</div></>
            )}
            </div>
            <label htmlFor="password" style={{ display: 'inline-block', width: '310px' }}>Password</label>
            <div className="relative">
            <input 
            className={`p-2 flex-none w-80 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black ${error && errorMessage == "Invalid Password" ?  'border-red-700 border-4' : ''}`}
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password"
                
                />
                {error && errorMessage == "Invalid Password" &&(
                   <><div className="absolute top-3 right-0 flex items-center pr-3">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                       <path fillRule="evenodd" d="M11 14a1 1 0 11-2 0 1 1 0 012 0zM10 2a8 8 0 100 16A8 8 0 0010 2zM9 12a1 1 0 112 0v-5a1 1 0 11-2 0v5z" clipRule="evenodd" />
                   </svg>
               </div><div className="relative bg-red-700 text-white rounded-lg p-2 text-sm bottom-3 left-0 ">{errorMessage}</div></>
           )}
            </div>
            <button
                disabled={buttonDisabled || loading}
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                {loading ? "Logging in..." : "Login"}
            </button>
            <h1>Don't have an account ?</h1>
            <Link href="/signup">Signup</Link>
            <div className="relative items-center ">
            {error && errorMessage == "Invalid Token" &&(
                    <div className="relative top-8 bottom-4 left-2 items-center pr-3 text-white bg-red-700 pb-3 pt-3  pl-3 rounded-lg ">
                        <h1 className="whitespace-nowrap">Please Check Your Email To Verify Your Account    </h1>
                    </div>
                )}
            </div>
        </div>
    );
}
