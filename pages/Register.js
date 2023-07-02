import React, { useEffect, useState } from "react";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import Link from "next/link";
import Logo from "../components/Logo";
import { auth, db, uid } from "@/firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { profileColors } from "@/utils/constants";
import Loader from "@/components/Loader";

const provider = new GoogleAuthProvider();

const Register = () => {
     const router = useRouter();
     const { currentUser, isLoading } = useAuth();
     const colorIndex = Math.floor(Math.random() * profileColors.length);

     useEffect(() => {
          if (!isLoading && currentUser) {
               router.push("/Dashboard");
          }
     }, [currentUser, isLoading]);

     const handleSubmit = async (e) => {
          e.preventDefault();
          const displayName = e.target[0].value;
          const email = e.target[1].value;
          const password = e.target[2].value;
          if (!email || !password || !displayName) {
               return;
          }
          try {
               const {user} = await createUserWithEmailAndPassword(auth, email, password);
               
               await setDoc(doc(db, "users", user.uid),{
                    uid: user.uid,
                    displayName,
                    email,
                    color: profileColors[colorIndex],
               })
               
               await setDoc(doc(db, "userChats", user.uid ),{})
               
               await updateProfile(user, {
                    displayName,
               })
               
               console.log("SignUp successful:", email);

               router.push("/Dashboard")

          } catch (err) {
               console.log(err);
          }
     };

     const signInWithGoogle = async () => {
          const {user} = await signInWithPopup(auth, provider);
          console.log(user);

          await setDoc(doc(db, "users", user.uid),{
               uid: user.uid,
               displayName: user.displayName,
               email: user.email,
               color: profileColors[colorIndex],
          })
          
          await setDoc(doc(db, "userChats", user.uid ),{})
          
          await updateProfile(user, {
               displayName: user.displayName,
          })
     };

     return isLoading || (!isLoading && currentUser) ? (
          <div className="h-[100vh] flex justify-center items-center bg-c1">
            <Loader />
          </div>
     ) : (
          <div className="h-[100vh] flex justify-center items-center bg-c1">
               <div className="flex items-center flex-col">
                    <Logo />
                    <div className="text-center">
                         <div className="text-4xl font-bold mt-3">Sign Up ChatSphere</div>
                         <div className="mt-3 text-c3">Connect and Chat with ChatSphere</div>
                    </div>

                    <div className="flex items-center gap-2 w-full mt-10 mb-5">
                         <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
                              <div
                                   onClick={signInWithGoogle}
                                   className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md"
                              >
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

                    <form
                         onSubmit={handleSubmit}
                         className="flex flex-col items-center gap-3 w-[500px] mt-5"
                    >
                         <input
                              type="text"
                              placeholder="Name"
                              className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                              autoComplete="off"
                              required
                         />
                         <input
                              type="email"
                              placeholder="Email"
                              className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                              autoComplete="off"
                              required
                         />
                         <input
                              type="password"
                              placeholder="Password"
                              className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                              autoComplete="off"
                              required
                         />
                         <button
                              className="mt-4 w-full h-14 rounded-xl outline-none text-base  font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                         >
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
