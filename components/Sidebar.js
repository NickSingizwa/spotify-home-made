import { HomeIcon,SearchIcon,LibraryIcon,PlusCircleIcon,RssIcon, HeartIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useEffect,useState } from 'react';
import { useRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify'
import { playlistIdState } from '../atoms/playlistAtom';

function Sidebar() {
    const {data: session,status} = useSession();
    // console.log(session,"hey session");

    const spotifyApi = useSpotify();
    const [playlists,setPlaylists] = useState([]);

    //recoil state
    const [playlistId,setPlaylistId] = useRecoilState(playlistIdState);
    // console.log(playlistId,"playlistId");

    //retrieving playlists
    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then(data => {
                setPlaylists(data.body.items);
            })
        }
    }, [session,spotifyApi]);
    // console.log(playlists)

    return (
        <div className='text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide'>
            <div className="space-y-4">
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className='h-5 w-5'/>
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <SearchIcon className='h-5 w-5'/>
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon className='h-5 w-5'/>
                    <p>Your Library</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900'/>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusCircleIcon className='h-5 w-5'/>
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className='h-5 w-5'/>
                    <p>Liked songs</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className='h-5 w-5'/>
                    <p>Your episodes</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900'/>
                <p className='cursor-pointer hover:text-white'>21</p>
                <p className='cursor-pointer hover:text-white'>Old</p>
                {playlists.map((playlist) => (      
                    <p className='cursor-pointer hover:text-white' onClick={()=>setPlaylistId(playlist.id)} key={playlist.id}>{playlist.name}</p>
                ))}
            </div>
        </div>
    )
}

export default Sidebar