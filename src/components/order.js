import React, { useState, useEffect } from 'react';
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
import Button from '@material-ui/core/Button';
import { products } from '../utils/mock'
import { formatPrice } from '../utils'
import ListSubheader from '@material-ui/core/ListSubheader';
import CheckOutMap from './checkoutMap'
import Paper from '@material-ui/core/Paper';
import CheckoutForm from './checkoutForm'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');


const Order = ({handleOpen}) => {
    const classes = useStyles();
    const [order, setOrder] = useState([])
    const [total, setTotal] = useState(false)
    const [totalNames, setTotalNames] = useState(false)
    const [step, setStep] = useState(1)

    const increase = (i) => {

        setOrder({
            ...order, [i]: {
                id: i,
                amount: order[i] ? order[i].amount + 1 : 1,
            }
        })

    }
    const decrease = (i) => {
        if (products[i] && order[i] && order[i].amount > 0) {
            setOrder({
                ...order, [i]: {
                    id: i,
                    amount: order[i].amount - 1
                }
            })
        }
    }

    const handleStep = (step) => {
        setStep(step)
    }

    useEffect(() => {
        console.log(order);
        let newTotal = []
        let newTotalNames = []

        for (var item in order) {
            let i = item.id
            let amountPrice = products && products[item] && products[item].price * order[item].amount;
            let name = {
                name: products[item].name,
                amount: order[item].amount,
                price: amountPrice
            }
            if (order[item].amount > 0) {
                newTotalNames = [...newTotalNames, name]
            }
            newTotal.push(amountPrice)
        }
        setTotal(newTotal.reduce((a, b) => a + b, 0))
        setTotalNames(newTotalNames)
    }, [order])

    return (
        <div className={classes.root}>
            {step === 1 &&
            <List component="nav" aria-label="main mailbox folders">
                {products.map((product, i) =>
                    <React.Fragment key={product._id}>
                        <ListItem>
                            <ListItemText
                                primary={product.name}
                                secondary={formatPrice({ centAmount: product.price }) + ' / ' + product.unit}
                            />
                            <IconButton onClick={() => increase(i)}>
                                <AddIcon
                                    aria-label="add"
                                    className={classes.margin}
                                />
                            </IconButton>
                            <IconButton onClick={() => decrease(i)}>
                                <RemoveIcon
                                    aria-label="remove"
                                    className={classes.margin}
                                />
                            </IconButton>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                )}
            </List>
            }

            {step === 1 &&
            <Paper elevation={4}>
                <List style={{ padding: '0 20px' }} subheader={<ListSubheader>EINKAUF</ListSubheader>} >
                    <ListItem>
                        <ListItemText>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>{totalNames && totalNames.map(name => name.amount+'X '+name.name+' ')}</div>
                                <div>{formatPrice({ centAmount: total })}</div>
                            </div>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <div style={{padding: '20px 0', display: 'flex', justifyContent:'space-between'}}>
                        <Button variant="contained" color="secondary" variant="outlined" onClick={handleOpen}>Abbrechen</Button>
                        <Button variant="contained" color="primary" onClick={() => setStep(2)} disabled={totalNames.length ? false : true}>Bezahlen</Button>
                    </div>
                </List>
            </Paper>
            }

            {(step === 2 || step === 3)  &&
            <Paper elevation={4}>
                <List style={{ padding: '0 20px' }} subheader={<ListSubheader>ABSCHLUSS</ListSubheader>} >
                    {totalNames && totalNames.map(name =>(
                        <ListItem>
                            <ListItemText>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>{name.amount+'X '+name.name+' '}</div>
                                    <div>{formatPrice({ centAmount: name.price })}</div>
                                </div>
                            </ListItemText>
                        </ListItem>
                    ))}
                    <Divider />
                    <ListItem>
                        <ListItemText>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div><b>Gesamt</b></div>
                            <div>{formatPrice({ centAmount: total })}</div>
                        </div>
                        </ListItemText>
                    </ListItem>
                    {step == 2 &&
                    <div>
                                          <Elements stripe={stripePromise}>

                                          <CheckoutForm handleStep={handleStep}/>
                                    </Elements>
           
                        </div>
                    }
                    {step === 3 && 
                    <div>
                    <div style={{height: '300px', position:'relative'}}>
                        <CheckOutMap />
                    </div>
                    <div>Schmidt</div>
                    <div>Bürgerwiese 4, 01069 Dresden</div>
                    <div style={{padding: '20px 0', display: 'flex', justifyContent:'space-between'}}>
                            <Button variant="contained" color="secondary" variant="outlined" >Navigation</Button>
                            <Button variant="contained" color="primary" onClick={() => setStep(0)}>Angekommen</Button>
                        </div>
                    </div>
                    }
                </List>
            </Paper>
            }



        </div>
    );
}

export default Order