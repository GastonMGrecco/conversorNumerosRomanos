export const romanNumberCheking = (number, hash) => {
  let smallLeftNumber = 0;

  number = number.toUpperCase();



  for (let i = 0; i < number.length; i++) {
    if (!hash.get(number[i])) {
      return {
        isValid: false,
        message: 'wrong syntax',
      };
    }
    if (number[i - 1]) {
      if (hash.get(number[i])[1] > hash.get(number[i - 1])[1]) {
        if (number[i - 2]) {
          if (hash.get(number[i])[1] > hash.get(number[i - 2])[1]) {
            return {
              isValid: false,
              message:
                'wrong syntax',
            };
          }
        }
      }
    } else if (hash.get(number[0])[1] < hash.get(number[i])[1]) {
      smallLeftNumber++;
      if (smallLeftNumber >= 2) {
        return {
          isValid: false,
          message: 'smaller',
        };
      }
    } 
  }
  return {
    isValid: true,
  };
};

const R_N = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  M: 1000,
};

export const validingNumber = (number) => {


  for (const property in R_N) {
    let regex1 = new RegExp(property, 'gi');
    if (number.match(regex1)?.length > 3)
      return {
        isValid: false,
        message: 'Only you can write the same letter only three times',
      };
  }
  return {
    isValid: true,
  };
};

export const convertRomanToDecimal = (number, hash) => {
  number = number.toUpperCase();
  let add = 0;

  for (let i = 0; i < number.length; i++) {
    if (number[i + 1]) {
      if (hash.get(number[i + 1])[1] > hash.get(number[i])[1]) {
        continue;
      } else if (number[i - 1]) {
        if (hash.get(number[i])[1] > hash.get(number[i - 1])[1]) {
          let add_temp = hash.get(number[i])[1] - hash.get(number[i - 1])[1];
          add += add_temp;
        } else {
          add += hash.get(number[i])[1];
        }
      } else {
        add += hash.get(number[i])[1];
      }
    } else {
      if (number[i - 1]) {
        if (hash.get(number[i])[1] > hash.get(number[i - 1])[1]) {
          let add_temp = hash.get(number[i])[1] - hash.get(number[i - 1])[1];
          add += add_temp;
        } else {
          add += hash.get(number[i])[1];
        }
      } else {
        add += hash.get(number[i])[1];
      }
    }
  }

  return add.toString();
};

export const convertDecimalToRoman = (num, romanLettersHash) => {
  const letterValue = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

  let letter = '';

  for (var index = 0; index < letterValue.length; index++) {
    while (letterValue[index] <= num) {
      letter += romanLettersHash.get(letterValue[index].toString())[1];
      num -= letterValue[index];
    }
  }
  return letter;
};
