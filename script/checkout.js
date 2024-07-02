import { cart, removeFromCart, updateCartQuantity, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let html = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  // from productId => look for product details in products list
  let matchingItem;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingItem = product;
    }
  });

  html += `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src=${matchingItem.image}>

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            ${formatCurrency(matchingItem.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id=${
              matchingItem.id
            }>
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingItem.id}">
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
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});
document.querySelector('.order-summary').innerHTML = html;

// update totalCartItems in checkout header
function totalCartItems() {
  const totalItems = updateCartQuantity();

  document.querySelector('.js-total-items').innerHTML = `${totalItems} items`;
}
totalCartItems();

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
    totalCartItems();
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

   
  });
});

// handle when saving the items edited
 document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove('is-editing-quantity');

    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`);

    const newQuantity = Number(quantityInput.value);

    if (newQuantity < 0 || newQuantity > 1000){
      alert('The input must be less more than 0 and less then 1000')
    } else {
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
      
      updateQuantity(productId, newQuantity);// to update the new quantity of that cartItem (matching item) =>> update the new items array in cart. 
  
      totalCartItems();
    }

  });
});
