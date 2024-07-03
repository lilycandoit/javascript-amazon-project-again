import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isWeekend from './weekend.js';

const today = dayjs();

const date = today.subtract(30, 'days');

const formatDate = date.format('dddd, MMMM DD YYYY')
console.log(date, formatDate);



// test isWeekend function
let test = dayjs().add(2, 'months');
console.log(test.format('dddd'))
console.log(isWeekend(test));