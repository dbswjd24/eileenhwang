import React from 'react';
import '../styling/MapInterface.css'; // Make sure to create a corresponding CSS file
import AddressBar from './AddressBar.jsx';
import BackArrow from '../image/back-arrow.png';
import TripPreferences from './TripPreferences';



const MapInterface = () => {
  return (
    <div className="map-interface">
      <AddressBar />
      <div className='back-arrowbutton'>
          <img src={BackArrow} className='back-arrow' alt='backarrow'/>
      </div>
      <div className="map-view">
      </div>
      <div>
        <TripPreferences/>
      </div>
      
    </div>
  );
};

export default MapInterface;