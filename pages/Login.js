import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import Logo from "../components/Logo";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import ToastMsg from "@/components/ToastMsg";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const provider = new GoogleAuthProvider();

const Login = () => {
     const router = useRouter();
     const { currentUser, isLoading } = useAuth();
     const [email, setEmail] = useState("");

     useEffect(() => {
          if (!isLoading && currentUser) {
               router.push("/Dashboard");
          }
     }, [currentUser, isLoading]);

     const handleSubmit = async (e) => {
          e.preventDefault();
          const email = e.target[0].value;
          const password = e.target[1].value;
          if (!email || !password) {
               return;
          }
          try {
               await signInWithEmailAndPassword(auth, email, password);
               console.log("Login successful:", email);
          } catch (err) {
               console.log(err);
          }
     };

     const signInWithGoogle = async () => {
          const user = await signInWithPopup(auth, provider);
          console.log(user);
     };

     const resetPassword = async () => {
          try {
               toast.promise(
                    async () => {
                         await sendPasswordResetEmail(auth, email);
                    },
                    {
                         pending: "Generating reset link",
                         success: "Reset link sent to your registered email 👌",
                         error: "You email id not found 🤯",
                    },
                    {
                         autoClose: 5000,
                    }
               );
          } catch (err) {
               console.log(err);
          }
     };

     return isLoading || (!isLoading && currentUser) ? (
          <Loader />
     ) : (
          <div className="h-[100vh] flex justify-center items-center bg-c1">
               <div className="flex items-center flex-col">
                    <ToastMsg />
                    <Logo />
                    <div className="text-center">
                         <div className="text-4xl font-bold mt-3">Login to ChatSphere</div>
                         <div className="mt-3 text-c3">Connect and Chat with ChatSphere</div>
                    </div>

                    <div className="flex items-center gap-2 w-full mt-10 mb-5">
                         <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
                              <div
                                   onClick={signInWithGoogle}
                                   className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md"
                              >
                                   <IoLogoGoogle size={24} />
                                   <span>Login with Google</span>
                              </div>
                         </div>
                         <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
                              <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
                                   <IoLogoFacebook size={24} />
                                   <span>Login with Facebook</span>
                              </div>
                         </div>
                    </div>

                    <div className="flex items-center gap-1">
                         <span className="w-5 h-[1px] bg-c3"></span>
                         <span className="tex-c3 font-semibold">OR</span>
                         <span className="w-5 h-[1px] bg-c3"></span>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-[500px] mt-5">
                         <input
                              type="email"
                              placeholder="Email"
                              className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                              autoComplete="off"
                              onChange={(e) => setEmail(e.target.value)}
                         />
                         <input
                              type="password"
                              placeholder="Password"
                              className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                              autoComplete="off"
                         />
                         <div className="text-right w-full text-c3">
                              <span onClick={resetPassword} className="cursor-pointer">
                                   Forget password?
                              </span>
                         </div>
                         <button className="mt-4 w-full h-14 rounded-xl outline-none text-base  font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                              Login to your account
                         </button>
                    </form>

                    <div className="flex justify-center gap-1 text-c3 mt-5">
                         <span>Not a member yet?</span>
                         <Link
                              href="/Register"
                              className="font-semibold text-white underline underline-offset-2 cursor-pointer"
                         >
                              Register Now
                         </Link>
                    </div>
               </div>
          </div>
     );
};

export default Login;
