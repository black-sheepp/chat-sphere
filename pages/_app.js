import React from 'react'

import { UserProvider } from '@/context/authContext'
import '@/styles/globals.css'


export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
