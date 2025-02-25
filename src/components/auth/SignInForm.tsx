import React from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SignInForm() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            placeholder="EMAIL"
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="password"
            placeholder="PASSWORD"
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      
      <div className="text-right">
        <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
          FORGOT PASSWORD?
        </Link>
      </div>

      <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-500 transition-colors">
        SIGN IN
      </button>

      <div className="text-center text-sm text-gray-400">
        DON'T HAVE AN ACCOUNT?{' '}
        <Link to="/signup" className="text-purple-400 hover:text-purple-300">
          SIGN UP
        </Link>
      </div>
    </div>
  );
}