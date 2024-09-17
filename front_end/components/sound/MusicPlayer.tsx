import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';

interface MusicPlayerProps {
  src: string;
  defaultVolume?: number; // Optional prop for initial volume
  autoplay?: boolean;     // Optional prop for autoplay
  playOnce?: boolean;     // Optional prop for one-time playback
}

export interface MusicPlayerHandle {
  playAudio: () => void;
  stopAudio: () => void;
  setVolume: (volume: number) => void;
  isPlaying: boolean;
  replayAudio: () => void;  // Method to replay the audio
}

const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(({ src, defaultVolume = 0.5, autoplay = false, playOnce = false }, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const hasPlayed = useRef<boolean>(false); // Track if the audio has already played

  // Set default volume and autoplay on component mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, defaultVolume)); // Ensure volume is between 0 and 1
      
      if (autoplay && !playOnce) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.error('Autoplay error:', err));
      }
    }
  }, [defaultVolume, autoplay, playOnce]);

  useEffect(() => {
    if (playOnce && hasPlayed.current) {
      return; // Do not reset if it has already been played once
    }

    const handleCanPlay = () => {
      if (playOnce && !hasPlayed.current) {
        audioRef.current?.play().then(() => {
          setIsPlaying(true);
          hasPlayed.current = true;
        }).catch(err => console.error('Play error:', err));
      }
    };

    const audioElement = audioRef.current;
    audioElement?.addEventListener('canplay', handleCanPlay);

    return () => {
      audioElement?.removeEventListener('canplay', handleCanPlay);
    };
  }, [playOnce]);

  const playAudio = () => {
    if (audioRef.current) {
      if (playOnce && hasPlayed.current) {
        return; // Do not play if it has already been played once
      }
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.error('Play error:', err));
      hasPlayed.current = true;
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume)); // Volume between 0 and 1
    }
  };

  const replayAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.error('Replay error:', err));
    }
  };

  useImperativeHandle(ref, () => ({
    playAudio,
    stopAudio,
    setVolume,
    isPlaying,
    replayAudio
  }));

  return (
    <audio ref={audioRef} src={src} loop={!playOnce} >
     Seu browser não suporta o elemnto de <code>audio</code> .
    </audio>
  );
});

MusicPlayer.displayName = 'MusicPlayer';
export default MusicPlayer;
