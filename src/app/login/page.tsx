    "use client";
    import Link from "next/link";
    import React, {useEffect} from "react";
    import {useRouter} from "next/navigation";
    import axios from "axios";
    import { toast } from "react-hot-toast";





    export default function LoginPage() {
        const router = useRouter();
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
                console.log("Login failed", error.message);
                toast.error(error.message);
            } finally{
            setLoading(false);
            }   
        }

<<<<<<< HEAD
    return (
    <div className="static bg-blue-900 flex flex-col items-center justify-center min-h-screen py-2">
        
        <h1 className=" absolute top-20 text-5xl" >Login</h1>
        
        
        
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border  border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
            <Link href="/signup">Visit Signup page</Link>
        </div>
        
   )
=======
        useEffect(() => {
            if(user.email.length > 0 && user.password.length > 0) {
                setButtonDisabled(false);
            } else{
                setButtonDisabled(true);
            }
        }, [user]); 
>>>>>>> 2dd0dfa4eb51034288dcbc9c3f734ed3be145987

        return (
        <div className="static bg-blue-900 flex flex-col items-center justify-center min-h-screen py-2">
            
            <h1 className=" absolute top-20 text-5xl" >Login</h1>
            
            
            
            <label htmlFor="email">email</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
                />
            <label htmlFor="password">password</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
                />
      <a href="#" className="mx-1 text-sm font-medium text-primary-600 hover:underline dark:text-[#000000]">Forgot password?</a>
                <button
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
                <h1 >Don't have an account ?</h1>
                <Link href="/signup">Signup</Link>
                
            </div>
            
    )

    }   