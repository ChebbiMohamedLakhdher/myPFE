"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; 
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";


export default function Reset() {
  const [data, setData] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const ConfirmPasswords = () => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) return alert("Your passwords are incorrect");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    ConfirmPasswords(); 

    try {
      const { data: resetData } = await client.auth.updateUser({
        password: data.password,
      });
    
    } catch (error) {
      
    }
  };
}