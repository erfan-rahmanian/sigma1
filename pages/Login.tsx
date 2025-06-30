
import React, { useState } from 'react';
import { login, setToken, getApiErrorMessage } from '../types';

interface LoginProps {
  onLogin: () => void;
}

const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeSlashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" />
  </svg>
);

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('09938713314');
  const [password, setPassword] = useState('*********');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await login({ username, password });
      if (response && response.Id) {
        setToken(response.Id);
        onLogin();
      } else {
        setError('Login failed: Invalid response from server.');
      }
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
       <style>
        {`
          @keyframes pulse-shadow {
            0% {
              box-shadow: 0 0 25px rgba(109, 30, 39, 0.3);
            }
            50% {
              box-shadow: 0 0 40px 5px rgba(109, 30, 39, 0.5);
            }
            100% {
              box-shadow: 0 0 25px rgba(109, 30, 39, 0.3);
            }
          }
          .login-box-animated {
            animation: pulse-shadow 3.5s infinite ease-in-out;
          }
        `}
      </style>
      <div 
        className="w-full max-w-sm p-8 space-y-8 bg-white rounded-xl login-box-animated"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">ورود به سیستم</h2>
          <p className="mt-2 text-sm text-gray-600">نام کاربری و رمز عبور خود را وارد کنید</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-md">{error}</p>}
          <div className="space-y-4">
            <div>
              <label htmlFor="mobile" className="sr-only">شماره موبایل</label>
              <input
                id="mobile"
                name="mobile"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-50 focus:outline-none focus:ring-primary-maroon focus:border-primary-maroon focus:z-10 sm:text-sm text-right"
                placeholder="شماره موبایل"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>
             <div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">رمز عبور</label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 bg-gray-50 focus:outline-none focus:ring-primary-maroon focus:border-primary-maroon focus:z-10 sm:text-sm text-right pl-10"
                  placeholder="رمز عبور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 hover:text-primary-maroon focus:outline-none"
                    aria-label={showPassword ? "پنهان کردن گذرواژه" : "نمایش گذرواژه"}
                  >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="text-sm text-right">
            <a href="#" className="font-medium text-primary-maroon hover:text-primary-maroon-light">
              فراموشی رمز عبور
            </a>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-maroon hover:bg-primary-maroon-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-maroon disabled:bg-primary-maroon-light/50 disabled:cursor-not-allowed"
            >
              {loading ? 'در حال ورود...' : 'ورود به سیستم'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
