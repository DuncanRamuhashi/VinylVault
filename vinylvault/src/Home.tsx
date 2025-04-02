import React from 'react';
import background from './assets/pexels-didsss-2032719.jpg';
import Mic from './cards/MicJ';

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
        <p className="text-base mb-6 max-w-2xl">
          Helping you Remember your Collections.
        </p>
      </div>
      <Mic/>
    </div>
  );
};

export default Home;
