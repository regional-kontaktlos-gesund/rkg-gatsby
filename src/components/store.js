import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import MediaCard from './card'
import Order from './order'
import fetchData from '../utils'
const Store = (props) => {    
    const [store, setStore] = useState(false)
    let endpoint = props.uri.substring(1);
    
    useEffect(()=> {
        const fetchData = async () => {
            fetch('https://rkg-api-602.herokuapp.com/api/'+endpoint)
            .then((response) => response.json())
            .then((data) => {
                setStore(data)
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        }
        fetchData()
    }, [])
    return(
        <React.Fragment>
               {store && <Order store={store} />   }
        </React.Fragment>
    )
}
export default Store