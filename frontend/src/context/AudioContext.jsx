import React, { createContext, useContext, useState, useEffect } from "react";

const AudioContext = createContext();

// Pojedyncza, globalna instancja audio poza drzewem Reacta
if (!window.__globalAudioInstance) {
  window.__globalAudioInstance = new Audio("/ambient.mp3");
  window.__globalAudioInstance.loop = true;
}
const audio = window.__globalAudioInstance;

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(!audio.paused);
  const [volume, setVolume] = useState(audio.volume || 0.5);

  // Synchronizacja głośności
  useEffect(() => {
    audio.volume = volume;
  }, [volume]);

  // Ręczne włączenie / wyłączenie
  const togglePlay = () => {
    if (audio.paused) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Odtwarzanie zablokowane przez przeglądarkę:", err));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, volume, togglePlay, changeVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);