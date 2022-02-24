import { signOut, useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import spotifyApi from '../lib/spotify';
import Songs from './Songs';

const colors = [
    'indigo-500',
    'blue-500',
    'green-500',
    'yellow-500',
    'orange-500',
    'red-500',
    'purple-500',
    'pink-500',
]

function Center(){
    const {data: session} = useSession();
    const[color,setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist,setPlaylist] = useRecoilState(playlistState);

    useEffect(() => {
        setColor(shuffle(colors).pop());
    },[playlistId])

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then(data => {
            setPlaylist(data.body);
        }).catch(err => {
            console.log(err,"something went wrong");
        })
    },[spotifyApi,playlistId])

    return(
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className={`absolute top-0 right-0 text-white h-[75px] w-full bg-gradient-to-b to-${color} from-${color} md:bg-none lg:bg-none xl:bg-none pl-auto pt-3 pr-7`}>
                <div onClick={()=>signOut()} className='flex items-center bg-black space-x-3 opacity-90
                        hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 h-10 w-25 absolute right-3'>
                    <img className='rounded-full w-9 h-9' src={session?.user.image} alt="" />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className='h-5 w-5'/>
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black from-${color} h-80 text-white p-8`}>
                <img src={playlist?.images?.[0]?.url} className='h-44 w-44 shadow-2xl' alt="" />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h1> 
                </div>
            </section>
            <div>
                <Songs/>
            </div>
        </div>
    )
}
export default Center;