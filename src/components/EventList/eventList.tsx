import React, { JSX, useEffect, useState } from 'react';
import EventService, { EventDTO } from '../../services/event.service';

const EventList = (): JSX.Element => {
  const [events, setEvents] = useState<EventDTO[]>([]);
  const venueId = 1; // Replace this with actual venue ID (from context or API)

  useEffect(() => {
    const fetchEvents = async () => {
      const service = new EventService();
      try {
        const data = await service.getEventsByVenueId(venueId);
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, [venueId]);

  const isPastEvent = (dateStr: string): boolean => {
    return new Date(dateStr) < new Date();
  };

  return (
    <div>
      <h4>All Events</h4>
      <ul>
        {events.map((event) => (
          <li key={event.eventId}>
            {event.name} — {event.eventDate} ({isPastEvent(event.eventDate) ? 'Past' : 'Upcoming'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
