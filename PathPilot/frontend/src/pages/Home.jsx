import React, { useState } from 'react';
import '../styling/Home.css'; // Rename App.css to Home1.css to reflect the component name
import Mingcute from '../image/mingcute.png';
import Location from '../image/location.png';
import Airport from '../image/airport.png';
import Home1 from '../image/home1.png';
import Plan from '../image/plan.png';
import Account from '../image/account.png';
import { useNavigate } from 'react-router-dom';


function Home() {
    let navigate = useNavigate();

    const handleMingcuteBarClick = () => {
        navigate("/search");
  };

    return (
        <div className="home1">
            <div className='title-font'>Plan your <span className='road-trip'>Road Trip </span> from Berkeley</div>

            <div className='mingcute-bar' onClick={handleMingcuteBarClick}>
      
                <img src={Mingcute} className='mingcute' alt="Arrow" />
                <div className='search-font2' >Enter destination</div>
            </div>
            <div>
                <div className='weekend-font'>
                    Weekend Getaway
                </div>
                <div className='recommend-font'>Recommended
                    <span className='local-font'>Local Approved</span>
                    <span className='local-font'>Most Liked</span>
                </div>

                <div className="destination-list">
                    <div className="destination yosemite">
                        <span role="img" aria-label="like">👍 200</span>
                        <span role="img" aria-label="heart">❤️ 136</span>
                        <h3>Yosemite National Park</h3>
                        <p>12.9 mi (3.6 km)</p>
                    </div>
                    <div className="destination las-vegas">
                        <span role="img" aria-label="like">👍 200</span>
                        <span role="img" aria-label="heart">❤️</span>
                        <h3>Las Vegas Main Strip</h3>
                        <p>12.9 mi (3.6 km)</p>
                    </div>
                </div>
            </div>

            <div className='recent-search'>
                Recent Search
                <span className='more-font'>
                    more
                </span>
            </div>

            <div className='list'>
                <div className='gray-bar'>
                    <img src={Location} className='location-icon' alt="Location" />
                    <span className='gray-bar-font'>3883 Turquoise Way</span>
                </div>

                <div className='gray-bar-2'>
                    <img src={Airport} className='location-icon' alt="Airport" />
                    <span className='gray-bar-font'>San Francisco Airport (SFO)</span>
                </div>
            </div>

            <div className='gray-line'></div>

            <div className='bottom'>
                <div className='bottom-item'>
                    <img src={Home1} className='bottom-icon' alt="Home" />
                    <div className='bottom-font1'>Home</div>
                </div>

                <div className='bottom-item'>
                    <img src={Plan} className='bottom-icon' alt="Plan" />
                    <div className='bottom-font2'>Plan</div>
                </div>

                <div className='bottom-item'>
                    <img src={Account} className='bottom-icon' alt="Account" />
                    <div className='bottom-font2'>Account</div>
                </div>
            </div>

        </div>
    );
}

export default Home;