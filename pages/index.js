import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import { getSession } from 'next-auth/react'

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex'>
        <Sidebar />
        <Center/>
      </main>
      <div>

      </div>

    </div>
  )
}

//for pre-rendering the session data on the server
export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session,
    }
  }
}