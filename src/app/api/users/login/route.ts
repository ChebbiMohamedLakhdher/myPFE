import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()


export default function handler(req: { method: string; body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message?: string; }): void; new(): any; }; end: { (): void; new(): any; }; }; }) {
    if (req.method === 'POST') {
      const { email, password } = req.body;
  
      // Validate username and password here
      // Example: Check against a database
      if (validCredentials(email, password)) {
        // If credentials are valid, return success
        res.status(200).json({ success: true });
      } else {
        // If credentials are invalid, return failure
        res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    } else {
      // Return 405 Method Not Allowed if the request method is not POST
      res.status(405).end();
    }
  }

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email})
        if(!user){
           return NextResponse.json({error:"User does not exist"},{status:400})
        }

        
        const validPassword = await bcryptjs.compare
        (password, user.password)
        if (!validPassword){
            return NextResponse.json({error:"Invalid Password"}, {status:400})
        }
        
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email
        }
        
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 

        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}






        

function validCredentials(email: any, password: any) {
    throw new Error("Function not implemented.");
}
     