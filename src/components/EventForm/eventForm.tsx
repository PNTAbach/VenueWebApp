import React, { useState, ChangeEvent } from 'react';
import PredictionBar from '../PredictionBar/predictionBar';
import { predictSuccess, EventFeatures } from '../../services/predictSuccess';
import EventService, { CreateEventDTO } from '../../services/event.service';


const availableTags: { id: number; label: string }[] = [
    { id: 1, label: 'Techno' },
    { id: 2, label: 'House' },
    { id: 3, label: 'Rap' },
    { id: 4, label: 'Rave' },
    { id: 5, label: 'Live' },
    { id: 6, label: 'Pop' },
    { id: 7, label: 'Loud' },
    { id: 8, label: 'None' },
    { id: 9, label: 'DJ' },
    { id: 10, label: 'Acoustic' },
    { id: 11, label: 'Indie' },
    { id: 12, label: 'Jazz' },
    { id: 13, label: 'Pub' },
    { id: 14, label: 'Club' },
    { id: 15, label: 'Tavern' },
    { id: 16, label: 'Inn' },
    { id: 17, label: 'Hotel' },
    { id: 18, label: 'Dive' },
    { id: 19, label: 'Brew' },
    { id: 20, label: 'Gastro' },
    { id: 21, label: 'Rooftop' },
    { id: 22, label: 'Art Bar' },
    { id: 23, label: 'Lounge' },
    { id: 24, label: 'Barcade' },
    { id: 25, label: 'Karaoke' },
    { id: 26, label: 'Hookah' },
    { id: 27, label: 'Concept' },
    { id: 28, label: 'Pool' },
    { id: 29, label: 'Beach' },
    { id: 30, label: 'Sports' },
    { id: 31, label: 'College' },
    { id: 32, label: 'Open Air' },
    { id: 33, label: 'Dress Code' },
    { id: 34, label: 'Themed Night' },
    { id: 35, label: 'Guest DJs' },
    { id: 36, label: 'Student' },
    { id: 37, label: 'Young' },
    { id: 38, label: '40+' },
    { id: 39, label: 'LGBTQ' },
    { id: 40, label: 'Street' },
    { id: 41, label: 'Local' },
    { id: 42, label: 'Tourists' },
    { id: 43, label: 'Mixed Crowd' },
    { id: 44, label: 'Expats' },
    { id: 45, label: 'Low' },
    { id: 46, label: 'Medium' },
    { id: 47, label: 'High' },
    { id: 48, label: 'Open' },
    { id: 49, label: 'Custom' },
    { id: 50, label: 'Any' },
];

const EventForm = (): React.ReactElement => {
    const [form, setForm] = useState<EventFeatures>({
        rating: 4.5,
        total_events: 10,
        avg_checkins: 120,
        avg_likes: 35,
        avg_event_rating: 4.2,
        median_event_rating: 4.0,
        venue_popularity_tier: 2,
        checkin_count: 800,
        like_count: 400,
        rating_avg: 4.3,
        rating_count: 150,
        engagement: 0.7,
        event_weekday: 3,
        event_month: 5,
        start_hour: 18,
        price_rating_encoded: 1,
    });

    const eventService = new EventService();

    const [tagIds, setTagIds] = useState<number[]>([]);
    const [score, setScore] = useState<number | null>(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name: inputName, value } = e.target;
    setForm((prev) => ({
        ...prev,
        [inputName]: parseFloat(value),
    }));
};

    const handleTagChange = (tagId: number): void => {
        setTagIds((prev) =>
            prev.includes(tagId)
                ? prev.filter((id) => id !== tagId)
                : [...prev, tagId]
        );
    };

    const handleTestScore = (): void => {
        predictSuccess({ ...form, tag_ids: tagIds })
            .then(setScore)
            .catch((err) => console.error('Prediction error:', err));
    };

    const handleCreateEvent = async (): Promise<void> => {
    const newEvent: CreateEventDTO = {
        venueId: 1, // Replace with actual venueId
        name,
        description,
        eventDate,
        startTime,
        endTime,
    };

    try {
        const result = await eventService.createEvent(newEvent);
        alert('Event created successfully!');
        console.log(result);
    } catch (error: any) {
        console.error('Failed to create event:', error);
        alert('Event creation failed.');
    }
};

    return (
        <div className="container mt-4">
            <h4>Create Event</h4>

            {/* Event Info */}
            <div className="mb-3">
                <label className="form-label">Event Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Event Date</label>
                <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Start Time</label>
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">End Time</label>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="form-control"
                />
            </div>

            {/* Numeric inputs for prediction */}
            {Object.keys(form).map((key) => (
                <div key={key} className="mb-3">
                    <label className="form-label">{key}</label>
                    <input
                        type="number"
                        step="any"
                        name={key}
                        value={(form as any)[key]}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
            ))}

            {/* Tag checkboxes */}
            <h5>Select Tags</h5>
            <div className="mb-3">
                {availableTags.map((tag) => (
                    <div key={tag.id} className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`tag-${tag.id}`}
                            checked={tagIds.includes(tag.id)}
                            onChange={() => handleTagChange(tag.id)}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={`tag-${tag.id}`}
                        >
                            {tag.label}
                        </label>
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <button className="btn btn-primary mt-2" onClick={handleTestScore}>
                Test Success Score
            </button>
            <button className="btn btn-success mt-2 ms-2" onClick={handleCreateEvent}>
                Create Event
            </button>

            {/* Prediction output */}
            {score !== null && (
                <div className="mt-4">
                    <PredictionBar score={score} />
                </div>
            )}
        </div>
    );
};

export default EventForm;
