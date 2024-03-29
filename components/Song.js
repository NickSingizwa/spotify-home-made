import { useRecoilState } from 'recoil';
import {millisToMinutesAndSeconds} from '../lib/time.js'
import {currentTrackIdState, isPlayingState} from '../atoms/songAtom.js';
import useSpotify from '../hooks/useSpotify.js';

function Song({order,track}){
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const playSong = () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [track.track.uri]
        })
    }

    return(
        <div className="grid grid-cols-2 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer" onDoubleClick={playSong}>
            <div className="flex items-center space-x-4">
                <p>{order+1}</p>
                <img className="h-10 w-10" src={track.track.album.images[0].url} alt="" />
                <div>
                    <p className='w-30 lg:w-64 truncate'>{track.track.name}</p>
                    <p className="opacity-70 w-40">{track.track.artists[0].name}</p>
                </div>
            </div>

            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="hidden md:inline opacity-70 w-40">{track.track.album.name}</p>
                <p className="opacity-70">{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}
export default Song;