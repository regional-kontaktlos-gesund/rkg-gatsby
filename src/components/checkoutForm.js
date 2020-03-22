import React from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import Button from '@material-ui/core/Button';

const CheckoutForm = ({handleStep}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div style={{padding: '20px 20px'}}>
      <CardElement />
      </div>
      <div style={{padding: '20px 20px', display: 'flex', justifyContent:'space-between'}}>
            <Button variant="contained" color="secondary" variant="outlined">Abbrechen</Button>
            {/* <Button type="submit" variant="contained" color="primary">Kaufen</Button> */}
            <Button variant="contained" color="primary" onClick={()=>handleStep(3)}>Kaufen</Button>

     </div>
    </form>
  );
};

export default CheckoutForm