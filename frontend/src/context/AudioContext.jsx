import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const AudioContext = createContext();

// BEZPIECZNY SINGLETON NA OBIEKCIE WINDOW:
// To gwarantuje, że bez względu na to, ile razy React przeładuje ten plik,
// w całej przeglądarce będzie istniał dokładnie JEDEN i ten sam obiekt audio.
if (!window.__globalAudioInstance) {
  window.__globalAudioInstance = new Audio("/ambient.mp3");
  window.__globalAudioInstance.loop = true;
}
const audio = window.__globalAudioInstance;

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(!audio.paused);
  const [volume, setVolume] = useState(audio.volume || 0.5);
  const hasInitialized = useRef(false);

  // 1. Reagowanie na fizyczny stan odtwarzacza (Zawsze zgodne UI)
  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Synchronizujemy stan na starcie
    setIsPlaying(!audio.paused);
    setVolume(audio.volume);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  // 2. Obsługa głośności
  useEffect(() => {
    audio.volume = volume;
  }, [volume]);

  // 3. Obsługa Autoplay oraz kliknięcia aktywującego
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const startAudio = () => {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Autoplay zablokowany, czekam na ruch użytkownika...", err));
    };

    // Próba natychmiastowego startu
    startAudio();

    // Rezerwowy nasłuchiwacz na dowolne kliknięcie (jeśli przeglądarka zablokowała autoplay)
    const handleFirstInteraction = () => {
      if (audio.paused) {
        startAudio();
      }
      // Usuwamy nasłuchiwacze natychmiast po pierwszej interakcji
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (audio.paused) {
      audio.play().catch(err => console.log("Błąd odtwarzania:", err));
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