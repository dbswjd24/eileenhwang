import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../styling/TripPreferences.css';

const TripPreferences = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [breakFrequency, setBreakFrequency] = useState(60); // new state for break frequency
  const [breakUnit, setBreakUnit] = useState('miles'); // new state for unit of the break frequency

  const handleTimeClick = () => {
    setShowDatePicker(!showDatePicker);
    setExpanded(!expanded); // Toggle the expanded state
  };

  const handleFrequencyChange = (e) => {
    setBreakFrequency(e.target.value);
  };

  const handleUnitChange = (unit) => {
    setBreakUnit(unit);
  };

  const tripPreferencesStyle = {
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    transition: 'height 0.3s ease-in-out', // Add smooth transition
  };

  const unitButtonStyle = {
    margin: '0 5px',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    background: breakUnit === 'miles' ? '#FFA07A' : '#f0f0f0', // Conditional background color
    color: breakUnit === 'miles' ? '#fff' : '#000',
    fontWeight: 'bold',
  };

  return (
    <div className="trip-preferences" style={tripPreferencesStyle}>
      {/* ... other preference items */}
      
      {/* Stretch and Breathe Preference */}
      <div className="preference-item">
        <label>How often do you want to stretch and breathe fresh air?</label>
        <div>
          <button style={unitButtonStyle} onClick={() => handleUnitChange('miles')}>Mile</button>
          <button style={{ ...unitButtonStyle, background: breakUnit === 'hours' ? '#FFA07A' : '#f0f0f0' }} onClick={() => handleUnitChange('hours')}>Hour</button>
          <button style={{ ...unitButtonStyle, background: breakUnit === 'minutes' ? '#FFA07A' : '#f0f0f0' }} onClick={() => handleUnitChange('minutes')}>Minute</button>
        </div>
        <div>
          <label>Every</label>
          <input type="number" value={breakFrequency} onChange={handleFrequencyChange} />
          <label>{breakUnit}</label>
        </div>
      </div>

      {/* Add more preference items here as needed */}
      <button onClick={() => setShowDatePicker(false)}>Next</button>
    </div>
  );
};

export default TripPreferences;