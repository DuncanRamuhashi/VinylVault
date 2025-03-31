import React from 'react'
import mjWalk from '../assets/giphy-3--unscreen.gif'; // Michael Jackson
const MicJ = () => {
  return (
    <div> {/* Animated Michael Jackson GIF */}
    <div className="fixed bottom-0 left-0 w-full overflow-hidden">
      <div className="w-full flex">
        <div className="animate-slide">
          <img src={mjWalk} className="h-52 w-auto" alt="Michael Jackson" />
        </div>
      </div>
    </div>

    <style>
      {`
        @keyframes slide {
          from {
            transform: translateX(100vw);
          }
          to {
            transform: translateX(-100%);
          }
        }
        .animate-slide {
          animation: slide 10s linear infinite;
          display: inline-block;
          white-space: nowrap;
        }
      `}
    </style></div>
  )
}

export default MicJ