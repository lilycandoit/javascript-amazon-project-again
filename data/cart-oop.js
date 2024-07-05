
// use function to generate object =>> avoid copy - paste the code

function Cart(localStorageKey){
  const cart = {
    cartItems: undefined,
  
    loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || []
    },
  
    addToCart(productId){
      let matchingItem;
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
    
        // const quantitySelector = document.querySelector(
        //   `.js-quantity-selector-${productId}`
        // );
    
        // const quantitySelected = Number(quantitySelector.value);
    
        if (matchingItem) {
          matchingItem.quantity += 1;
        } else {
          this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '3'
          });
        }
    
        this.saveToStorage();
    },
  
    saveToStorage(){
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
    removeFromCart(productId){
      const newCart = [];
      this.cartItems.forEach((cartItem)=>{
        if (cartItem.productId !== productId){
          newCart.push(cartItem);
        } 
      })
      console.log(newCart);
      cartItems = newCart;
    },
  
    updateCartQuantity(){
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      return cartQuantity;
    },
  
    updateQuantity(productId, newQuantity){
      let matchingItem;
      this.cartItems.forEach(cartItem => {
        if (cartItem.productId === productId){
          matchingItem = cartItem;
        }
      })
    
      matchingItem.quantity = newQuantity;
      // it looks for the matching items in the 'cart' array, then update the quantity of that item to the newQuantity. 
      // then save the updated cart
    
      this.saveToStorage();
    },
  
    updateDeliveryOption(productId, deliveryOptionId){
      // find the matching item from productId
      let matchingItem;
      this.cartItems.forEach(cartItem => {
        if (productId === cartItem.productId){
          matchingItem = cartItem;
        }
      })
    
      // then update the deliveryOptionId for that matchingItem by reassigning with the provided parameter
      matchingItem.deliveryOptionId = deliveryOptionId;
    
      // then save the updated cart (with deliveryOptionId) in storage
      this.saveToStorage();
    }
  
  }

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
cart.updateQuantity('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 3)

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
