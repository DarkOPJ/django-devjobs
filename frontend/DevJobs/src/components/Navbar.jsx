import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/job.png";
import { AuthContext } from "../context/AuthContext";
import { getAvatarForUser } from "../utils/avatarGenerator";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const onPage = ({ isActive }) =>
    isActive
      ? "text-white bg-black hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-indigo-800 hover:text-white rounded-md px-3 py-2";

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500 z-50 relative">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-between md:items-stretch">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="DevJobs logo" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                DevJobs
              </span>
            </NavLink>

            <div className="flex items-center space-x-4 ml-auto">
              <div className="flex space-x-2 items-center">
                <NavLink to="/" className={onPage}>
                  Home
                </NavLink>
                <NavLink to="/add-job" className={onPage}>
                  Add Job
                </NavLink>
              </div>

              {/* Auth section */}
              {user ? (
                <div className="relative ml-2" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
                  >
                    <img
                      className="h-10 w-10 rounded-full object-cover border-2 border-indigo-400 bg-indigo-50"
                      src={getAvatarForUser(user?.id)}
                      alt="User avatar"
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink to="/login" className={onPage}>
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
