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
import Cookies from "js-cookie";

type Strength = 0 | 1 | 2 | 3;

export default function Reset() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false); // Changed from React.useState to useState
  const [loading, setLoading] = useState(false); // Changed from React.useState to useState
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);

  const onReset = async () => {
    try {
      setButtonPressed(true);
      setLoading(true);
      const response = await axios.post("/api/users/reset", { token, newPass });
      console.log("Password Reset Successful");
      toast.success("Password Reset Successful");
      setSuccessMessage("Password Reset Successful");
    } catch (error: any) {
      console.error("Password Reset Failed", error);
      setError(true);
      setErrorMessage(
        error.response?.data?.error ||
          "An error occurred while resetting the password"
      );
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token"); // Changed from split("=")[1] to get("token")
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      Cookies.set("token", token, { expires: 1 });
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
  const [newPass, setNewPass] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const passwordErrors = checkPasswordStrength(newPass.password);
    if (
      passwordErrors.length === 0 &&
      newPass.password === newPass.confirmPassword
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    setErrorMessage(passwordErrors.join(" "));
  }, [newPass]);

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
            value={newPass.password}
            // variant="border:ed"
            // radius="md"
            onValueChange={(value) => setInputedPassword(value)}
            onChange={(e) =>
              setNewPass({ ...newPass, password: e.target.value })
            }
            placeholder="Password"
            style={{ borderRadius: "0.5rem", padding: "0.5rem" }}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => {
              setIsPasswordFocused(false);
              setError(false);
            }}
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
          className={
            "p-2 flex-none w-80 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          }
          id="confirmPassword"
          type="password"
          value={newPass.confirmPassword}
          placeholder="Confirm your Password"
          onChange={(e) =>
            setNewPass({ ...newPass, confirmPassword: e.target.value })
          }
          onFocus={() => setIsConfirmPasswordFocused(true)}
          onBlur={() => {
            setIsConfirmPasswordFocused(false);
            setError(false);
          }}
        />
      </div>
      {!isConfirmPasswordFocused && isPasswordFocused && (
        <div className="w-full h-full max-w-[335px] items-center ">
          <div className="relative bottom-2 ">
            <button
              className="absolute bottom-2 right-0 flex items-center pr-4"
              style={{ marginBottom: "calc(28%)" }}
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
                Combine uppercase / lowercase / numbers and special characters
                to create a stronger password.
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      {successMessage && (
        <p className="text-green-500">Password updated Successfully</p>
      )}
      <button
        disabled={buttonDisabled || loading}
        onClick={onReset}
        className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
          buttonPressed ? "pressed" : ""
        }`}
      >
        {loading ? "Sending email..." : "Reset"}
      </button>
      <Link href="/login">Go Back To Login</Link>{" "}
      {/* Removed className, as Link doesn't accept it */}
    </div>
  );
}
