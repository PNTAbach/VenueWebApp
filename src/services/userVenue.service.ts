import { AllUserVenueDTO } from './../models/IUser';
import createAxiosClient from '../conf/axiosInstance';
import { AxiosInstance } from 'axios';

const resourceVenueWorkers: string = 'manageUserVenue/getVenueWorkers';
const resourceSetVenueStaff: string = 'manageUserVenue/setVenueStaff';
const resourceSetVenueManager: string = 'manageUserVenue/setVenueManager';
const resourceRemoveVenueUser: string = 'manageUserVenue/removeVenueUser';
const resourceAddVenueUser: string = 'manageUserVenue/addVenueWorker';
class UserVenueService {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = createAxiosClient();
    }

    async getVenueUsersbById(id: number): Promise<Array<AllUserVenueDTO>> {
        const response = await this.axiosClient.get(
            `/${resourceVenueWorkers}/${id}`
        );
        return response.data;
    }
    async addVenueStaff(userId: number, venueId: number): Promise<null> {
        const response = await this.axiosClient.post(
            `/${resourceAddVenueUser}/${userId}/${venueId}`
        );
        return response.data;
    }
    async setVenueStaff(userId: number, venueId: number): Promise<null> {
        const response = await this.axiosClient.put(
            `/${resourceSetVenueStaff}/${userId}/${venueId}`
        );
        return response.data;
    }
    async setVenueManager(userId: number, venueId: number): Promise<null> {
        const response = await this.axiosClient.put(
            `/${resourceSetVenueManager}/${userId}/${venueId}`
        );
        return response.data;
    }
    async removeVenueStaff(userId: number, venueId: number): Promise<null> {
        const response = await this.axiosClient.delete(
            `/${resourceRemoveVenueUser}/${userId}/${venueId}`
        );
        return response.data;
    }
}

export default UserVenueService;
