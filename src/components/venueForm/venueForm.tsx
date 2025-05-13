import React from 'react';
import { VenueDTO, Type } from '../../models/IVenue';

interface VenueFormProps {
    venueData: VenueDTO | null;
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        type: Type
    ) => void;
    handleSubmit: () => void;
}

const VenueForm: React.FC<VenueFormProps> = ({
    venueData,
    handleInputChange,
    handleSubmit,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={venueData?.name}
                    onChange={(e) => handleInputChange(e, Type.VENUE)}
                />
            </div>
            <div>
                <label htmlFor="picture">Picture:</label>
                <input
                    type="text"
                    id="picture"
                    name="picture"
                    value={venueData?.picture}
                    onChange={(e) => handleInputChange(e, Type.VENUE)}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={venueData?.description}
                    onChange={(e) => handleInputChange(e, Type.VENUE)}
                />
            </div>
            <div>
                <label htmlFor="priceRating">Price Rating:</label>
                <input
                    type="text"
                    id="priceRating"
                    name="priceRating"
                    value={venueData?.priceRating}
                    onChange={(e) => handleInputChange(e, Type.VENUE)}
                />
            </div>
            <div>
                <label htmlFor="rating">Rating:</label>
                <input
                    type="text"
                    id="rating"
                    name="rating"
                    value={venueData?.rating}
                    onChange={(e) => handleInputChange(e, Type.VENUE)}
                />
            </div>
            {/* Locations */}
            <div>
                <label htmlFor="latitude">Latitude:</label>
                <input
                    type="number"
                    id="latitude"
                    name="latitude"
                    value={venueData?.locations[0].latitude}
                    onChange={(e) => handleInputChange(e, Type.LOCATION)}
                />
            </div>
            <div>
                <label htmlFor="longitude">Longitude:</label>
                <input
                    type="number"
                    id="longitude"
                    name="longitude"
                    value={venueData?.locations[0].longitude}
                    onChange={(e) => handleInputChange(e, Type.LOCATION)}
                />
            </div>
            <div>
                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={venueData?.locations[0].city}
                    onChange={(e) => handleInputChange(e, Type.LOCATION)}
                />
            </div>
            <div>
                <label htmlFor="postalCode">Postal Code:</label>
                <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={venueData?.locations[0].postalCode}
                    onChange={(e) => handleInputChange(e, Type.LOCATION)}
                />
            </div>
            <div>
                <label htmlFor="country">Country:</label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    value={venueData?.locations[0].country}
                    onChange={(e) => handleInputChange(e, Type.LOCATION)}
                />
            </div>
            <div>
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={venueData?.locations[0].address}
                    onChange={(e) => handleInputChange(e, Type.LOCATION)}
                />
            </div>
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default VenueForm;
