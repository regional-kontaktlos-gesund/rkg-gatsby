import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Order = () => {
    const classes = useStyles();
    const [ amount, setAmount] = useState(1)
    const increase = () => setAmount(amount+1)
    const decrease = () => setAmount(amount-1)

  return (
    <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
            <ListItem>
                <ListItemText 
                    primary="Erdbeeren" 
                    secondary="2,50€ / 500g Schale"
                />
                <IconButton>
                    <AddIcon 
                        aria-label="add" 
                        className={classes.margin} 
                        onClick={increase}
                    />
                </IconButton>
                <IconButton>
                    <RemoveIcon 
                        aria-label="remove" 
                        className={classes.margin} 
                        onClick={decrease}
                    />
                </IconButton>
            </ListItem>

            <ListItem>
                <ListItemText 
                    primary="Spargel, Klasse I" 
                    secondary="50€ / Bund"
                />
                <IconButton>
                    <AddIcon 
                        aria-label="add" 
                        className={classes.margin} 
                        onClick={increase}
                    />
                </IconButton>
                <IconButton>
                    <RemoveIcon 
                        aria-label="remove" 
                        className={classes.margin} 
                        onClick={decrease}
                    />
                </IconButton>
            </ListItem>
            <Divider />
      </List>
    </div>
  );
}

export default Order