import React, { useState } from 'react';
import { PayPalButtons, FUNDING } from '@paypal/react-paypal-js';
import './paypal.css'


const PaypalButton = () => {

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "0.10"
          },
        },
      ],
    });
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      console.log(details)
      alert('Transaction completed by ' + details.payer.name.given_name);
    });
  }

  const onCancel = (data, actions) => {
    
  }

  const onError = (data, actions) => {

  }

  return (
    <div>
      <PayPalButtons
        fundingSource={FUNDING.PAYPAL}
        style={{
          layout:  'vertical',
          color:   'gold',
          shape:   'pill',
          label:   'paypal',
          branding: true
        }}
        createOrder={onCreateOrder}
        onApprove={onApprove}
        onCancel={onCancel}
        onError={onError}/>
    </div>
  );
};

export default PaypalButton;

