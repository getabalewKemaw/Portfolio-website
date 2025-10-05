import React from "react";

const AnimatedDivider = () => {
  return (
    <div aria-hidden className="w-full py-8">
      <div className="relative mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent">
        <span className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.8)] animate-divider-dot" />
      </div>
    </div>
  );
};

export default AnimatedDivider;
