import React from 'react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold text-white animate-on-scroll">
          It's Event<span className="text-pink-500">Ease</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 italic animate-on-scroll" style={{ animationDelay: '0.2s' }}>
          Where you got some rest form searching for best components to make your best event.
        </p>
        <div className="space-y-4 animate-on-scroll" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            It's who we are, it's what we do
          </h2>
          <p className="text-2xl md:text-3xl font-medium text-white">
            we build trust,
          </p>
          <p className="text-2xl md:text-3xl font-medium text-white">
            we are Event<span className="text-pink-500">Ease</span>
          </p>
        </div>
        <div className="flex justify-center gap-4 pt-8 animate-on-scroll" style={{ animationDelay: '0.6s' }}>
          <Link
            to="/contact"
            className="bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-500 transition-colors"
          >
            CONTACT US
          </Link>
          <Link
            to="/about"
            className="bg-white/10 text-white px-8 py-3 rounded-md hover:bg-white/20 transition-colors"
          >
            LEARN MORE
          </Link>
        </div>
      </div>
    </section>
  );
}