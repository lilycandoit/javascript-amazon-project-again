
class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey){
      this.localStorageKey = localStorageKey;
      this.loadFromStorage();
      this.addToCart('e43638ce-6aa0-4b85-b27f-4325446');
    }
  
    loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || []
    }
  
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
    }
  
    saveToStorage(){
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }
  
    removeFromCart(productId){
      const newCart = [];
      this.cartItems.forEach((cartItem)=>{
        if (cartItem.productId !== productId){
          newCart.push(cartItem);
        } 
      })
      console.log(newCart);
      cartItems = newCart;
    }
  
    updateCartQuantity(){
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      return cartQuantity;
    }
  
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
    }
  
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

  

// get the object from the classe =>> instances
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

// set up code =>> moved to constructor

console.log(cart);
console.log(businessCart);


