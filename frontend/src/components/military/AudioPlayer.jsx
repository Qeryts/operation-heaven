import React from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

const AudioPlayer = () => {
  const audio = useAudio();
  if (!audio) return null;
  const { playing, muted, volume, toggle, setVolume, toggleMute, trackLabel } = audio;

  return (
    <div
      className="flex items-center gap-3 bg-[#0d0d0d]/95 border border-[#1f1f1f] backdrop-blur px-3 py-2 rounded"
      data-testid="audio-player"
    >
      <button
        onClick={toggle}
        data-testid="audio-toggle"
        aria-label={playing ? "Zatrzymaj" : "Odtwórz"}
        className="w-7 h-7 flex items-center justify-center border border-[#262626] text-mil-text hover:text-mil-green hover:border-mil-green transition-colors"
      >
        {playing ? <Pause size={12} /> : <Play size={12} />}
      </button>

      <div className="flex flex-col leading-tight">
        <span className="mono text-[9px] text-mil-sub tracking-[0.24em] uppercase">
          Audio · Ops
        </span>
        <span className="mil-heading text-[10.5px] text-mil-text tracking-[0.14em] whitespace-nowrap">
          {trackLabel}
        </span>
      </div>

      <div className="flex items-center gap-2 pl-2 border-l border-[#1f1f1f]">
        <button
          onClick={toggleMute}
          data-testid="audio-mute"
          aria-label={muted ? "Wyłącz wyciszenie" : "Wycisz"}
          className="text-mil-sub hover:text-mil-text transition-colors"
        >
          {muted || volume === 0 ? <VolumeX size={13} /> : <Volume2 size={13} />}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={muted ? 0 : volume}
          onChange={(e) => setVolume(parseInt(e.target.value, 10))}
          data-testid="audio-volume"
          aria-label="Głośność"
          className="w-24 h-1 accent-[#7fb069] cursor-pointer"
        />
        <span className="mono text-[10px] text-mil-sub w-8 text-right">
          {muted ? 0 : volume}%
        </span>
      </div>
    </div>
  );
};

export default AudioPlayer;
