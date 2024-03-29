import {useSession} from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import {useRecoilState} from 'recoil'
import {currentTrackIdState,isPlayingState} from '../atoms/songAtom';
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo"
import { HeartIcon,VolumeUpIcon as VolumeDownIcon,MicrophoneIcon } from "@heroicons/react/outline";
import { RewindIcon,FastForwardIcon,PauseIcon,PlayIcon,ReplyIcon,VolumeUpIcon,SwitchHorizontalIcon } from "@heroicons/react/solid";
import {debounce} from "lodash";

//debounce for handling the volume change(for not making a request many times
//like every time a volume changes 1-50--> to make 1 req instead of 50 reqs)

function Player(){
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const spotifyApi = useSpotify();
    const {data:session,status} = useSession();
    const [volume,setVolume] = useState(70);

    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if(!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then(data => {
                    setIsPlaying(data.body?.is_playing);
                })
            })
        }
    }

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then(data => {
            if(data.body?.is_playing){
                spotifyApi.pause();
                setIsPlaying(false);
            }else{
                spotifyApi.play();
                setIsPlaying(true);
            }
        })
    }

    useEffect(()=>{
        if(spotifyApi.getAccessToken() && !currentTrackId){
            fetchCurrentSong();
            setVolume(70);
        }
    },[currentTrackIdState,spotifyApi,session])

    useEffect(()=>{
        if(volume>0 && volume<100){
            debouncedAdjustVolume(volume);
        }
    },[volume])

    //debouncing the usecallback for volume change
    const debouncedAdjustVolume = useCallback(
        debounce((volume)=>{
            spotifyApi.setVolume(volume).catch(err => console.log(err));
        },300),
        []
    )

    return(
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-sm px-2 md:px-8">
            {/* left */}
            <div className="flex items-center space-x-4">
                <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt="" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
                <HeartIcon className="button"/>
            </div>
            {/* center */}
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon className="button"/>
                {isPlaying ? <PauseIcon onClick={handlePlayPause} className="button w-10 h-10"/> : <PlayIcon onClick={handlePlayPause} className="button w-10 h-10"/>}
                <FastForwardIcon className="button"/>
                <ReplyIcon className="button"/>
            </div>
            {/* right */}
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <MicrophoneIcon className="button"/>
                <VolumeDownIcon onClick={() => volume>0 && setVolume(volume-10)} className="button"/>
                <input className="w-16 md:w-28" type="range" value={volume} onChange={(e)=>setVolume(Number(e.target.value))} min={0} max={100}/>
                <VolumeUpIcon className="button" onClick={() => volume<100 && setVolume(volume+10)}/>
            </div>
        </div>
    )
}
export default Player;