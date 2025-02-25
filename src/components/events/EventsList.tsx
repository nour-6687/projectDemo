import React from 'react';
import { EventCard } from './EventCard';

export function EventsList() {
  const events = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: '2024-03-15',
      time: '09:00',
      location: 'San Francisco, CA',
      category: 'conference',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80',
      participants: 42,
      maxParticipants: 100
    },
    // Add more sample events here
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}