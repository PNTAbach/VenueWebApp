import React from 'react';
import { VenueDTO } from '../../models/IVenue';
import '../../css/venueInfo.css'; // Import the CSS file for custom styling

const VenueInfo: React.FC<{ venueData: VenueDTO }> = ({ venueData }) => {
    return (
        <div className="venue-info-container">
            <div className="venue-header">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>{venueData.name}</h2>
                    <p className="venue-id">Venue ID: {venueData.venueId}</p>
                </div>
                <p className="venue-description">
                    Description: {venueData.description}
                </p>
            </div>
            <div className="venue-details">
                <p>Price Rating: {venueData.priceRating}</p>
                <p>Rating: {venueData.rating}</p>
                <p>Types: {venueData.types.join(', ')}</p>
                <p>Number of Menus: {venueData.menus.length}</p>
            </div>
        </div>
    );
};

export default VenueInfo;
