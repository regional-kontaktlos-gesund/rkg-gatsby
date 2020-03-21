import React from "react"
import { Link } from "gatsby"
import Store from '../components/store'
import { Router } from "@reach/router"
import Layout from "../components/layout"

const StoresPage = (props) => {
  return(
    <Layout>
      <Router basepath="/stores">
        <Store path={props['*']} />
      </Router>
    </Layout>
  )
  }

export default StoresPage
