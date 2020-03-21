import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

import Order from './order'

const Store = (props) => {    

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open)
    return(
        <React.Fragment>
            <p>Bauer Hubers toller Spargel</p>
            <img src="https://placekitten.com/500/500" />
            <Button onClick={handleOpen} variant="contained">Default</Button>
            <Drawer 
                anchor="bottom"
                open={open} 
                // onClose={toggleDrawer(anchor, false)
            >
                <Order/>  
            </Drawer>
        </React.Fragment>
    )
}
export default Store