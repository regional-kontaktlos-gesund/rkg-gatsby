import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby'
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
import { formatPrice } from '../utils'
import ListSubheader from '@material-ui/core/ListSubheader';
import CheckOutMap from './checkoutMap'
import Paper from '@material-ui/core/Paper';
import CheckoutForm from './checkoutForm'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import QRCode from 'qrcode.react'
import RoomIcon from '@material-ui/icons/Room';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Layout from '../components/layout'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'absolute',
        bottom: '0',
        height: '100%'
    },
}));

const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');


const Order = ({ handleOpen, store }) => {
    const { products } = store
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
    }, [order]);

    useEffect(() => {
        if (step === 4) {
            setTimeout(function () { setStep(5) }, 3000);
        }
    }, [step])


    let orderSring = totalNames && totalNames.map(name => name.amount + 'x ' + name.name)
    let title = ''
    
    switch(step){
        case 1:
            title = store.name
            break;
        case 2:
            title = 'Einkauf'
            break;
        case 3:
            title = 'Einkauf'
            break;

        case 4:
            title = 'Abholung'
            break;
        default:
            title = ''
    }


    return (
        <Layout title={title}>
        <div className={classes.root}>
            <div>
                {step < 3 &&
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <Link to="/">
                            <IconButton>
                                <CloseIcon
                                    aria-label="close"
                                    className={classes.margin}
                                />
                            </IconButton>
                        </Link>
                        <a target="_blank" href={"https://maps.google.com/?q=" + store.latitude + "," + store.longitude}>
                            <IconButton>
                                <RoomIcon
                                    aria-label="directions"
                                    className={classes.margin}
                                />
                            </IconButton>
                        </a>
                    </div>
                }
            </div>

            {step === 1 &&
                <List component="nav" style={{ paddingBottom: '200px' }} aria-label="main mailbox folders">
                    {products.map((product, i) =>
                        <React.Fragment key={product._id}>
                            <ListItem button>
                                <ListItemText
                                    primary={product.name}
                                    secondary={formatPrice({ centAmount: product.price }) + ' / ' + product.unit}
                                />
                                <IconButton onClick={() => decrease(i)}>
                                    <RemoveIcon
                                        aria-label="remove"
                                        className={classes.margin}
                                    />
                                </IconButton>
                                <IconButton onClick={() => increase(i)}>
                                    <AddIcon
                                        aria-label="add"
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
                <Paper
                    elevation={3}
                    style={{
                        position: 'fixed',
                        bottom: '0',
                        width: '100%',
                        background: '#ffffff'

                    }}
                >

                    <List style={{ padding: '0 20px' }} subheader={<ListSubheader>EINKAUF</ListSubheader>} >
                        <ListItem>
                            <ListItemText>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>{orderSring && orderSring.join(', ')}</div>
                                    <div>{formatPrice({ centAmount: total })}</div>
                                </div>
                            </ListItemText>
                        </ListItem>
                        <Divider />
                        <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'space-between' }}>
                            <Link to="/"><Button variant="contained" color="secondary" variant="outlined" variant="outlined">Abbrechen</Button></Link>
                            <Button variant="contained" color="primary" onClick={() => setStep(2)} disabled={totalNames.length ? false : true}>Bezahlen</Button>
                        </div>
                    </List>
                </Paper>
            }

            {(step != 1) &&
                <Paper>
                    <List style={{ padding: '60px 20px 200px 20px' }} >
                        {step !== 5 && totalNames && totalNames.map(name => (
                            <ListItem>
                                <ListItemText>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>{name.amount + 'X ' + name.name + ' '}</div>
                                        <div>{formatPrice({ centAmount: name.price })}</div>
                                    </div>
                                </ListItemText>
                            </ListItem>
                        ))}

                        <Divider />

                        <ListItem>
                            <ListItemText>
                                {step !== 5 &&
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div><b>Gesamt</b></div>
                                        <div>{formatPrice({ centAmount: total })}</div>
                                    </div>
                                }

                                <div>
                                    {step == 2 && <Typography variant="subtitle2"><br />Sie erhalten einen Code zur Abholung nach dem Abschluss der Bestellung. Wir freuen uns auf Sie.</Typography>}
                                    {step == 3 && <Typography variant="subtitle2"><br />Ihre Bestellung ist in Kürze zur Abholung bereit. Kommen Sie vorbei.</Typography>}
                                    {step == 4 && <Typography variant="subtitle2"><br />Bitte Zeigen Sie diesen Code vor, damit Ihre Bestellung gefunden werden kann.</Typography>}
                                    {step == 5 && <Typography variant="subtitle2"><br />Vielen Dank, dass Sie bei uns eingekauft haben. Wir freuen uns Sie bald wieder zu sehen</Typography>}
                                </div>
                            </ListItemText>
                        </ListItem>
                        {step == 2 &&
                            <Paper
                                elevation={3}
                                style={{
                                    position: 'fixed',
                                    bottom: '0',
                                    width: '100%',
                                    background: '#ffffff',
                                    left: 0,
                                }}
                            >
                                <Elements stripe={stripePromise}>

                                    <CheckoutForm handleStep={handleStep} />
                                </Elements>

                            </Paper>
                        }
                        {step === 3 &&
                            <div>
                                <div style={{ height: '300px', position: 'relative' }}>
                                    <CheckOutMap />
                                </div>
                                <Typography variant="h5">{store.name}</Typography>
                                {/* <Typography variant="body1">{store.address}</Typography> */}

                                <Paper
                                    elevation={3}
                                    style={{
                                        position: 'fixed',
                                        bottom: '0',
                                        width: '100%',
                                        background: '#ffffff',
                                        left: 0,
                                        padding: '20px'
                                    }}
                                >
                                 
                                    <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'space-between' }}>
                                        <a href={"https://maps.google.com/?q=" + store.latitude + "," + store.longitude}><Button variant="contained" color="secondary">Navigation</Button></a>
                                        <Button variant="contained" color="primary" onClick={() => setStep(4)}>Angekommen</Button>
                                    </div>
                                </Paper>
                            </div>
                        }
                        {step === 4 &&
                            <div style={{ paddingBottom: '20px' }}>
                                <div style={{ background: '#9E9E9E', borderRadius: '5px', padding: "40px", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <div style={{ textAlign: 'center', color: '#ffffff', paddingBottom: '20px' }}><Typography color="inherit" variant="h4">spargel-auflauf</Typography></div>
                                    <QRCode value="http://facebook.github.io/react/" size={200} />
                                </div>
                                <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="contained" color="primary" disabled={true} >Warten</Button>
                                </div>
                            </div>
                        }
                        {step === 5 &&
                            <div style={{ paddingBottom: '20px' }}>
                                <div style={{ textAlign: 'center', color: '#ffffff', paddingBottom: '20px' }}>
                                    <Typography color="inherit" variant="h4">spargel-auflauf</Typography>
                                    <CheckCircleIcon
                                        aria-label="check"
                                        className={classes.margin}
                                    />
                                </div>
                                <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'flex-end' }}>
                                    <Link to="/">
                                        <Button variant="contained" color="primary" onClick={() => setStep(4)}>Fertig</Button>
                                    </Link>
                                </div>
                            </div>

                        }
                    </List>
                </Paper>
            }
        </div>
              </Layout>

    );
}

export default Order