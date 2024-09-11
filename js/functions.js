// const getStringLength = (string = '', maxLength = 1) => string.length <= maxLength;
//
// getStringLength();

// console.log(getStringLength('проверяемая строка', 20)); // true
// console.log(getStringLength('проверяемая строка', 18)); // true
// console.log(getStringLength('проверяемая строка', 10)); // false


// const isPalindrome = (phrase = '') => {
//   phrase = phrase.toLowerCase().replaceAll(' ','');
//   let newPhrase = '';
//   for (let i = phrase.length - 1; i >= 0; i--) {
//     newPhrase += phrase[i];
//   }
//   return phrase === newPhrase;
// };
//
// isPalindrome();

// console.log(isPalindrome('топот')); // true
// console.log(isPalindrome('ДовОд')); // true
// console.log(isPalindrome('Кекс')); // false


// const getNumber = (string) => {
//   string = typeof(string) === 'number' ? String(string) : string;
//   let number = '';
//   const checkingNumbers = '0123456789';
//   for (let i = 0; i <= string.length - 1; i++) {
//     for (let k = 0; k <= checkingNumbers.length - 1; k++) {
//       if (string[i] === checkingNumbers[k]) {
//         number += string[i];
//       }
//     }
//   }
//   number = number === '' ? string : +number;
//   return Number.isNaN(number) ? typeof(number) : +number;
// };

// getNumber('2023 год');

// console.log(getNumber('2023 год'));  // 2023
// console.log(getNumber('ECMAScript 2022'));  // 2022
// console.log(getNumber('1 кефир, 0.5 батона'));  // 105
// console.log(getNumber('агент 007'));  // 7
// console.log(getNumber('а я томат'));  // NaN
// console.log(getNumber(2023));  // 2023
// console.log(getNumber(-1));  // 1
// console.log(getNumber(1.5));  // 15
