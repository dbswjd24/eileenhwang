import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styling/TripPreferences.css';
import LeftArrow from '../image/left-arrow.png';
import { useNavigate } from 'react-router-dom';


const TripPreferences2 = () => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [userInput, setUserInput] = useState(''); // 사용자 입력을 위한 상태

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value); // 사용자 입력 변경 처리
  };

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  
  let navigate = useNavigate();

    const handleMingcuteBarClick = () => {
        navigate("/mapinterfaces3");
  };

  return (
    <div className="trip-preferences" >
      <div className='trip-preferences-font'>Trip Preferences</div>
      <div>
        <div className='gary-line'>
        </div><div className='black-line2'></div>
      </div>
      <div className="preference-item2">
        How often do you want to stretch and breathe freash air?
      </div>
      <div className='main-two'>
        <div className='topleft-menu'>
          <div
            className={selectedOption === 'Mile' ? 'topleft-orange' : 'topleft-gray'}
            onClick={() => handleOptionClick('Mile')}
          >
            Mile
          </div>
          <div className='emptyspace'></div>
          <div
            className={selectedOption === 'Hour' ? 'topleft-orange' : 'topleft-gray'}
            onClick={() => handleOptionClick('Hour')}
          >
            Hour
          </div>
          <div className='emptyspace'></div>
          <div
            className={selectedOption === 'Minute' ? 'topleft-orange' : 'topleft-gray'}
            onClick={() => handleOptionClick('Minute')}
          >
            Minute
          </div>
        </div>
        <div className='every-box'>
            Every <input 
            type="text" 
            value={userInput}
            onChange={handleUserInputChange}
            className="input-field"
          />  
          {selectedOption}
        </div>
      </div>
      <div className='next-button2' onClick={handleMingcuteBarClick}>Next</div>
      <div className='back-button'>
        
        <img src={LeftArrow} className='left-arrow2' alt='left-arrow'/>
          <div className='back-font'>Back</div>
        </div>
    </div>
  );
};

export default TripPreferences2;