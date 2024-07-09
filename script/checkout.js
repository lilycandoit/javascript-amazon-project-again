import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProducts } from '../data/products.js';
import { loadCarts } from '../data/cart.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1'); // wait for loading products from backend
    });
  }),

  new Promise((resolve) => {
    loadCarts(() => {
      resolve();
    });
  })
]).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1'); // wait for loading products from backend
  });
})
  .then((value) => {
    // then move to next step
    console.log(value);
    return new Promise((resolve) => {
      loadCarts(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
  */

/*
loadProducts(() => {
  loadCarts(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
