import "../styling/Search.css";
import LeftArrow from '../image/left-arrow.png';
import Material from '../image/material-symbol.png';
import Home from '../image/Home.png';
import Pointer from '../image/Pointer.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Search() {
    const [searchText, setSearchText] = useState('Where to?');
    const [showBoxes, setShowBoxes] = useState([true, true, true, true]); 
    const textStyle = searchText === 'UCLA' ? { fontFamily: 'search-font1', color: 'black'} : null;
    
    const navigate = useNavigate();

    const handleMingcuteBarClick = () => {
        navigate("/MapInterface");
  };

    const handleClickBoxFour = () => {
        setSearchText('UCLA');
        setShowBoxes([false, false, true, true]); 

        handleMingcuteBarClick();
    };

    return (
        <div className='main-body'>

            <img src={LeftArrow} className='left-arrow' alt="Arrow" />
            <div className='search-title'>Set Destination</div>

            <div className='circle-one'></div>
            <div className='search-bar-one'>
                <div className='search-font1'>2495 Bancroft Way</div>
            </div>
            <div className='orange-bar'></div>
            <div className='circle-two'></div>
            <div className='search-bar-two'>
                <div className='search-font2' style={textStyle}>{searchText}</div>
                <img src={Material} className='material-symbol' alt="Arrow" />
            </div>
            {showBoxes[0] && (
                <div className='box-one'>
                    <img src={Home} className='home-icon' alt="Home" />
                    <div className='list-box'>
                        <div className='first-font'>Home</div>
                        <div className='second-font'>3883 Turquoise Way, Oakland, 94609</div>
                    </div>
                </div>
            )}
            {showBoxes[1] && (
                <div className='box-two'>
                    <img src={Pointer} className='pointer-icon' alt='Pointer' />
                    <div className='list-box'>
                        <div className='first-font'>ASUC Student Union: Martin Luter King Jr. Buil</div>
                        <div className='second-font'>308 Westwood Plaza, Los Angeles, CA 90095</div>
                    </div>
                </div>
            )}
            {showBoxes[2] && (
                <div className='box-three'>
                    <img src={Pointer} className='pointer-icon' alt='Pointer' />
                    <div className='list-box'>
                        <div className='first-font'>UCLA Student Union Event Services</div>
                        <div className='second-font'>308 Westwood Plaza, Los Angeles, CA 90095</div>
                    </div>
                </div>
            )}
            {showBoxes[3] && (
                <div className='box-four' onClick={handleClickBoxFour}>
                    <img src={Pointer} className='pointer-icon' alt='Pointer' />
                    <div className='list-box'>
                        <div className='first-font'>UCLA</div>
                        <div className='second-font'>110 Westwood Plaza, Los Angeles, CA 90095</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;