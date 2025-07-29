import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { SIDE_MENU_DATA } from '../../utils/data';
import { useNavigate } from 'react-router-dom';
import CharAvathar from '../Layout/cards/charAvathar'; // ✅ Make sure path is correct

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  const handleClick = (route) => {
    if (route === 'logout') {
      handleLogout();
    } else {
      navigate(route);
    }
  };

  return (
    <div className='w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-500 p-5 sticky top-16 flex flex-col justify-between'>
      {/* Profile Section */}
      <div className='flex flex-col items-center gap-2 mb-6 mt-3 justify-center'>
        {user?.profilePicUrl ? (
          <img
            src={user.profilePicUrl}
            alt="Profile"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <CharAvathar
            fullName={user?.fullName || ''}
            width="w-20"
            height="h-20"
            style="text-2xl"
          />
        )}
        <h5 className='text-md font-semibold text-gray-800'>
          {user?.fullName || 'Guest'}
        </h5>
      </div>

      {/* Menu Items */}
      <div className='flex flex-col gap-2'>
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu-item-${index}`}
            className={`w-full flex items-center gap-4 text-[15px] p-2 rounded-md transition-all duration-150 ${
              activeMenu === item.label
                ? 'bg-purple-600 text-white'
                : 'text-gray-800 hover:bg-gray-100'
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className='text-[20px]' />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
