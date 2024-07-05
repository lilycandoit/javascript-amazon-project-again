import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption, getDeliveryDate } from '../../data/deliveryOptions.js';
import { renderPaymentSummary} from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

 export function renderOrderSummary() {
  let html = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingItem = getProduct(productId);

    // find the delivery option from the deliveryOptionId
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = getDeliveryDate(deliveryOption);

    html += `
      <div class="cart-item-container js-cart-item-container-${
        matchingItem.id
      }">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>
  
        <div class="cart-item-details-grid">
          <img class="product-image"
            src=${matchingItem.image}>
  
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingItem.name}
            </div>
            <div class="product-price">
              ${matchingItem.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${
                  matchingItem.id
                }">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id=${
                matchingItem.id
              }>
                Update
              </span>
              <input class="quantity-input js-quantity-input js-quantity-input-${
                matchingItem.id
              }">
              <span class="save-quantity-link primary-link js-save-link" data-product-id=${
                matchingItem.id
              }>Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${
                matchingItem.id
              }>
                Delete
              </span>
            </div>
          </div>
  
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHtml(matchingItem, cartItem)}
          </div>
        </div>
      </div>
    `;
  });
  document.querySelector('.order-summary').innerHTML = html;

  function deliveryOptionsHtml(matchingItem, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = getDeliveryDate(deliveryOption);

      const priceString =
        deliveryOption.priceCents === 0
          ? 'FREE'
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option" data-product-id=${
        matchingItem.id
      } data-delivery-option-id=${deliveryOption.id}>
        <input type="radio" ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
    });

    return html;
  }

  // update totalCartItems in checkout header
  /*
  function totalCartItems() {
    const totalItems = updateCartQuantity();

    document.querySelector('.js-total-items').innerHTML = `${totalItems} items`;
  }
  totalCartItems();
  */

  // handle delete product
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      // to update the cart items after deleting
      removeFromCart(productId);

      // to remove the html of that item, we need to know which item by adding specific class on that item, attached with productId.
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      //then, use remove() method to remove that element out of the frontend page.
      container.remove();

      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  // handle update products
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.classList.add('is-editing-quantity');

      // pressing Enter when editing items
      const inputEl = document.querySelector(`.js-quantity-input-${productId}`);

      container.addEventListener('keydown', (event) => {
        if (event.target === inputEl && event.key === 'Enter') {
          displayNewQuantity(productId);

          renderCheckoutHeader();
          renderPaymentSummary();
        }
      });

      renderCheckoutHeader();
      renderPaymentSummary();
    });
  });

  // handle when saving the items edited
  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      displayNewQuantity(productId);

      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  // to display the new quantity for each item + total quantity after editing
  function displayNewQuantity(productId) {
    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );

    const newQuantity = Number(quantityInput.value);

    if (newQuantity < 0 || newQuantity > 1000) {
      alert('The input must be less more than 0 and less then 1000');
    } else {
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');

      document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
        newQuantity;

      updateQuantity(productId, newQuantity); // to update the new quantity of that cartItem (matching item) =>> update the new items array in cart.
    }
  }

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);// it will update the cart with the chosen delivery option

      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
