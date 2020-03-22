import React, {useState} from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '300px',
    margin: '0 auto',
    padding: '20px 0'
  };

const CheckOutMap = ({ google }) => {

    return (
        <React.Fragment>
        <Map
            google={google}
            zoom={8}
            style={mapStyles}
            className="foo"
            initialCenter={{ 
                lat: 47.9959,
                lng: 7.85222
            }}
        >
        <Marker 
            position={{
                lat: 47.9959,
                lng: 7.85222
            }}
            disableDefaultUI={true}
        />
        </Map>
        </React.Fragment>
    );
}

export default GoogleApiWrapper({
  apiKey: process.env.GATSBY_MAPS_KEY
})(CheckOutMap);