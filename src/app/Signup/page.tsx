"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage(){
    return (
        <div className="flex ">
            <h1 className="text-center text-white text-2xl">Signup</h1>
        </div>
    )
}