"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        name: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error:any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Check if all fields are filled and email is valid
        if (user.name.length > 0 && user.password.length > 0 && emailRegex.test(user.email)) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="static bg-blue-900 flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="absolute top-20 text-5xl">Signup</h1>
            <hr />
            <label htmlFor="name">Name</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="name"
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Name"
            />
            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <button
                onClick={onSignup}
                className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={buttonDisabled}
            >
                {loading ? "Signing up..." : "Signup"}
            </button>
            <Link href="/login">Visit login page</Link>
        </div>
    );
}
