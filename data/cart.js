import { deliveryOptions } from "./deliveryOptions.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId){
  let matchingItem;
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );

    const quantitySelected = Number(quantitySelector.value);

    if (matchingItem) {
      matchingItem.quantity += quantitySelected;
    } else {
      cart.push({
        productId: productId,
        quantity: quantitySelected,
        deliveryOptionId: '3'
      });
    }

    saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem)=>{
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    } 
  })
  console.log(newCart);
  cart = newCart;
}

export function updateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity){
  let matchingItem;
  cart.forEach(cartItem => {
    if (cartItem.productId === productId){
      matchingItem = cartItem;
    }
  })

  matchingItem.quantity = newQuantity;
  // it looks for the matching items in the 'cart' array, then update the quantity of that item to the newQuantity. 
  // then save the updated cart

  saveToStorage();
}