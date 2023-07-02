import React, { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import LeftNav from "@/components/LeftNav";


const Dashboard = () => {
     const router = useRouter();
     const { signOut, currentUser, isLoading } = useAuth();

     useEffect(() => {
          if (!isLoading && !currentUser) {
               router.push("/Login");
          }
     });
     return !currentUser ? (
          <div className="h-[100vh] flex justify-center items-center bg-c1">
               <Loader />
          </div>
     ) : (
       <div className="bg-c1 flex h-[100vh]">
            {/* <div className="h-[100vh] flex bg-c1">
                 <button onClick={signOut}>Sign Out</button>
            </div> */}
               <div className="flex w-full shrink-0">
                    <div>
                      <LeftNav/>
                    </div>
                    <div className="flex bg-c2 grow">
                         <div>Sidebar</div>
                         <div>Chat</div>
                    </div>
               </div>
          </div>
     );
};

export default Dashboard;
