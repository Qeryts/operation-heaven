import React from "react";

// Full-viewport CRT scanlines + vignette overlay
export const ScanlineOverlay = () => (
  <>
    <div className="crt-scanlines" aria-hidden="true" />
    <div className="crt-vignette" aria-hidden="true" />
  </>
);

export default ScanlineOverlay;
