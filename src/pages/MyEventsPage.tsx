import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Pencil, Trash2, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// This would come from your state management solution
const initialEvents = [
  {
    id: 1,
    title: 'Tech Conference 2024',
    type: 'seminar',
    date: '2024-06-15',
    time: '09:00',
    location: 'Grand Conference Center, San Francisco',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80',
    status: 'upcoming',
    guests: 200,
    services: [
      { name: 'Venue', provider: 'Grand Conference Center' },
      { name: 'Catering', provider: 'Gourmet Events' },
      { name: 'Photography', provider: 'Event Lens Studio' }
    ],
    totalCost: 15000
  },
  {
    id: 2,
    title: 'Wedding Celebration',
    type: 'wedding',
    date: '2024-07-20',
    time: '17:00',
    location: 'Crystal Ballroom, New York',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80',
    status: 'upcoming',
    guests: 150,
    services: [
      { name: 'Venue', provider: 'Crystal Ballroom' },
      { name: 'Catering', provider: 'Elite Catering' },
      { name: 'Photography', provider: 'Love Stories Studio' },
      { name: 'Music', provider: 'Harmony Band' }
    ],
    totalCost: 25000
  },
  {
    id: 3,
    title: 'Birthday Party',
    type: 'birthday',
    date: '2024-03-10',
    time: '19:00',
    location: 'Fun Factory, Los Angeles',
    image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&q=80',
    status: 'completed',
    guests: 50,
    services: [
      { name: 'Venue', provider: 'Fun Factory' },
      { name: 'Catering', provider: 'Party Treats' },
      { name: 'Entertainment', provider: 'Kids Entertainment Co' }
    ],
    totalCost: 5000
  }
];

interface DeleteModalProps {
  isOpen: boolean;
  eventTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteModal({ isOpen, eventTitle, onConfirm, onCancel }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-white/10 rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 text-red-400 mb-4">
          <AlertTriangle className="h-6 w-6" />
          <h3 className="text-xl font-semibold">Delete Event</h3>
        </div>
        
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete <span className="text-white font-medium">"{eventTitle}"</span>? 
          This action cannot be undone.
        </p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function MyEventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState(initialEvents);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; eventId: number | null; eventTitle: string }>({
    isOpen: false,
    eventId: null,
    eventTitle: ''
  });

  const handleEdit = (eventId: number) => {
    // Navigate to edit page with event ID
    navigate(`/events/edit/${eventId}`);
  };

  const handleDelete = (eventId: number, eventTitle: string) => {
    setDeleteModal({ isOpen: true, eventId, eventTitle });
  };

  const confirmDelete = () => {
    if (deleteModal.eventId) {
      setEvents(events.filter(event => event.id !== deleteModal.eventId));
      setDeleteModal({ isOpen: false, eventId: null, eventTitle: '' });
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, eventId: null, eventTitle: '' });
  };

  const handleViewDetails = (eventId: number) => {
    // Navigate to event details page
    navigate(`/events/${eventId}`);
  };

  return (
    <main className="flex-1 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Events</h1>
            <p className="text-gray-300">Manage your upcoming and past events</p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/events/gallery"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all"
            >
              <ImageIcon className="h-5 w-5" />
              Gallery
            </Link>
            <Link
              to="/events/create"
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-500 hover:to-pink-400 transition-all"
            >
              Create New Event
            </Link>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">You haven't created any events yet.</p>
            <Link
              to="/events/create"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Create your first event
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="backdrop-blur-sm bg-gray-900/50 rounded-xl border border-white/10 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Event Image */}
                  <div className="md:w-1/3 aspect-video md:aspect-auto relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                        event.status === 'upcoming' 
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-gray-500/20 text-gray-300'
                      }`}>
                        {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{event.title}</h2>
                        <p className="text-purple-400 font-medium">
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(event.id)}
                          className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(event.id, event.title)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="h-5 w-5 text-purple-400" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="h-5 w-5 text-purple-400" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="h-5 w-5 text-purple-400" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="h-5 w-5 text-purple-400" />
                        <span>{event.guests} Guests</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Booked Services</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {event.services.map((service, index) => (
                          <div key={index} className="text-gray-300">
                            <span className="text-white">{service.name}:</span> {service.provider}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                      <div className="text-gray-300">
                        Total Cost: <span className="text-white font-semibold">${event.totalCost.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => handleViewDetails(event.id)}
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        eventTitle={deleteModal.eventTitle}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </main>
  );
}