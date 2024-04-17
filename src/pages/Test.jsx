import React, { useState } from 'react';

const FamousPlacesMap = () => {
    const [mapSrc, setMapSrc] = useState(
        "https://maps.google.com/maps?q=luckyland%20resort&t=&z=13&ie=UTF8&iwloc=&output=embed"
    );

    const handleMapChange = (place) => {
        // Modify the map source based on the selected place
        setMapSrc(`https://maps.google.com/maps?q=${encodeURIComponent(place)}&t=&z=13&ie=UTF8&iwloc=&output=embed`);

        // Scroll to the map section with smooth animation
        const mapSection = document.getElementById('map-section');
        mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div>
            <div className="places-list">
                <h2>Famous Places</h2>
                <ul>
                    <li>
                        <button onClick={() => handleMapChange('SM Sorsogon')}>SM Sorsogon</button>
                    </li>
                    <li>
                        <button onClick={() => handleMapChange('Sorsogon Rompeolas')}>Sorsogon Rompeolas</button>
                    </li>
                    <li>
                        <button onClick={() => handleMapChange('Sorsogon Capitol Park')}>Sorsogon Capitol Park</button>
                    </li>
                </ul>
            </div>
            <div id="map-section" className="mapouter">
                <div className="gmap_canvas">
                    <iframe
                        width="600"
                        height="500"
                        id="gmap_canvas"
                        src={mapSrc}
                    ></iframe>
                    <a href="https://123movies-i.net"></a>
                    <br />
                    <style>
                        {`.mapouter{position:relative;text-align:right;height:500px;width:600px;}`}
                    </style>
                    <a href="https://www.embedgooglemap.net"></a>
                    <style>
                        {`.gmap_canvas{overflow:hidden;background:none!important;height:500px;width:600px;}`}
                    </style>
                </div>
            </div>
        </div>
    );
};

export default FamousPlacesMap;
