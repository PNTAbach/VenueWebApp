import React from 'react';

import Card from 'react-bootstrap/Card';
import { VenueDTO } from '../../models/IVenue';

const ReviewCard: React.FC<{ venueData: VenueDTO }> = ({ venueData }) => {
    return (
        <Card className="venue-card">
            <Card.Body>
                <Card.Title className="venue-name">{venueData.name}</Card.Title>
                <div className="venue-info">
                    <div className="venue-rating">
                        <span className="label">Rating:</span>{' '}
                        {venueData.rating}
                    </div>
                    <div className="venue-price-rating">
                        <span className="label">Price Rating:</span>{' '}
                        {venueData.priceRating}
                    </div>
                </div>
                <Card.Text className="venue-description">
                    {venueData.description}
                </Card.Text>
                <Card.Link href="#" className="venue-link">
                    View Details
                </Card.Link>
            </Card.Body>
        </Card>
    );
};

export default ReviewCard;
