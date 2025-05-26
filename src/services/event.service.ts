import createAxiosClient from '../conf/axiosInstance';

const axios = createAxiosClient();

export interface CreateEventDTO {
  venueId: number;
  name: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
}

export interface EventDTO {
  eventId: number;
  venueId: number;
  name: string;
  description: string;
  eventDate: string;
  startTime: { hour: number; minute: number; second: number };
  endTime: { hour: number; minute: number; second: number };
  createdAt: { hour: number; minute: number; second: number };
}

class EventService {
  async createEvent(event: CreateEventDTO): Promise<any> {
    const response = await axios.post('/events', event);
    return response.data;
  }

  async getEventsByVenueId(venueId: number): Promise<EventDTO[]> {
    const response = await axios.get(`/events/venue/${venueId}`);
    return response.data;
  }
}

export default EventService;
