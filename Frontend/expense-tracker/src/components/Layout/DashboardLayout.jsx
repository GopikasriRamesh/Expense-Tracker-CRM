import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar user={user} activeMenu={activeMenu} />

      <div className="flex">
        <div className="max-[1080px]:hidden">
          {/* Sidebar */}
          <SideMenu activeMenu={activeMenu} />
        </div>

        <div className="grow mx-5">
          {user ? (
            <Outlet /> // ✅ Shows the content for current route
          ) : (
            <p className="mt-10 text-gray-600 text-center">Fetching your data or session expired...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
