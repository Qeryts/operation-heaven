import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const AudioContext = createContext();

// Jeden, niezmienny obiekt audio w pamięci przeglądarki
if (!window.__globalAudioInstance) {
  window.__globalAudioInstance = new Audio("/ambient.mp3");
  window.__globalAudioInstance.loop = true;
}
const audio = window.__globalAudioInstance;

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(!audio.paused);
  const [volume, setVolume] = useState(audio.volume || 0.5);

  // Synchronizacja stanu UI ze stanem odtwarzacza
  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Aktualizacja stanu na starcie
    setIsPlaying(!audio.paused);
    setVolume(audio.volume);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  // Synchronizacja poziomu głośności
  useEffect(() => {
    audio.volume = volume;
  }, [volume]);

  // Przełącznik odtwarzania (odpala tylko i wyłącznie po kliknięciu przycisku)
  const togglePlay = () => {
    if (audio.paused) {
      audio.play().catch(err => console.log("Play blocked:", err));
    } else {
      audio.pause();
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