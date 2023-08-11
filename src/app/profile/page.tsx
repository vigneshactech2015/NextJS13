"use client";
import axios from "axios";
import {useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage(){
    const router = useRouter()
    const [data,setData] = useState("nothing")

   async function logout(){
        try{
           await axios.get("/api/users/logout")
            router.push("/login")
        }catch(error:any){
            console.log(error.message)
        }
    }

    const getUserDetails = async()=>{
       const res = await axios.get("/api/users/me")
       console.log(res.data);
       setData(res.data.data._id)
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1> 
            <h2 className="p-1 rounded bg-red-500">{data === "nothing" ?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr/>
            <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
            <button className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={getUserDetails}>Get User Details</button>
        </div>
    )
}