"use client";
    import Link from "next/link";
    import React, {useEffect, useState} from "react";
    import {useRouter} from "next/navigation";
    import axios from "axios";
    import { toast } from "react-hot-toast";





    export default function LoginPage() {
        const router = useRouter();
        const [error,setError] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
        const [user, setUser] = React.useState({
            email: "",
            password: "",
        
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
        }

        useEffect(() => {
            if(user.email.length > 0 && user.password.length > 0) {
                setButtonDisabled(false);
            } else{
                setButtonDisabled(true);
            }
        }, [user]); 

        return (
        <div className="static bg-blue-900 flex flex-col items-center justify-center min-h-screen py-2">
            
            <h1 className=" absolute top-20 text-5xl" >Login</h1>
            

            
            <label htmlFor="email">Email</label>
            <div className="relative">
            <input 
            className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black ${error ? 'border-red-700 border-4' : ''}`}
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Enter Your Email"
                onBlur={() => setError(false)}
                />
                {error && (
                    <div className="absolute top-0 bottom-4 right-0 flex items-center pr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11 14a1 1 0 11-2 0 1 1 0 012 0zM10 2a8 8 0 100 16A8 8 0 0010 2zM9 12a1 1 0 112 0v-5a1 1 0 11-2 0v5z" clipRule="evenodd" />
                        </svg>
                        <div className="absolute bg-red-700 text-white rounded-lg p-2 text-sm top-0 left-full ml-2">{errorMessage}</div>
                    </div>
                )}
             </div>   
            <label htmlFor="password">Password</label>
            <div>
            <input 
            className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black ${error ? 'border-red-700 border-4' : ''}`}
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password"
                onBlur={() => setError(false)}
                />
                {error && (
                    <div className="absolute top-0 bottom-4 right-0 flex items-center pr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11 14a1 1 0 11-2 0 1 1 0 012 0zM10 2a8 8 0 100 16A8 8 0 0010 2zM9 12a1 1 0 112 0v-5a1 1 0 11-2 0v5z" clipRule="evenodd" />
                        </svg>
                        <div className="absolute bg-red-700 text-white rounded-lg p-2 text-sm top-0 left-full ml-2">{errorMessage}</div>
                    </div>
                )}
               </div>
                <button
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
                <h1 >Don't have an account ?</h1>
                <Link href="/signup">Signup</Link>
                
            </div>
            
    )

    }   