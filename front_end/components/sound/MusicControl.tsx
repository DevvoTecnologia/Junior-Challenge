import React, { useState, useEffect, useRef } from "react";
import { MusicPlayerHandle } from "@/components/sound/MusicPlayer"; // Import your MusicPlayer type
import { SpeakerQuietIcon,SpeakerOffIcon,SpeakerLoudIcon,SpeakerModerateIcon,PlusIcon,MinusIcon } from "@radix-ui/react-icons";

interface VolumeControlProps {
  players: React.RefObject<MusicPlayerHandle>[]; // Array of refs to control multiple players
}

const VolumeControl: React.FC<VolumeControlProps> = ({ players }) => {
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);

  // Update all players' volumes when volume changes
  useEffect(() => {
    players.forEach((playerRef) => {
      if (playerRef.current) {
        playerRef.current.setVolume(volume);
      }
    });
  }, [volume, players]);

  // Mute/unmute all players
  const toggleMute = () => {
    setMuted(!muted);
    const newVolume = muted ? volume : 0; // If muted, set volume to 0
    players.forEach((playerRef) => {
      if (playerRef.current) {
        playerRef.current.setVolume(newVolume);
      }
    });
  };

  return (
    <div className="m-4 flex justify-center items-center top-4 right-4 z-50 bg-gray-800 p-4 rounded shadow-lg">
      <button onClick={toggleMute} className="text-white m-4">
        {muted ? <SpeakerOffIcon/>: volume>=0 && volume <=.5?<SpeakerQuietIcon/>: volume>.5 && volume <.9?<SpeakerModerateIcon/>:<SpeakerLoudIcon/>}
      </button>
      {!muted && <>
       <MinusIcon onClick={()=>setVolume(parseFloat(volume+"")-.1)}/>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={muted ? 0 : volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        disabled={muted}
        className="w-full"
      /><PlusIcon  
      onClick={()=>setVolume(parseFloat(volume+"")+.1)} />
      </>}
     
    </div>
  );
};

export default VolumeControl;
