import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styling/TripPreferences.css';
import Target from '../image/route-end.png';
import Departrue from '../image/route-start.png';
import { useNavigate } from 'react-router-dom';




const TripPreferences = () => {
  const [startDate, setStartDate] = useState(new Date()); 
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [expanded, setExpanded] = useState(false);

  let navigate = useNavigate();

    const handleMingcuteBarClick = () => {
        navigate("/mapinterface2");
  };
  
  const handleStartTimeClick = () => {
    setShowStartDatePicker(!showStartDatePicker);
    setExpanded(!showStartDatePicker); // start DatePicker에 따라 expanded도 변경
  };

  const handleEndTimeClick = () => {
    setShowEndDatePicker(!showEndDatePicker);
    // end DatePicker 클릭 시에는 expanded 상태 변경이 필요하지 않을 수 있음
  };

  const tripPreferencesStyle = {
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    height: expanded ? '605px' : '329px', // Change the height conditionally
    transition: 'height 0.3s ease-in-out', // Add smooth transition
  };

  return (
    <div className="trip-preferences" style={tripPreferencesStyle}>
      <div className='trip-preferences-font'>Trip Preferences</div>
      <div>
        <div className='gary-line'>
        </div><div className='black-line'></div>
      </div>
      <div className="preference-item">
        Tell us your preferences to personalize your ideal road trip route!
      </div>
      <div className='start'>
        <img src={Departrue} className='route-symbol' alt="Start" />
        <div className='margin-left'> Departure Time</div>
        <div className='start-time'>
          <input
            type="text"
            value={startDate.toLocaleString()}
            readOnly
            onClick={handleStartTimeClick}
          />
          {showStartDatePicker && (
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              inline
              className="custom-datepicker"
            />
          )}
        </div>
      </div>
      <div className='end'>
        <img src={Target} className='route-symbol' alt="End" />
        <div className='margin-left'>Target Arrival Time</div>
        <div className='end-time'>
          <input
            type="text"
            value={endDate.toLocaleString()}
            readOnly
            onClick={handleEndTimeClick} // handleEndTimeClick으로 변경
          />
          {showEndDatePicker && ( // showEndDatePicker를 사용
            <DatePicker
              selected={endDate}
              onChange={() => { }} // 아무 작업도 하지 않음
              inline
              className="disabled-datepicker"
            />
          )}
        </div>
      </div>

      <div className='nextbutton' onClick={handleMingcuteBarClick}>Next</div>
    </div>
  );
};

export default TripPreferences;