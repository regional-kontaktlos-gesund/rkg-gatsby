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
import { useFetch  } from '../utils/hooks'
const useStyles = makeStyles(theme => ({

  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));



const IndexPage = ({location}) => {
  // const [stores, setStores] = useState(false)
  const [activeStore, setActiveStore] = useState(false)
  const classes = useStyles();

  const [stores] = useFetch("https://rkg-api-602.herokuapp.com/api/stores");

  return (
    <Layout>
      <SEO title="Erntefrisch" />
      <div>
        <div style={{ height: '50vh', overflow: 'hidden' }}>
          <MapContainer stores={stores} activeStore={activeStore} />
        </div>
        {stores &&  
          <div style={{height: '50vh', width: '100%', position: 'fixed', zIndex: '10', bottom: '0', left: '0', overflow: 'auto', background: '#ffffff'}} >
            <List component="nav" aria-label="stores">
              {stores.map(store =>
                  <ListItem button  key={store._id}>
                    <Link to={'/stores/' + store._id} style={{ width: '100%' }}>

                      <ListItemText
                        primary={store.name}
                        secondary={store.products.map(product => product.name + ', ')}
                      />
                      <Divider />
                    </Link>
                  </ListItem>
              )}
            </List>
          </div>
        }
      </div>
    </Layout>
  )
}

export default IndexPage
