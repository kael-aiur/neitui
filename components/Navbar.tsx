import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, UserCheck, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">Neitui</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/seeker"
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
              isActive('/seeker')
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>我要求职</span>
          </Link>
          
          <Link
            to="/referrer"
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
              isActive('/referrer')
                ? 'bg-indigo-50 text-indigo-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>我要内推</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;