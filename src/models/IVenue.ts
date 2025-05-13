export interface LocationDTO {
    latitude: number;
    longitude: number;
    city: string;
    postalCode: string;
    country: string;
    address: string;
}
export interface MenuDTO {
    menuId: number;
    description: string;
    type: string;
    name: string;
}
export interface VenueDTO {
    venueId: number;
    name: string;
    picture: string;
    description: string;
    priceRating: string;
    rating: string;
    managerId: number;
    locations: LocationDTO[];
    types: string[];
    menus: MenuDTO[];
}

export enum Type {
    VENUE = 'venue',
    LOCATION = 'location',
}
