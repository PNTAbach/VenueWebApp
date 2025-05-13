import React from 'react';
import { VenueDTO } from '../../models/IVenue';

const LocationInfo: React.FC<{ venueData: VenueDTO }> = ({ venueData }) => {
    return (
        <div className="card border-primary shadow">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Location</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <p className="card-text mb-3">
                            <strong>City:</strong> {venueData.locations[0].city}
                        </p>
                        <p className="card-text mb-3">
                            <strong>Postal Code:</strong>{' '}
                            {venueData.locations[0].postalCode}
                        </p>
                        <p className="card-text mb-3">
                            <strong>Country:</strong>{' '}
                            {venueData.locations[0].country}
                        </p>
                    </div>
                    <div className="col-md-6">
                        <p className="card-text mb-3">
                            <strong>Address:</strong>{' '}
                            {venueData.locations[0].address}
                        </p>
                        <p className="card-text mb-3">
                            <strong>Longitude:</strong>{' '}
                            {venueData.locations[0].longitude}
                        </p>
                        <p className="card-text mb-0">
                            <strong>Latitude:</strong>{' '}
                            {venueData.locations[0].latitude}
                        </p>
                    </div>
                </div>
            </div>
            <div className="card-footer bg-light">
                <small className="text-muted">Location details</small>
            </div>
        </div>
    );
};

export default LocationInfo;
