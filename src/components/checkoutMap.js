import React, {useState} from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
    maxWidth: '1200px',
    margin: '0 auto'
  };

const CheckOutMap = ({ google }) => {

    return (
        <Map
            google={google}
            zoom={6}
            style={mapStyles}
            initialCenter={{ lat: 51.169872, lng: 10.243474}}
        >
        <Marker 
            position={{
                lat: 47.9959,
                lng: 7.85222
            }}
        />
        </Map>
    );
}

export default GoogleApiWrapper({
  apiKey: process.env.GATSBY_MAPS_KEY
})(CheckOutMap);