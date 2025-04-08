
import background from './assets/pexels-didsss-2032719.jpg';
import Mic from './cards/MicJ';

const Home = () => {
  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center px-4 md:px-8 lg:px-16"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="text-center text-gray-100 p-4 md:p-8 rounded-lg">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Welcome Home
        </h1>
        <p className="text-xl sm:text-2xl mb-4 max-w-xl">
          VinylVault
        </p>
        <p className="text-sm sm:text-base mb-4 max-w-xl">
          Timeless Music, Forever Preserved.
        </p>
        <p className="text-sm sm:text-base mb-4 max-w-xl">
          Helping you Remember your Collections.
        </p>
      </div>
      <Mic />
    </div>
  );
};

export default Home;
