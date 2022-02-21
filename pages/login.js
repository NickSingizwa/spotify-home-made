import { getProviders, signIn } from 'next-auth/react';
function Login({providers}) {
    return (
        <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
            <img className='w-52 mb-5' src="https://links.papareact.com/9xl" alt="" />
            {/* mapping providers */}
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button onClick={()=>signIn(provider.id,{callbackUrl: "/"})} className='bg-[#1BDB60] rounded-full text-white p-5'>Log in with {provider.name}</button>
                </div>
            ))} 
        </div>
    )
}

export default Login;

//server-side rendering before loading the page to access the spotify providers 
export async function getServerSideProps(){
    const providers = await getProviders();
    return {
        props: {
            providers
        }
    }
}