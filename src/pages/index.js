import React, {useEffect, useState} from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MapContainer from '../components/map'
import SwipeableTemporaryDrawer from '../components/drawer'

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
  const classes = useStyles();
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
  useEffect(()=>{
   fetchData()
  },[])

  return(
    <Layout>
      <SEO title="Home" />
          <MapContainer stores={stores}/>
    </Layout>
  )
  }

export default IndexPage
