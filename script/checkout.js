import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCarts, loadCartFetch } from '../data/cart.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

/*
async function loadPage() {
  try {
    // throw 'error1'
    await loadProductsFetch();
  
    const value = await new Promise((resolve, reject) => {
      // throw 'error2'
      loadCartFetch(() => {
        //reject('error3')
        resolve('whatever value');
      });
    });
  } catch (error) {
    console.log('There is an unexpected error. Please try again later')
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();
*/

//USING PROMISE.ALL() + exercise 18i

await Promise.all([
  loadProductsFetch(), // It already returned a promise

  loadCartFetch(),
]).then((value) => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});



// USING PROMISE
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


// USING CALLBACK
/*
loadProducts(() => {
  loadCarts(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
