/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import VenueService from '../../services/venue.service';
import UserVenueService from '../../services/userVenue.service';
import { VenueDTO } from '../../models/IVenue';
import LocationInfo from '../locationInfo/locationInfo';
import VenueInfo from '../venueInfo/venueInfo';
import StaffTable from '../staffTable/staffTable';
import { AllUserVenueDTO } from '../../models/IUser';
import ReviewCard from '../reviewCard/reviewCard';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Main: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [venueData, setVenueData] = useState<VenueDTO | null>(null);
    const [userData, setUserData] = useState<AllUserVenueDTO[]>([]);

    const openEditVenuePage = (): void => {
        navigate('/editVenue');
    };

    useEffect(() => {
        fetchVenueData();
    }, []);

    const fetchVenueData = async () => {
        try {
            if (localStorage.getItem('token')) {
                const venueService = new VenueService();
                const data = await venueService.getVenueByToken();
                setVenueData(data);
                const userVenueService = new UserVenueService();
                let userDataResponse =
                    await userVenueService.getVenueUsersbById(data.venueId);
                userDataResponse = userDataResponse.sort((a, b) => {
                    const userIdA = a.userId || 0;
                    const userIdB = b.userId || 0;
                    return userIdA - userIdB;
                });
                setUserData(userDataResponse);
            } else {
                throw new Error('Token not found');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching venue data:', error);
            setLoading(false);
        }
    };

    return (
        <div className="main-container">
            {loading ? (
                <div>Loading...</div>
            ) : venueData ? (
                <>
                    <div className="row custom-height-md">
                        <div className="col-md-6">
                            <div className="row mb-5 mt-4">
                                <div className="col-md-6 ">
                                    <ReviewCard venueData={venueData} />
                                </div>
                                <div className="col-md-6">
                                    <ReviewCard venueData={venueData} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 ">
                                    <ReviewCard venueData={venueData} />
                                </div>
                                <div className="col-md-6 ">
                                    <ReviewCard venueData={venueData} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <StaffTable
                                userData={userData}
                                reRenderList={fetchVenueData}
                                venueId={venueData.venueId}
                            ></StaffTable>
                        </div>
                    </div>
                    <VenueInfo venueData={venueData} />
                    <div className="location-section">
                        <h2 className="section-title">Location</h2>
                        <div className="row">
                            <div className="col-md-6">
                                <LocationInfo venueData={venueData} />
                            </div>
                            <div className="col-md-6 text-center">
                                <iframe
                                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2222.3934870329613!2d${venueData.locations[0].longitude}!3d${venueData.locations[0].latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zMjnCsDAwJzIyLjMiTiAxMMKwMzUnNTIuOCJX!5e0!3m2!1sen!2suk!4v1562879507387!5m2!1sen!2suk`}
                                    width="90%"
                                    height="100%"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                        <div>
                            <Button onClick={openEditVenuePage}></Button>
                        </div>
                    </div>
                </>
            ) : (
                <div>No venue data available.</div>
            )}
        </div>
    );
};

export default Main;
