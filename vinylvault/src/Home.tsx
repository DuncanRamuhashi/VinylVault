import React from 'react';
import background from './assets/pexels-didsss-2032719.jpg';

const Home = () => {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ 
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="text-center text-white bg-black/50 p-8 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome Home
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          Discover a world of possibilities with our amazing platform.
          Join us today and start your journey!
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-200">
            Get Started
          </button>
          <button className="bg-transparent hover:bg-white/20 text-white font-semibold py-2 px-6 rounded-md border border-white transition-colors duration-200">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;