import { getOrder } from "../data/orders.js";
import {getProduct, loadProductsFetch} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadPage(){
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);

  // get additional info about the product like delivery time

  let productDetails;

  order.products.forEach(itemDetails => {
    if (itemDetails.productId === product.id){
      productDetails = itemDetails;
    }
  });

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const percentProgress = ((today - deliveryTime) -(deliveryTime - orderTime))*100;

  // extra feature: disply "deliveried" on the tracking page
  // if today's date is past the delivery date
  const deliveriedMessage = today < deliveryTime ? 'Arriving on' : 'Deliveried on';

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
    </a>

    <div class="delivery-date">
      ${deliveriedMessage} ${dayjs(productDetails.estimatedDeliveryTime).format('dddd MMMM D')}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label ${percentProgress >=50 ? 'current-status' : ''}">
        Preparing
      </div>
      <div class="progress-label ${(percentProgress >=50 && percentProgress < 100) ? 'current-status' : ''}">
        Shipped
      </div>
      <div class="progress-label ${percentProgress > 100 ? 'current-status' : ''}">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width:${percentProgress}%;"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

loadPage();