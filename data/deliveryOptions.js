import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];

}
// EXCLUDE WEEKENDS IN DELIVERY DATE
const isWeekend = function isWeekend(date){
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function getDeliveryDate(deliveryOption){

  let remainingDays = deliveryOption.deliveryDays;

  let deliveryDate = dayjs();// means today

  while (remainingDays >0){
    deliveryDate = deliveryDate.add(1, 'day');

    if(!isWeekend(deliveryDate)){
      remainingDays --;
    }
  }
  const dateString = deliveryDate.format('dddd, MMMM D');

  return dateString;
}


//TRY WITH FOR LOOP => it does not work as expected => SHOULD USE WHILE LOOP IN THIS CASE
/*
const isWeekend = function isWeekend(date){
  const day = date.day();

  return day === 0 || day === 6 // 0 is Sunday, 6 is Saturday
}

export function getDeliveryDate(deliveryOption){
  let remainingDays = deliveryOption.deliveryDays;

  let deliveryDate = dayjs();

  for (let i = 0; i < remainingDays; i++){
    deliveryDate.add(1, 'day');

    if (!isWeekend(deliveryDate)){
      remainingDays --;
    }
  }

  const dateString = deliveryDate.format('dddd, MMMM D YYYY');

  console.log(dateString)

  return dateString;
}
*/
