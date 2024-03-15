"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Input } from "@nextui-org/react";
import { passwordStrength } from "check-password-strength";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/20/solid";
import PassStrengthBar from "../PassStrengthBar";

type Strength = 0 | 1 | 2 | 3;

export default function Reset() { 
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false); // Changed from React.useState to useState
  const [loading, setLoading] = useState(false); // Changed from React.useState to useState

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const onReset = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/reset", {token}); // Wrapped token in an object
      console.log("User Exist", response.data);
      toast.success("User Exist");
    } catch (error:any) { // Removed type annotation, it's unnecessary
      console.log("Email Not Sent", error.response.data.error);
      setError(true); // Set error to true, as it seems you're just checking if there's an error, not setting the error message
      setErrorMessage(error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token"); // Changed from split("=")[1] to get("token")
    setToken(urlToken || "");
  }, []);
  
  useEffect(() => {
    if(token.length > 0) {
      onReset(); // Changed from reset() to onReset()
    }
  }, [token]);



  const checkPasswordStrength = (password: any) => {
    const errors = [];
    if (password.length < 10) {
      errors.push("");
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("");
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("");
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push("");
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push("");
    }
    return errors;
  };

  


  const [passVisibility, setPassVisibility] = useState(false);
  const [strengthBar, setStrengthBar] = useState<Strength>(0);
  const [inputedPassword, setInputedPassword] = useState("");
  const passSecurityLevel = passwordStrength(inputedPassword).value;
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });


  useEffect(() => {
    const passwordErrors = checkPasswordStrength(user.password);
    if (
      passwordErrors.length === 0 && 
      user.password === user.confirmPassword
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    setErrorMessage(passwordErrors.join(" "));
  }, [user]);


  
  useEffect(() => {
    setStrengthBar(passwordStrength(inputedPassword).id as Strength);
  }, [passSecurityLevel, inputedPassword]);

  return (
    <div className="static bg-slate-900 flex flex-col items-center justify-center min-h-screen py-2">
      <div className="relative text-5xl" style={{ top: "-100px" }}>
        <h1>Reset Password</h1>
      </div>
      <div className="relative ">
        <label
          htmlFor="password"
          style={{ display: "inline-block", width: "310px" }}
        >
          {" "}
          Password{" "}
        </label>
      </div>

      <div className="w-full h-full max-w-[335px] items-center ">
        <div className="relative bottom-2 ">
          <Input
            className="w-full text-slate-800 px-2  "
            id="password"
            type={passVisibility ? "text" : "password"}
            value={user.password}
            // variant="border:ed"
            // radius="md"
            onValueChange={(value) => setInputedPassword(value)}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            style={{ borderRadius: "0.5rem", padding: "0.5rem" }}
            onBlur={() => {
              setIsPasswordFocused(false);
              setError(false);
            }}
            onFocus={() => setIsPasswordFocused(true)}
          />
          
        </div>

        
       
      </div>
      <label
        htmlFor="cpassword"
        style={{ display: "inline-block", width: "310px" }} // Changed the id to "cpassword" to match the input id
      >
        Confirm Password
      </label>
      <div className="relative">
        <input
          className={'p-2 flex-none w-80 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'}
          id="confirmPassword"
          type="password"
          value={user.confirmPassword}
          placeholder="Confirm your Password"
          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
         
          onBlur={() => {
          
            setError(false);
          }}

        />
      </div>
      {isPasswordFocused ? true : (
       <div className="w-full h-full max-w-[335px] items-center ">
       <div className="relative bottom-2 ">
         <button
           className="absolute inset-y-0 right-0 flex items-center pr-4"
           onClick={() => setPassVisibility((prev) => !prev)}
         >
           {passVisibility ? (
             <EyeIcon className="w-4 text-slate-500" />
           ) : (
             <EyeSlashIcon className="w-4 text-slate-500" />
           )}
         </button>
       </div>

       
       {inputedPassword ? (
         <div className="w-[310px] ml-3 mb-3">
           <PassStrengthBar strength={strengthBar} />
           <p className="text-slate-200 text-xs py-2">
             We believe that your password is {passSecurityLevel}
           </p>
           <p className="text-[.75em] text-slate-500 italic pt-2">
             Combine uppercase / lowercase / numbers and special characters to
             create a stronger password. 
           </p>
         </div>
       ) : (
         ""
       )}
     </div>
      )}
      <button
        disabled={buttonDisabled || loading}
        onClick={onReset}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {loading ? "Sending email..." : "Send Email"}
      </button>
      <Link href="/login">Go Back To Login</Link> {/* Removed className, as Link doesn't accept it */}
    </div>
  );
}
