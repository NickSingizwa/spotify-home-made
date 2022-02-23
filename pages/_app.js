import '../styles/globals.css'
// import "tailwindcss/tailwind.css"
import { SessionProvider } from "next-auth/react"
// import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps : {session, ...pageProps}}) {
  return (
    //persisting the logged in state
    <SessionProvider session={session}>
      <RecoilRoot>
      <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp;
