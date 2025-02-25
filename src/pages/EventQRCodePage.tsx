import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2, QrCode, Copy } from 'lucide-react';

interface EventQRData {
  eventId: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export function EventQRCodePage() {
  const [copied, setCopied] = useState(false);
  
  // This would come from your state management solution
  const eventData: EventQRData = {
    eventId: '123456',
    title: 'Tech Conference 2024',
    date: '2024-06-15',
    time: '09:00',
    location: 'Grand Conference Center, San Francisco',
    description: 'Join us for an immersive tech conference featuring industry leaders.'
  };

  const qrCodeData = btoa(JSON.stringify(eventData));
  const qrCodeUrl = `${window.location.origin}/events/${eventData.eventId}`;

  const downloadQRCode = () => {
    const canvas = document.getElementById('event-qr-code') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `event-qr-${eventData.eventId}.png`;
      a.click();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrCodeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareEvent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: eventData.title,
          text: `Join me at ${eventData.title}!`,
          url: qrCodeUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <main className="flex-1 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/invitation"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-white">Event QR Code</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* QR Code Card */}
          <div className="backdrop-blur-sm bg-purple-950/40 p-8 rounded-xl border border-purple-800/50">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white rounded-xl">
                <QRCodeSVG
                  id="event-qr-code"
                  value={qrCodeData}
                  size={250}
                  level="H"
                  includeMargin
                />
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={downloadQRCode}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-500 hover:to-pink-400 transition-all"
              >
                <Download className="h-5 w-5" />
                Download QR Code
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-4 py-3 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <Copy className="h-5 w-5" />
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>

                <button
                  onClick={shareEvent}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-4 py-3 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                  Share Event
                </button>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-8">
            <div className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50">
              <h2 className="text-xl font-semibold text-white mb-4">Event Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Event Title
                  </label>
                  <p className="text-white">{eventData.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Date & Time
                  </label>
                  <p className="text-white">
                    {new Date(eventData.date).toLocaleDateString()} at {eventData.time}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Location
                  </label>
                  <p className="text-white">{eventData.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Description
                  </label>
                  <p className="text-white">{eventData.description}</p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50">
              <h2 className="text-xl font-semibold text-white mb-4">How to Use</h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white">
                    1
                  </div>
                  <p>Download or share the QR code with your guests</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white">
                    2
                  </div>
                  <p>Guests can scan the QR code with their phone's camera</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white">
                    3
                  </div>
                  <p>They'll be directed to the event page with all details</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white">
                    4
                  </div>
                  <p>Guests can RSVP and access event information instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}