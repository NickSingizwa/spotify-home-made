import { useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import spotifyApi from '../lib/spotify';

const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-yellow-500',
    'from-orange-500',
    'from-red-500',
    'from-purple-500',
    'from-pink-500',
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
        <div className="flex-grow">
            <header className='absolute top-5 right-8 text-white'>
                <div className='flex items-center bg-black space-x-3 opacity-90
                hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                    {/* <img className='rounded-full w-10 h-10' src={session?.user.image} alt="" /> */}
                    <img className='rounded-full w-10 h-10' src="https://i.pinimg.com/280x280_RS/6f/b4/22/6fb4221ff483037d583579af73c9c9ca.jpg" alt="" />
                    {/* <h2>{session?.user.name}</h2> */}
                    <h2>Nick Singizwa</h2>
                    <ChevronDownIcon className='h-5 w-5'/>
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                <img src="https://www.howtogeek.com/wp-content/uploads/2021/05/spotify-iphone-playlist.png" className='h-44 w-44 shadow-2xl' alt="" />
                {/* <img src={playlist?.images?.[0]?.url} className='h-44 w-44 shadow-2xl' alt="" /> */}
                {/* <h1>hello</h1> */}
                <div>
                    <p>PLAYLIST</p>
                    {/* <h1>{playlist?.name}</h1>  */}
                    <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>Playlist 21</h1> 
                </div>
            </section>
        </div>
    )
}
export default Center;