import React from 'react';
import '../styling/RecentSearch.css'; // Make sure to create a corresponding CSS file

const RecentSearch = () => {
  // Placeholder data - replace with your actual data source
const searches = [
    { id: 1, label: '3883 Turquoise Way', icon: '📍' },
    { id: 2, label: 'San Francisco Airport (SFO)', icon: '✈️' },
    // ... more items
];

  // Function to handle removal of an item
const removeSearch = (id) => {
    // Implement removal logic here
    console.log(`Remove search with id: ${id}`);
};

return (
    <div className="recent-searches">
        <div className="header">
            <h2>Recent Search</h2>
            <button className="more-btn">more</button>
        </div>
        <div className="search-list">
            {searches.map((search) => (
                <div key={search.id} className="search-item">
                    <span role="img" aria-label="icon">{search.icon}</span>
                    <span className="label">{search.label}</span>
                    <button onClick={() => removeSearch(search.id)} className="remove-btn">✖️</button>
                </div>
            ))}
        </div>
    </div>
);
};

export default RecentSearch;