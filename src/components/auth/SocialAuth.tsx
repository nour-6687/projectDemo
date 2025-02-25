import React from 'react';

export function SocialAuth() {
  const socialButtons = [
    { name: 'Google', icon: 'https://authjs.dev/img/providers/google.svg' },
    { name: 'Facebook', icon: 'https://authjs.dev/img/providers/facebook.svg' },
    { name: 'Apple', icon: 'https://authjs.dev/img/providers/apple.svg' },
    { name: 'LinkedIn', icon: 'https://authjs.dev/img/providers/linkedin.svg' },
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-400 bg-purple-950">OR</span>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        {socialButtons.map((button) => (
          <button
            key={button.name}
            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <img
              src={button.icon}
              alt={`${button.name} login`}
              className="w-6 h-6"
            />
          </button>
        ))}
      </div>
    </div>
  );
}