import React, { useState } from "react";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import Link from "next/link";
import Logo from "../components/Logo";
import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { validateConfig } from "next/dist/server/config-shared";

const provider = new GoogleAuthProvider();

const Register = () => {
     const [username,setUsername] = useState(null);
     const [email,setEmail] = useState(null);
     const [password,setPassword] = useState(null);

     const handleSignup = async () => {
          if(!email || !username || !password){
               return
          }
          try{
               const user = await createUserWithEmailAndPassword(auth,email,password);
               await updateProfile(auth.currentUser,{
                    displayName: username,
               })
               console.log(user);
          }catch(err){
               console.log("An error occured", err)
          }
     }

     const signInWithGoogle = async () => {
          const user = await signInWithPopup(auth,provider);
          console.log(user)
     }
     return (
          <div className="h-[100vh] flex justify-center items-center bg-c1">
               <div className="flex items-center flex-col">
                    <Logo />
                    <div className="text-center">
                         <div className="text-4xl font-bold mt-3">Sign Up ChatSphere</div>
                         <div className="mt-3 text-c3">Connect and Chat with ChatSphere</div>
                    </div>

                    <div className="flex items-center gap-2 w-full mt-10 mb-5">
                         <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
                              <div onClick={signInWithGoogle} className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
                                   <IoLogoGoogle size={24} />
                                   <span>Signup with Google</span>
                              </div>
                         </div>
                         <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
                              <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
                                   <IoLogoFacebook size={24} />
                                   <span>Signup with Facebook</span>
                              </div>
                         </div>
                    </div>

                    <div className="flex items-center gap-1">
                         <span className="w-5 h-[1px] bg-c3"></span>
                         <span className="tex-c3 font-semibold">OR</span>
                         <span className="w-5 h-[1px] bg-c3"></span>
                    </div>

                    <form onSubmit={(e)=> e.preventDefault()} className="flex flex-col items-center gap-3 w-[500px] mt-5">
                         <input
                              type="text"
                              placeholder="Name"
                              className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                              autoComplete="off"
                              required
                              onChange={(e)=>setUsername(e.target.value)}
                         />
                         <input
                              type="email"
                              placeholder="Email"
                              className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                              autoComplete="off"
                              required
                              onChange={(e)=>setEmail(e.target.value)}
                         />
                         <input
                              type="password"
                              placeholder="Password"
                              className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                              autoComplete="off"
                              required
                              onChange={(e)=>setPassword(e.target.value)}
                         />
                         <button onClick={handleSignup} className="mt-4 w-full h-14 rounded-xl outline-none text-base  font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                              Register with ChatSphere
                         </button>
                    </form>

                    <div className="flex justify-center gap-1 text-c3 mt-5">
                         <span>Already have an account?</span>
                         <Link
                              href="/Login"
                              className="font-semibold text-white underline underline-offset-2 cursor-pointer"
                         >
                              Login
                         </Link>
                    </div>
               </div>
          </div>
     );
};

export default Register;
