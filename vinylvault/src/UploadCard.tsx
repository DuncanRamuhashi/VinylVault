import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadCard: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Title:', title);
    console.log('Name:', name);
    console.log('Image:', image);
 
    navigate('/collections');
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-20 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Add Collections
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label 
            htmlFor="title" 
            className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-hover:text-red-800"
          >
          Artist Name
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a captivating title"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-300"
          />
        </div>

        <div className="group">
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-hover:text-red-800"
          >
           Album Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-blue-300"
          />
        </div>

        <div className="group">
          <label 
            htmlFor="image" 
            className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-hover:text-red-800"
          >
           Add Art
          </label>
          <div className="relative">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-red-700 hover:file:bg-blue-100 transition-all duration-200"
            />
            {image && (
              <div className="mt-3 flex items-center space-x-2 animate-fade-in">
                <span className="text-sm text-gray-600">Selected:</span>
                <span className="text-sm text-red-600 font-medium truncate max-w-[200px]">
                  {image.name}
                </span>
              </div>
            )}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-900 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Upload Your Card
        </button>
      </form>
    </div>
  );
};

export default UploadCard;