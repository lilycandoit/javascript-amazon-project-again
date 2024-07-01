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