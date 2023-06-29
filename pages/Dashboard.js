import React, { useEffect } from 'react'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/router';

const Dashboard = () => {
    const router = useRouter();
    const {signOut, currentUser, isLoading} = useAuth();

    useEffect(()=>{
        if(!isLoading && !currentUser){
            router.push("/Login")
        }
    })
  return (
    <div className="h-[100vh] flex bg-c1">
        <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default Dashboard
