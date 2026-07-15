import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const AudioContext = createContext();

// Tworzymy JEDNĄ, globalną instancję audio poza komponentem Reacta.
const globalAudio = new Audio("/ambient.mp3");
globalAudio.loop = true;

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const hasInitialized = useRef(false);

  // 1. Automatyczna synchronizacja stanu UI ze stanem odtwarzacza audio
  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    globalAudio.addEventListener("play", handlePlay);
    globalAudio.addEventListener("pause", handlePause);

    // Na wszelki wypadek ustawiamy początkowy stan
    setIsPlaying(!globalAudio.paused);

    return () => {
      globalAudio.removeEventListener("play", handlePlay);
      globalAudio.removeEventListener("pause", handlePause);
    };
  }, []);

  // 2. Synchronizacja głośności
  useEffect(() => {
    globalAudio.volume = volume;
  }, [volume]);

  // Funkcja bezpiecznego uruchamiania odtwarzania
  const playAudio = () => {
    globalAudio.play()
      .catch(err => console.log("Play blocked/failed:", err));
  };

  // 3. Obsługa Autoplay oraz pierwszej interakcji
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Próba natychmiastowego odtworzenia przy starcie (Autoplay)
    globalAudio.play()
      .catch(() => {
        // Jeśli przeglądarka zablokowała autoplay, czekamy na pierwsze kliknięcie na stronie
        const handleFirstInteraction = () => {
          if (globalAudio.paused) {
            playAudio();
          }
          // Natychmiast usuwamy nasłuchiwacze, aby nie odpalić funkcji drugi raz
          window.removeEventListener("click", handleFirstInteraction);
          window.removeEventListener("touchstart", handleFirstInteraction);
        };

        window.addEventListener("click", handleFirstInteraction);
        window.addEventListener("touchstart", handleFirstInteraction);
      });
  }, []);

  const togglePlay = () => {
    if (globalAudio.paused) {
      playAudio();
    } else {
      globalAudio.pause();
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