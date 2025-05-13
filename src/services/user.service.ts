import {
    UserSignUpDTO,
    UserAuthResponse,
    UserDTO,
    UserLoginDTO,
    UserUpdateDTO,
} from './../models/IUser';
import createAxiosClient from '../conf/axiosInstance';
import { AxiosInstance } from 'axios';

const resourceUser = 'user/users';
const resourceUserByToken: string = 'auth/user';
const resourceAuthenticate: string = 'auth/authenticate';
const resourceRegister: string = 'auth/register';

class UserService {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = createAxiosClient();
    }

    async login(data: UserLoginDTO): Promise<UserAuthResponse> {
        const response = await this.axiosClient.post(
            resourceAuthenticate,
            data,
            {
                headers: {
                    'Content-Type': 'application/json', 
                },
            }
        );
        return response.data;
    }

    async register(data: UserSignUpDTO): Promise<UserAuthResponse> {
        const response = await this.axiosClient.post(resourceRegister, data);
        return response.data;
    }

    async getUser(id: number | null): Promise<string | UserDTO[] | UserDTO> {
        const response = await this.axiosClient.get(`/${resourceUser}/${id}`);
        return response.data;
    }
    async getUserByToken(): Promise<string | UserDTO> {
        const response = await this.axiosClient.get(`/${resourceUserByToken}`);
        return response.data;
    }

    async updateUser(data: UserUpdateDTO): Promise<string | UserDTO> {
        const response = await this.axiosClient.put(`/${resourceUser}`, data);
        return response.data;
    }
}

export default UserService;
