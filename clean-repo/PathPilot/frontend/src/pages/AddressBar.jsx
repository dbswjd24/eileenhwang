import React from 'react';
import '../styling/AddressBar.css'; // Make sure to create a corresponding CSS file

const AddressBar = () => {
  return (
    <div className="address-bar">
      <div className="address-details">
        <span className="address">2495 Bancroft Way</span>
        <span className="arrow">→</span>
        <span className="address">UC LA</span>
      </div>
    </div>
  );
};

export default AddressBar;