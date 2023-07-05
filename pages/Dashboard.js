import React, { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import LeftNav from "@/components/LeftNav";
import Chats from "@/components/Chats";
import Chat from "@/components/Chat";
import { useChatContext } from "@/context/chatContext";

const Dashboard = () => {
     const router = useRouter();
     const { signOut, currentUser, isLoading } = useAuth();
     const { data } = useChatContext();

     useEffect(() => {
          document.title = `ChatSphere | Dashboard`;
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
               <div className="flex w-full shrink-0">
                    <div>
                         <LeftNav />
                    </div>
                    <div className="flex bg-c2 grow">
                         <div className="w-[400px] p-5 overflow-auto scrollbar shrink-0 border-r border-white/[0.05]">
                              <div className="flex flex-col h-full">
                                   <Chats />
                              </div>
                         </div>
                         {data.user && <Chat />}
                    </div>
               </div>
          </div>
     );
};

export default Dashboard;
