import React, { JSX } from 'react';

const eventList = (): JSX.Element => {
    // Example: fetch events from backend later
    const events = [
        { name: 'Past Event A', date: '2024-01-01', isPast: true },
        { name: 'Upcoming Event B', date: '2025-06-01', isPast: false },
    ];

    return (
        <div>
            <h4>All Events</h4>
            <ul>
                {events.map((event, index) => (
                    <li key={index}>
                        {event.name} — {event.date} (
                        {event.isPast ? 'Past' : 'Upcoming'})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default eventList;
