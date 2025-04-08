import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateAlbumMutation } from './slices/albumsApiSlice';
import { setCredentials } from './slices/authSlice';

// Define interfaces for state and album data
interface UserInfo {
  email: string;
  name?: string;
  accessToken?: string;
  refreshToken?: string;
  _id?: string;
  [key: string]: any;
}

interface AuthState {
  auth: {
    userInfo: UserInfo | null;
  };
}

const UploadCard: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null); // Store Base64 string

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: AuthState) => state.auth);

  const [createAlbum, { isLoading }] = useCreateAlbumMutation();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      // Convert image to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string); // Base64 string
      };
      reader.onerror = () => {
        console.error('Error reading file');
        alert('Failed to process image. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(userInfo);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!userInfo?._id) {
      alert('Please log in to upload an album');
      navigate('/login');
      return;
    }
  
    if (!imageBase64) {
      alert('Please select an image to upload');
      return;
    }
  
    try {
      const albumData: any = {
        artistName: title,
        albumName: name,
        image: imageBase64,
        user: userInfo._id,
      };
  
      // Update the mutation call to include accessToken separately
      const response = await createAlbum({ 
        data: albumData,
        accessToken: userInfo.accessToken || ''
      }).unwrap();
  
      console.log('Album created:', response);
      navigate('/collections');
    } catch (error: any) {
      console.error('Upload error:', error);
      const errorMessage = error?.data?.message || 'Failed to upload album. Please try again.';
      // Could set an error state here instead of alert
      alert(errorMessage);
    }
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
            required
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
            required
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
          disabled={isLoading || !imageBase64}
          className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-900 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Uploading...' : 'Upload Your Card'}
        </button>
      </form>
    </div>
  );
};

export default UploadCard;