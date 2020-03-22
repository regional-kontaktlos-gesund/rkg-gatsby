import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MapContainer from '../components/map'
import SwipeableTemporaryDrawer from '../components/drawer'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));



const IndexPage = () => {
  const [stores, setStores] = useState([])
  const [activeStore, setActiveStore] = useState(false)
  const classes = useStyles();

  const handleStore = (store) => {
    setActiveStore(store)
  }
  useEffect(() => {
    const fetchData = () => {
      fetch('https://rkg-api-602.herokuapp.com/api/stores')
        .then((response) => response.json())
        .then((data) => {
          setStores(data)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    fetchData()
  }, [])
  
  return (
    <Layout>
      <SEO title="Home" />
      <div >
        <div style={{height:'50vh'}}><MapContainer stores={stores} activeStore={activeStore} /></div>
        <div className={classes.root}>
        <List component="nav" aria-label="stores">

        {stores.map(store =>
           <React.Fragment key={store._id}>
                         <Link to={'/stores/'+store._id} >

            <ListItem button>

              <ListItemText
                primary={store.name}
                secondary={store.products.map(product => product.name+', ')}
              />
            </ListItem>
            </Link>


          <Divider />
          </React.Fragment>
        )}
        </List>
      </div>
      </div>
    </Layout>
  )
}

export default IndexPage
