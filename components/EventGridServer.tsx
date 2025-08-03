import React from 'react';
import { createClient } from "@/lib/supabase/server";
import { Calendar, MapPin, Users } from 'lucide-react';

type TierType = 'Free' | 'Silver' | 'Gold' | 'Platinum';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  tier: TierType;
  attendees: number;
  image: string;
}

const EventsGridServer = async () => {
  const supabase = createClient();
  const { data: events, error } = await supabase.from('events').select('*');

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-300 text-xl">Error: {error.message}</div>
        </div>
      </div>
    );
  }

  const getTierColor = (tier: TierType): string => {
    const colors: Record<TierType, string> = {
      Free: "bg-gray-100 text-gray-800 border-gray-300",
      Silver: "bg-gray-200 text-gray-700 border-gray-400",
      Gold: "bg-yellow-100 text-yellow-800 border-yellow-400",
      Platinum: "bg-purple-100 text-purple-800 border-purple-400"
    };
    return colors[tier] || colors.Free;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Exclusive Events
          </h1>
          <p className="text-purple-200 text-lg md:text-xl max-w-2xl mx-auto">
            Discover premium events tailored for every tier. From free community gatherings to platinum exclusive experiences.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {events?.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Event Image */}
              <div className="relative h-48 md:h-52 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {/* Tier Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTierColor(event.tier)}`}>
                    {event.tier}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  {/* Date & Time */}
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{formatDate(event.date)} at {event.time}</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>

                  {/* Attendees */}
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 px-8 rounded-xl border border-white/20 transition-all duration-200">
            Load More Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsGridServer; 