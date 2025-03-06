import React from 'react';
import background from './assets/pexels-didsss-2032719.jpg';
import mj from './assets/giphy-3--unscreen.gif'; // Michael Jackson

const Home = () => {
  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="text-center text-gray-100 p-8 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome Home
        </h1>
        <p className="text-2xl mb-6 max-w-2xl">
          VinylVault
        </p>
        <p className="text-base mb-6 max-w-2xl">
          Timeless Music, Forever Preserved.
        </p>
      </div>

      {/* Animated Michael Jackson GIF */}
      <div className="fixed bottom-0 left-0 w-full overflow-hidden">
        <div className="w-full flex">
          <div className="animate-slide">
            <img src={mj} className="h-52 w-auto" alt="Michael Jackson" />
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
      </style>
    </div>
  );
};

export default Home;
