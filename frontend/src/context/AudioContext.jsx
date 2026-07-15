import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  const isPlayingRef = useRef(false); // Dodatkowa referencja chroniąca przed podwójnym startem

  // Próba autoplay po załadowaniu strony
  useEffect(() => {
    let active = true;

    const handleFirstInteraction = () => {
      // Jeśli już gra lub component został odmontowany, nic nie rób
      if (!active || isPlayingRef.current) return;

      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            if (active) {
              setIsPlaying(true);
              isPlayingRef.current = true;
            }
          })
          .catch(err => console.log("Play failed on interaction:", err));
      }

      // Po udanej interakcji natychmiast sprzątamy globalne nasłuchiwacze
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    if (audioRef.current) {
      audioRef.current.volume = volume;
      
      // Próba natychmiastowego odtworzenia (jeśli przeglądarka na to pozwoli)
      audioRef.current.play()
        .then(() => {
          if (active) {
            setIsPlaying(true);
            isPlayingRef.current = true;
          }
        })
        .catch(() => {
          // Jeśli autoplay jest zablokowany, czekamy na pierwsze kliknięcie użytkownika
          if (active && !isPlayingRef.current) {
            window.addEventListener("click", handleFirstInteraction);
            window.addEventListener("touchstart", handleFirstInteraction);
          }
        });
    }

    // FUNKCJA CZYSZCZĄCA (Zapobiega dublowaniu w React Strict Mode)
    return () => {
      active = false;
      cleanupListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        isPlayingRef.current = false;
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            isPlayingRef.current = true;
            setIsPlaying(true);
          })
          .catch(err => console.log("Play blocked:", err));
      }
    }
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, volume, togglePlay, changeVolume }}>
      {children}
      {/* Globalny element audio, który nigdy się nie dubluje */}
      <audio ref={audioRef} src="/ambient.mp3" loop />
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);