import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/images/job.png";
import { FaEye, FaEyeSlash, FaLock, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login({ username, password });
    if (success) {
      navigate("/");
    }
  };

  // Show any toast that was queued by a loader redirect (e.g. 401 on a protected route)
  useEffect(() => {
    const raw = sessionStorage.getItem('pendingToast');
    if (raw) {
      sessionStorage.removeItem('pendingToast');
      try {
        const { type, message } = JSON.parse(raw);
        if (type === 'error') toast.error(message);
        else if (type === 'warning') toast.warn(message);
        else toast.info(message);
      } catch {}
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-10 bg-gray-50 text-gray-900 relative overflow-hidden">
      {/* Atmospheric Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 opacity-20 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 opacity-20 blur-[120px]"></div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-[440px] z-10 relative">
        {/* Logo/Brand Anchor */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center justify-center gap-2">
            <img src={logo} alt="DevJobs Logo" className="h-10 w-10" />
            DevJobs
          </h1>
          <p className="text-gray-500 mt-2">
            Welcome back. Please log in to your account.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.06)] p-6 md:p-8 border border-gray-200">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Input */}
            <div>
              <label
                className="block text-sm font-semibold text-gray-900 mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
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

            {/* Password Input */}
            <div>
              <label
                className="block text-sm font-semibold text-gray-900 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
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
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button Group */}
            <div className="pt-2">
              <button
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:scale-[0.98] transition-all duration-200"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?
          <Link
            className="ml-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
            to="/register"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
