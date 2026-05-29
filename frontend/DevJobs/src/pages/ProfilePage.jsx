import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { FaDoorOpen } from 'react-icons/fa6';
import { getAvatarForUser } from '../utils/avatarGenerator';

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="flex-grow flex items-center justify-center min-h-screen">
        <p className="text-xl">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-10 bg-gray-50 min-h-screen font-sans">
      <main className="w-full max-w-md bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] overflow-hidden border border-gray-200">
        {/* Profile Header / Banner */}
        <div className="h-32 bg-indigo-600/10 relative">
          {/* Profile Image */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <img 
              alt={`${user.username}'s profile`} 
              className="w-24 h-24 rounded-full border-4 border-white shadow-sm object-cover bg-indigo-50" 
              src={getAvatarForUser(user?.id)}
            />
          </div>
        </div>
        
        {/* Profile Details */}
        <div className="pt-16 pb-8 px-8 text-center flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.username}</h1>
          <p className="text-sm text-gray-500 mb-6">{user.email || 'No email provided'}</p>
          
          {/* Actions */}
          <div className="w-full flex flex-col gap-3">
            
            <button 
              onClick={handleLogout}
              className="w-full bg-transparent border border-red-200 text-red-600 py-2 px-4 rounded-lg font-semibold hover:bg-red-50 transition-colors active:scale-95 flex items-center justify-center gap-2"
            >
              <FaDoorOpen className="text-[20px]"/>
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
