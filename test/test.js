import formatCurrency from '../script/utils/money.js';

console.log('test suite: format currency')

//BASIC TEST CASE
console.log('convert cents into dollars')
if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

// EDGE TEST CASES =>> to test tricky cases
console.log('work with 0')
if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('round up to the nearest cent')
if (formatCurrency(2000.4) === '20.00') {
  console.log('passed');
} else {
  console.log('failed');
}
