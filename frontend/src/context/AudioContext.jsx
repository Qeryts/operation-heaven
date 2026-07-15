import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  // Próba autoplay po załadowaniu strony
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      
      // Próba natychmiastowego odtworzenia
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay zablokowany przez przeglądarkę - czekamy na pierwszą interakcję użytkownika
            const handleFirstInteraction = () => {
              if (audioRef.current && !isPlaying) {
                audioRef.current.play()
                  .then(() => {
                    setIsPlaying(true);
                    // Usuwamy nasłuchiwacze, gdy już raz ruszyło
                    window.removeEventListener("click", handleFirstInteraction);
                    window.removeEventListener("touchstart", handleFirstInteraction);
                  })
                  .catch(err => console.log("Play failed on interaction:", err));
              }
            };

            window.addEventListener("click", handleFirstInteraction);
            window.addEventListener("touchstart", handleFirstInteraction);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Play blocked:", err));
      }
      setIsPlaying(!isPlaying);
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
      {/* Globalny element audio, który nigdy nie unmontuje się przy zmianie podstron */}
      <audio ref={audioRef} src="/ambient.mp3" loop />
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);