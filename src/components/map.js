import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const mapStyles = {
    width: '100%',
    // height: '50vh',
    margin: '0 auto'
};

const MapContainer = ({ google, stores, activeStore }) => {

    const [activeMarker, setActiveMarker] = useState(null)
    const [visible, setVisible] = useState(false)
    const [activeProps, setActiveProps] = useState(false)

    const handleClick = (props, marker, e) => {
        setActiveProps(props)
        setActiveMarker(marker)
        setVisible(true)
    }


    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        })
    }
    const onMapClicked = (props) => {
        if (visible) {
            setVisible(false)
            setActiveMarker(null)
        }
      };

    const markers = stores && stores.map((store, i) => (
        <Marker
            key={store._id}
            id={store._id}
            _id={store._id}
            name={store.name}
            openingHours={store.openingHours}
            products={store.products}

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
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 52.499942, lng: 10.521213 }}
            onClick={onMapClicked}
            disableDefaultUI={true}
        >
            <InfoWindow
                marker={activeMarker}
                visible={visible}
            >
             

                <Card>
                        <CardMedia
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                        {activeProps.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {activeProps && activeProps.products && activeProps.products.map(product => 
                                product.name
                            )}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <div>
                                <div>
                                    <b>Öffnungszeiten</b>
                                </div>
                                <div>
                                    {activeProps && activeProps.openingHours && activeProps.openingHours.map(time => 
                                        <span>{time.day}: von {time.from} bis {time.to}<br/></span>
                                    )}
                                </div>
                            </div>
                        </Typography>
                        </CardContent>
                    <CardActions>
                        <Link to={'/stores/'+activeProps._id} >
                            <Button size="small" color="primary">
                                Zu den Waren
                            </Button>
                        </Link>
                    </CardActions>
                    </Card>
            </InfoWindow>
            {markers}
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.GATSBY_MAPS_KEY
})(MapContainer);