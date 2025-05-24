import axios from 'axios';

export interface EventFeatures {
    rating: number;
    total_events: number;
    avg_checkins: number;
    avg_likes: number;
    avg_event_rating: number;
    median_event_rating: number;
    venue_popularity_tier: number;
    checkin_count: number;
    like_count: number;
    rating_avg: number;
    rating_count: number;
    engagement: number;
    event_weekday: number;
    event_month: number;
    start_hour: number;
    price_rating_encoded: number;
    tag_ids?: number[]; // New: Add this field for tag inputs
}

export const predictSuccess = async (form: EventFeatures): Promise<number> => {
    const response = await axios.post('http://127.0.0.1:5000/predict', {
        ...form,
        tag_ids: form.tag_ids || [0, 0, 0, 0, 0, 0], // fallback
    });
    return response.data.score;
};
