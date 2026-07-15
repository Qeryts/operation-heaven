import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  // Synchronizacja głośności
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Prosty przełącznik PLAY / PAUSE wywoływany wyłącznie przyciskiem
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Play blocked:", err));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, volume, togglePlay, changeVolume }}>
      {children}
      {/* Jeden, fizyczny tag audio, bezpiecznie zagnieżdżony w aplikacji */}
      <audio ref={audioRef} src="/ambient.mp3" loop />
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);