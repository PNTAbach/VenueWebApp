/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import VenueService from '../services/venue.service';
import { VenueDTO, Type } from '../models/IVenue';
import VenueForm from '../components/venueForm/venueForm';

const EditVenue: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [venueData, setVenueData] = useState<VenueDTO | null>(null);

    useEffect(() => {
        fetchVenueData();
    }, []);

    const fetchVenueData = async () => {
        try {
            if (localStorage.getItem('token')) {
                const venueService = new VenueService();
                const data = await venueService.getVenueByToken();
                setVenueData(data);
            } else {
                throw new Error('Token not found');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching venue data:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: Type
    ) => {
        const { name, value } = e.target;

        if (venueData) {
            if (type === Type.VENUE) {
                setVenueData({
                    ...venueData,
                    [name]: value,
                });
            } else if (type === Type.LOCATION && venueData) {
                const updatedLocations = [...venueData.locations];
                updatedLocations[0] = { ...updatedLocations[0], [name]: value };
                setVenueData({
                    ...venueData,
                    locations: updatedLocations,
                });
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const venueService = new VenueService();
            const venue: VenueDTO = await venueService.updateVenue(
                venueData!.venueId,
                venueData!
            );
            console.log(venue);
            alert('Venue updated successfully!');
        } catch (error) {
            console.error('Error updating venue:', error);
            alert(
                'An error occurred while updating the venue. Please try again later.'
            );
        }
    };

    return (
        <div className="container">
            {loading ? (
                <div>
                    <p>Loading...</p>
                </div>
            ) : (
                <div>
                    <h2>Edit {venueData?.name}</h2>
                    <VenueForm
                        venueData={venueData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            )}
        </div>
    );
};

export default EditVenue;
