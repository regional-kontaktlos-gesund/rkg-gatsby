import React, {useState} from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { mock } from '../utils/mock'

const mapStyles = {
    width: '100%',
    height: '100%',
    maxWidth: '1200px',
    margin: '0 auto'
  };

const MapContainer = ({ google }) => {

    const [activeMarker, setActiveMarker] = useState(false)
    const [visible, setVisible] = useState(false)
    const [activeProps, setActiveProps] = useState(false)

    const handleClick =  (props, marker, e) => {
        setActiveMarker(marker)
        setVisible(true)
        setActiveProps(props)
    }

    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        })
    }

    const markers = mock.map((store, i) => (
        <Marker 
            key={i} id={i} 
            name={store.name}
            position={{
                lat: store.latitude,
                lng: store.longitude
            }}
            onClick={handleClick}
        />
    ))    

    

    return (
        <Map
            google={google}
            zoom={6}
            style={mapStyles}
            initialCenter={{ lat: 51.169872, lng: 10.243474}}
        >
        <InfoWindow
          marker={activeMarker}
          visible={visible}>
            <div>
                {activeProps.name}
            </div>
        </InfoWindow>
            {markers}
        </Map>
    );
}

export default GoogleApiWrapper({
  apiKey: process.env.GATSBY_MAPS_KEY
})(MapContainer);