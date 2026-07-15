import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const AudioCtx = createContext(null);

// Johnny Cash — "God's Gonna Cut You Down" (official audio on YouTube)
const DEFAULT_VIDEO_ID = "Y1ZsVe7VHwc";
const TRACK_LABEL = "Johnny Cash · God's Gonna Cut You Down";

export const AudioProvider = ({ children, videoId = DEFAULT_VIDEO_ID }) => {
  const playerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [volume, setVolumeState] = useState(45);
  const unmutedRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    // Ensure a mount point exists (hidden)
    let mountDiv = document.getElementById("yt-audio-player-mount");
    if (!mountDiv) {
      mountDiv = document.createElement("div");
      mountDiv.id = "yt-audio-player-mount";
      mountDiv.style.cssText =
        "position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;pointer-events:none;opacity:0;";
      document.body.appendChild(mountDiv);
    }

    const initPlayer = () => {
      if (!mounted || !window.YT || !window.YT.Player) return;
      playerRef.current = new window.YT.Player("yt-audio-player-mount", {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: videoId, // required for loop to work with single video
          controls: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          fs: 0,
          iv_load_policy: 3,
          disablekb: 1,
        },
        events: {
          onReady: (e) => {
            try {
              e.target.setVolume(volume);
              e.target.playVideo();
              setReady(true);
            } catch {}
          },
          onStateChange: (e) => {
            const S = window.YT.PlayerState;
            if (e.data === S.PLAYING) setPlaying(true);
            else if (e.data === S.PAUSED) setPlaying(false);
            else if (e.data === S.ENDED) {
              try { e.target.playVideo(); } catch {}
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // Load API script only once
      if (!document.getElementById("yt-iframe-api-script")) {
        const s = document.createElement("script");
        s.id = "yt-iframe-api-script";
        s.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(s);
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === "function") prev();
        initPlayer();
      };
    }

    // Auto-unmute on first user interaction (browser autoplay policy)
    const unmuteOnce = () => {
      if (unmutedRef.current) return;
      unmutedRef.current = true;
      try {
        playerRef.current?.unMute?.();
        playerRef.current?.setVolume?.(volume);
        playerRef.current?.playVideo?.();
        setMuted(false);
      } catch {}
      window.removeEventListener("pointerdown", unmuteOnce);
      window.removeEventListener("keydown", unmuteOnce);
    };
    window.addEventListener("pointerdown", unmuteOnce);
    window.addEventListener("keydown", unmuteOnce);

    return () => {
      mounted = false;
      window.removeEventListener("pointerdown", unmuteOnce);
      window.removeEventListener("keydown", unmuteOnce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const toggle = () => {
    if (!playerRef.current) return;
    try {
      if (playing) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.unMute?.();
        setMuted(false);
        playerRef.current.playVideo();
      }
    } catch {}
  };

  const setVolume = (v) => {
    const val = Math.max(0, Math.min(100, Math.round(v)));
    setVolumeState(val);
    try {
      if (val === 0) {
        playerRef.current?.mute?.();
        setMuted(true);
      } else {
        playerRef.current?.unMute?.();
        setMuted(false);
        playerRef.current?.setVolume?.(val);
      }
    } catch {}
  };

  const toggleMute = () => {
    try {
      if (muted) {
        playerRef.current?.unMute?.();
        setMuted(false);
        if (volume === 0) setVolume(30);
      } else {
        playerRef.current?.mute?.();
        setMuted(true);
      }
    } catch {}
  };

  return (
    <AudioCtx.Provider
      value={{ ready, playing, muted, volume, toggle, setVolume, toggleMute, trackLabel: TRACK_LABEL }}
    >
      {children}
    </AudioCtx.Provider>
  );
};

export const useAudio = () => useContext(AudioCtx);
