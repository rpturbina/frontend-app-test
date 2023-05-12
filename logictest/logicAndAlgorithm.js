const stringToTitleCaseFormat = (inputString) => {
  let lowerCaseFormat = inputString.toLowerCase();
  let titleCaseFormat = '';

  for (let i = 0; i < lowerCaseFormat.length; i++) {
    const currentChar = lowerCaseFormat[i];
    const previousChar = lowerCaseFormat[i - 1];

    if (i === 0 || previousChar === ' ') {
      titleCaseFormat += currentChar.toUpperCase();
    } else if (!currentChar.match(/\W/) || currentChar.match(/\s/)) {
      titleCaseFormat += currentChar;
    }
  }

  return titleCaseFormat;
};

const stringToStripFormat = (inputString) => {
  let lowerCasedString = inputString.toLowerCase();
  let stripFormat = lowerCasedString[0].toUpperCase();

  for (let i = 1; i < lowerCasedString.length; i++) {
    let currentChar = lowerCasedString[i];
    if (currentChar.match(/\W/) && !currentChar.match(/\s/)) {
      continue;
    } else if (currentChar === ' ') {
      stripFormat += '-';
    } else {
      stripFormat += currentChar;
    }
  }

  return stripFormat;
};

const countEachCharacterFromString = (inputString) => {
  const formattedString = inputString.toLowerCase();
  const eachCharacterCount = {};

  for (const char of formattedString) {
    if (char.match(/[a-zA-Z]/)) {
      if (!eachCharacterCount.hasOwnProperty(char)) {
        eachCharacterCount[char] = 1;
      } else {
        eachCharacterCount[char] += 1;
      }
    }
  }

  return eachCharacterCount;
};

const generateNumberSeries1 = (n) => {
  let numberSeries = '';
  for (let i = 0; i < n; i++) {
    numberSeries = numberSeries + `${i * i} `;
  }
  return numberSeries;
};

const generateNumberSeries2 = (n) => {
  let numberSeries = '';
  for (let i = 1; i < n; i++) {
    numberSeries = numberSeries + `${i * (i - 2) + 2} `;
  }
  return numberSeries;
};

const generateFibonacciSeries = (n) => {
  let numberSeries = '';
  let a = 1;
  let b = 0;
  for (let i = 0; i < n; i++) {
    numberSeries = numberSeries + `${b} `;
    a += b;
    b = a - b;
  }
  return numberSeries;
};

const generateNumberSeries3 = (n) => {
  let numberSeries = '';

  let a = 0;
  let b = -1;

  for (let i = 0; i < n; i++) {
    const c = a + b + 1;
    numberSeries = numberSeries + `${c} `;
    a = b;
    b = c;
  }

  return numberSeries;
};

const calculateNumbers = (inputString) => {
  let tempString = '';
  let arrayOfNumber = [];

  for (let i = 0; i < inputString.length; i++) {
    let currentChar = inputString[i];

    if (currentChar >= '0' && currentChar <= '9') {
      tempString += currentChar;
      if (i === inputString.length - 1) {
        arrayOfNumber.push(parseInt(tempString));
      }
    } else if (currentChar === ' ' || currentChar === ',') {
      if (tempString !== '') {
        arrayOfNumber.push(parseInt(tempString));
      }
      tempString = '';
    }
  }

  let total = 0;
  let max = arrayOfNumber[0];
  let min = arrayOfNumber[0];

  for (let i = 0; i < arrayOfNumber.length; i++) {
    const number = arrayOfNumber[i];
    if (min > number) {
      min = number;
    }
    if (max < number) {
      max = number;
    }
    total += number;
  }

  return `
  Nilai total dari deret angka: ${total}
  Nilai terbesar: ${max}
  Nilai terkecil: ${min}
  Nilai rata-rata:  ${total / arrayOfNumber.length}
  `;
};

const solution = stringToTitleCaseFormat('SELamAt PaGi Dunia!!');
const solution1 = stringToStripFormat('SELamAt PaGi Dunia!!');
const solution2 = countEachCharacterFromString(
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco laborisnisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderitin voluptate velitesse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatatnon proident, sunt inculpa qui officia deserunt mollit anim id est laborum.'
);
const solution3 = generateNumberSeries1(11);
const solution4 = generateNumberSeries2(11);
const solution5 = generateFibonacciSeries(11);
const solution6 = generateNumberSeries3(10);
const solution7 = calculateNumbers('20,21, 80a,21, 5d5, 31 22');

console.log(solution);
console.log(solution1 + '\n');
console.log(solution2);
console.log();
console.log(solution3);
console.log(solution4);
console.log(solution5);
console.log(solution6);
console.log(solution7);
