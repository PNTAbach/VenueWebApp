import React from 'react';
import EventForm from '../components/EventForm/eventForm';
import EventList from '../components/EventList/eventList';

function Events(): React.ReactElement {
    return (
        <div className="container py-4">
            <h2>Create & Manage Events</h2>
            <EventForm />
            <hr />
            <EventList />
        </div>
    );
}

export default Events;
