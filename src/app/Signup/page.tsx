"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import { passwordStrength } from "check-password-strength";
import { Input } from "@nextui-org/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/20/solid";
import PassStrengthBar from "../PassStrengthBar";

type Strength = 0 | 1 | 2 | 3;

const SignupPage = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/verifyemail");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      setError(true);
      setErrorMessage(error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
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

  useEffect(() => {
    const passwordErrors = checkPasswordStrength(user.password);
    if (
      user.name.length > 0 &&
      emailRegex.test(user.email) &&
      passwordErrors.length === 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    setErrorMessage(passwordErrors.join(" "));
  }, [user]);

  //password
  const [passVisibility, setPassVisibility] = useState(false);
  const [strengthBar, setStrengthBar] = useState<Strength>(0);
  const [inputedPassword, setInputedPassword] = useState("");
  const passSecurityLevel = passwordStrength(inputedPassword).value;

  useEffect(() => {
    setStrengthBar(passwordStrength(inputedPassword).id as Strength);
  }, [passSecurityLevel, inputedPassword]);

  return (
    <div className="static bg-blue-900 flex flex-col items-center justify-center min-h-screen py-2">
      <div className="relative text-5xl" style={{ top: "-100px" }}>
        <h1>Signup</h1>
      </div>
      <hr />
      <label htmlFor="name" style={{ display: "inline-block", width: "310px" }}>
        Name
      </label>
      <input
        className="p-2 flex-none w-80 border border-gray-300 rounded-lg mb-4= focus:outline-none focus:border-gray-600 text-black"
        id="name"
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        placeholder="Name"
      />
      <label
        htmlFor="email"
        style={{ display: "inline-block", width: "310px" }}
      >
        Email
      </label>
      <div className="relative">
        <input
          className={`p-2 border flex-none w-80 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black ${
            error ? "border-red-700 border-4" : ""
          }`}
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          onBlur={() => setError(false)}
        />
        {error && errorMessage == "Email already used" && (
          <>
            <div className="absolute top-3 right-0 flex items-center pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-700 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11 14a1 1 0 11-2 0 1 1 0 012 0zM10 2a8 8 0 100 16A8 8 0 0010 2zM9 12a1 1 0 112 0v-5a1 1 0 11-2 0v5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="relative bg-red-700 text-white rounded-lg p-2 text-sm bottom-3 left-0 ">
              {errorMessage}
            </div>
          </>
        )}
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
        <div className="relative bottom-2">
          <Input
            className="w-full text-slate-800 px-2"
            id="password"
            type={passVisibility ? "text" : "password"}
            value={user.password}
            // variant="border:ed"
            // radius="md"
            onValueChange={(value) => setInputedPassword(value)}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            style={{ borderRadius: "0.5rem", padding: "0.5rem" }}
          />
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

        {/* <Input
                className="w-full text-slate-800 p-2 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type={passVisibility ? 'text' : 'password'}
                onValueChange={(value) => setInputedPassword(value)}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                endContent={
                   <div className="h-full flex justify-center items-center">
                    <button onClick={ () => setPassVisibility((prev) => !prev )}>
                      {passVisibility ? (
                        <EyeIcon className="w-4 text-slate-500" />
                      ):(
                        <EyeSlashIcon className="w-4 text-slate-500" />
                       )}

                    </button>
                   </div>

                }
            /> */}
        {inputedPassword ? (
          <div className="w-[310px] ml-3 mb-3">
            <PassStrengthBar strength={strengthBar} />
            <p className="text-slate-200 text-xs py-2">
              We believe that your password is {passSecurityLevel}
            </p>
            <p className="text-[.75em] text-slate-500 italic pt-2">
              Combine uppercase / lowercase / numbers and special characters to
              create a stronger password. The colour bar will let you know how
              secure your password is.
            </p>
          </div>
        ) : (
          ""
        )}
      </div>

      <button
        onClick={handleSignup}
        className={`p-2 mt-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
          buttonDisabled ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={buttonDisabled}
      >
        {loading ? "Signing up..." : "Signup"}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
};

export default SignupPage;
