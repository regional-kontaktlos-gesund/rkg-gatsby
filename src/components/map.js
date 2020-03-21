import React from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
  };

const MapContainer = ({google}) => {
console.log(process.env.GATSBY_MAPS_KEY);

    return (
        <Map
            google={google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 47.444, lng: -122.176}}
        />
    );
}

export default GoogleApiWrapper({
  apiKey: process.env.GATSBY_MAPS_KEY
})(MapContainer);