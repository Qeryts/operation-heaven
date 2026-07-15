import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const AudioContext = createContext();

// Tworzymy JEDNĄ, globalną instancję audio poza komponentem Reacta.
// Gwarantuje to, że przeglądarka fizycznie nie stworzy drugiego odtwarzacza.
const globalAudio = new Audio("/ambient.mp3");
globalAudio.loop = true;

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const hasInitialized = useRef(false);

  // Synchronizacja głośności
  useEffect(() => {
    globalAudio.volume = volume;
  }, [volume]);

  // Funkcja bezpiecznego uruchamiania odtwarzania
  const playAudio = () => {
    globalAudio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(err => console.log("Play blocked/failed:", err));
  };

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // 1. Próba natychmiastowego odtworzenia przy starcie (Autoplay)
    globalAudio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // 2. Jeśli przeglądarka zablokowała autoplay, czekamy na pierwsze kliknięcie na stronie
        const handleFirstInteraction = () => {
          if (globalAudio.paused) {
            playAudio();
          } else {
            setIsPlaying(true);
          }
          // Natychmiast usuwamy nasłuchiwacze, aby nie odpalić funkcji drugi raz
          window.removeEventListener("click", handleFirstInteraction);
          window.removeEventListener("touchstart", handleFirstInteraction);
        };

        window.addEventListener("click", handleFirstInteraction);
        window.addEventListener("touchstart", handleFirstInteraction);
      });

    // Funkcja czyszcząca
    return () => {
      // Nie zatrzymujemy globalAudio przy unmount, bo chcemy, żeby grało przy zmianie stron!
    };
  }, []);

  const togglePlay = () => {
    if (globalAudio.paused) {
      playAudio();
    } else {
      globalAudio.pause();
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