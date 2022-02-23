import { useEffect, useState } from 'react';
import {useRecoilState} from 'recoil'
import {currentTrackIdState} from '../atoms/songAtom';
import useSpotify from "../hooks/useSpotify";

function useSongInfo(){
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const spotifyApi = useSpotify();
    const [songInfo,setSongInfo] = useState(null);

    useEffect(()=>{
        const fetchSongInfo = async () => {
            if(currentTrackId){
                const trackInfo = await spotifyApi.getTrack(currentTrackId);
                setSongInfo(trackInfo.data);
            }
        }
        fetchSongInfo();

    },[currentTrackId,spotifyApi])

    return songInfo
}
export default useSongInfo;