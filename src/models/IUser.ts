export interface UserSignUpDTO {
    email: string;
    password: string;
    fName?: string;
    lName?: string;
    phoneNumber?: string;
    phoneCountryCode?: string;
    image?: string;
    birthDate?: Date;
}

export interface UserLoginDTO {
    email: string;
    password: string;
}

export interface UserAuthResponse {
    token: string;
}

export interface UserUpdateDTO {
    id?: number;
    email?: string;
    fName?: string;
    lName?: string;
    phoneNumber?: string;
    phoneCountryCode?: string;
    image?: string;
    birthDate?: Date;
}

export interface UserDTO {
    userId?: number;
    email?: string;
    fname?: string;
    lname?: string;
    phoneNumber?: string;
    phoneCountryCode?: string;
    image?: string;
    birthDate?: Date;
    role?: string;
}
export interface AllUserVenueDTO {
    userId?: number;
    email?: string;
    fname?: string;
    lname?: string;
    phoneNumber?: string;
    phoneCountryCode?: string;
    image?: string;
    birthDate?: Date;
    venueRole?: string;
    role?: string;
}

export interface UserAddDTO {
    email: string;
    password: string;
    fName?: string;
    lName?: string;
    phoneNumber?: string;
    phoneCountryCode?: string;
    image?: string;
    birthDate?: Date;
}
