import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Home, ArrowLeft } from 'lucide-react';

const AuthPage = ({ onBackToDemo = () => {} }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  const checkLoggedInUser = () => {
    try {
      const userData = localStorage.getItem('current_user');
      if (userData) {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('No user logged in');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!isSignIn && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isSignIn && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (!validateForm()) return;

    try {
      const userKey = `user:${formData.email}`;
      
      const existingUser = localStorage.getItem(userKey);
      if (existingUser) {
        setMessage({ text: 'User already exists! Please sign in.', type: 'error' });
        return;
      }

      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem(userKey, JSON.stringify(newUser));
      localStorage.setItem('current_user', JSON.stringify({
        name: newUser.name,
        email: newUser.email
      }));

      setMessage({ text: 'Registration successful! Welcome aboard! 🎉', type: 'success' });
      setTimeout(() => {
        setCurrentUser({ name: newUser.name, email: newUser.email });
        setIsLoggedIn(true);
      }, 1500);
      
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ text: `Registration failed: ${error.message}`, type: 'error' });
    }
  };

  const handleSignIn = () => {
    if (!validateForm()) return;

    try {
      const userKey = `user:${formData.email}`;
      const userData = localStorage.getItem(userKey);
      
      if (!userData) {
        setMessage({ text: 'User not found. Please sign up first.', type: 'error' });
        return;
      }

      const user = JSON.parse(userData);
      
      if (user.password !== formData.password) {
        setMessage({ text: 'Incorrect password. Please try again.', type: 'error' });
        return;
      }

      localStorage.setItem('current_user', JSON.stringify({
        name: user.name,
        email: user.email
      }));

      setMessage({ text: 'Sign in successful! Welcome back! 👋', type: 'success' });
      setTimeout(() => {
        setCurrentUser({ name: user.name, email: user.email });
        setIsLoggedIn(true);
      }, 1500);
      
    } catch (error) {
      console.error('Sign in error:', error);
      setMessage({ text: 'Sign in failed. Please try again.', type: 'error' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    
    if (isSignIn) {
      handleSignIn();
    } else {
      handleSignUp();
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('current_user');
      setIsLoggedIn(false);
      setCurrentUser(null);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setMessage({ text: 'Logged out successfully!', type: 'success' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const switchMode = () => {
    setIsSignIn(!isSignIn);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setMessage({ text: '', type: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-purple-600">Loading...</div>
      </div>
    );
  }

  if (isLoggedIn && currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-y-auto">
        <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed w-full top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🌍 My Travel Buddy
            </div>
            <button 
onClick={() => window.location.href = '/WebTech-Project-/'}
  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2">
  <ArrowLeft className="w-4 h-4" />
  Back to Home
</button>
          </div>
        </nav>

        <div className="pt-32 pb-12 px-6 flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-xl">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
              <p className="text-xl text-gray-600 font-semibold">{currentUser.name}</p>
              <p className="text-sm text-gray-500">{currentUser.email}</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-6">
              <Home className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Your Dashboard</h3>
              <p className="text-gray-600 text-center mb-6">
                You're successfully logged in! Your travel data is securely stored and ready whenever you need it.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl mb-2">✈️</div>
                  <div className="text-sm text-gray-600">Saved Trips</div>
                  <div className="text-2xl font-bold text-purple-600">0</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl mb-2">🗺️</div>
                  <div className="text-sm text-gray-600">Itineraries</div>
                  <div className="text-2xl font-bold text-purple-600">0</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl mb-2">🌟</div>
                  <div className="text-sm text-gray-600">Favorites</div>
                  <div className="text-2xl font-bold text-purple-600">0</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
  onClick={() => window.location.href = '/WebTech-Project-/'}
  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
>
  Start Planning Trip
</button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-y-auto">
      <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🌍 My Travel Buddy
          </div>
          <button 
onClick={() => window.location.href = '/WebTech-Project-/'}
  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2">
  <ArrowLeft className="w-4 h-4" />
  Back to Home
</button>
        </div>
      </nav>

      <div className="pt-32 pb-12 px-6 flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white/30">
              {isSignIn ? (
                <div className="text-4xl">👤</div>
              ) : (
                <div className="text-4xl">✨</div>
              )}
            </div>
            <h2 className="text-3xl font-bold mb-2">
              {isSignIn ? 'Welcome Back!' : 'Join Us Today'}
            </h2>
            <p className="text-blue-100">
              {isSignIn ? 'Sign in to access your travel plans' : 'Create an account to start planning'}
            </p>
          </div>

          <div className="p-8">
            {!isSignIn && (
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {!isSignIn && (
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            {message.text && (
              <div className={`mb-4 p-4 rounded-xl text-sm font-semibold ${
                message.type === 'success' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200 mb-4"
            >
              {isSignIn ? '🔐 Sign In' : '✨ Create Account'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={switchMode}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                {isSignIn ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
