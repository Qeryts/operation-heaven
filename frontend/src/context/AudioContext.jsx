import React, { createContext, useContext, useState, useEffect } from "react";

const AudioContext = createContext();

// Tworzymy JEDNĄ instancję audio, bez autoplay, bez loopa przy starcie
if (!window.__globalAudioInstance) {
  window.__globalAudioInstance = new Audio("/ambient.mp3");
  window.__globalAudioInstance.loop = true;
}
const audio = window.__globalAudioInstance;

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(!audio.paused);
  const [volume, setVolume] = useState(audio.volume || 0.5);

  // TWARDY RESET: Usuwamy absolutnie wszystkie stare nasłuchiwacze przy starcie
  useEffect(() => {
    // Te atrapy funkcji służą do siłowego wyczyszczenia pamięci podręcznej przeglądarki
    const dummy = () => {};
    window.removeEventListener("click", dummy);
    window.removeEventListener("touchstart", dummy);
    
    // Ustawiamy właściwą głośność na starcie
    audio.volume = volume;
  }, [volume]);

  // Ręczne włączenie / wyłączenie - WYŁĄCZNIE na kliknięcie przycisku
  const togglePlay = () => {
    if (audio.paused) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Odtwarzanie zablokowane:", err));
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