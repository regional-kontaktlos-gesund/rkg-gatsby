import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';

import Order from './order'

const Store = (props) => {    

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        console.log("Foo");
        
        setOpen(!open)
    }
    return(
        <React.Fragment>
            <div
            style={{
                height: '100%',
                minHeight: '80vh',
                width: '100%',
                display:'flex',
                background: 'url(https://images.unsplash.com/photo-1543528176-61b239494933?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2253&q=80)',
            }}
            >
                <Typography variant="h1" component="h3" color="textPrimary">
                Huber Hof
                </Typography>
            </div>
            <div style={{width:'100%', display:'flex', justifyContent: 'center', padding:'20px'}}>
            <Button onClick={handleOpen} variant="contained" color="primary">Bestellen</Button>
            </div>
            <Drawer 
                anchor="bottom"
                open={open} 
                // onClose={toggleDrawer(anchor, false)
            >
                <Order handleOpen={handleOpen}/>  
            </Drawer>
        </React.Fragment>
    )
}
export default Store