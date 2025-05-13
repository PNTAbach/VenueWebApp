import React from 'react';
import Footer from '../components/footer/footer';
import Main from '../components/main/main';
import '../css/home.css';

const Home: React.FC = () => {
    return (
        <div className="d-flex bgcolor">
            <div className="flex-grow-1">
                <div className="container-fluid">
                    <Main></Main>
                    <Footer></Footer>
                </div>
            </div>
        </div>
    );
};

export default Home;
