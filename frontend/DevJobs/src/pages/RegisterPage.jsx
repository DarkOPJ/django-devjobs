import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from "/job.ico";
import { FaEye, FaLock, FaMailBulk, FaUser } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const success = await register({ username, email, password });
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex items-center justify-center p-4 md:p-10 relative overflow-hidden font-sans">
      {/* Ambient Background Graphic */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-indigo-500/10 blur-[120px] mix-blend-multiply opacity-50"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[100px] mix-blend-multiply opacity-50"></div>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-[440px] z-10 relative">
        {/* Top Brand Element */}
        <div className="text-center mb-6 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl shadow-[0px_4px_20px_rgba(79,70,229,0.2)] flex items-center justify-center mb-2">
            <img src={logo} alt="DevJobs Logo" className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-indigo-600">DevJobs</h1>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-[0px_10px_32px_rgba(0,0,0,0.06)] p-6 md:p-8 border border-gray-200">
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Create an account</h2>
            <p className="text-sm text-gray-500">Join us to start finding your dream job.</p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            {/* Username Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" htmlFor="username">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className='text-gray-400' />
                </div>
                <input 
                  className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all" 
                  id="username" 
                  name="username" 
                  placeholder="johndoe" 
                  required 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" htmlFor="email">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMailBulk className='text-gray-400' />
                </div>
                <input 
                  className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all" 
                  id="email" 
                  name="email" 
                  placeholder="name@company.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className='text-gray-400' />
                </div>
                <input 
                  className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-10 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash className='text-gray-400' /> : <FaEye className='text-gray-400' />}
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">Must be at least 8 characters long.</p>
            </div>

            {/* Action Button */}
            <button 
              className="w-full mt-2 bg-indigo-600 text-white font-semibold text-sm py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 active:scale-[0.98] flex items-center justify-center shadow-sm" 
              type="submit"
            >
              Create Account
            </button>
          </form>

          {/* Bottom Link */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account? 
            <Link className="ml-1 font-semibold text-indigo-600 hover:text-indigo-800 transition-colors" to="/login">Log in</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
