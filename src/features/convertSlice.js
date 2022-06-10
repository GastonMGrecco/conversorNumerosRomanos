import { createSlice } from '@reduxjs/toolkit';
import { HashTable } from '../tables';
import {
  romanNumberCheking,
  validingNumber,
  convertRomanToDecimal,
  convertDecimalToRoman,
} from '../functions';

let romanLettersHash = new HashTable(13);
romanLettersHash.set('1000', 'M');
romanLettersHash.set('900', 'CM');
romanLettersHash.set('500', 'D');
romanLettersHash.set('400', 'CD');
romanLettersHash.set('100', 'C');
romanLettersHash.set('90', 'XC');
romanLettersHash.set('50', 'L');
romanLettersHash.set('40', 'XL');
romanLettersHash.set('10', 'X');
romanLettersHash.set('9', 'IX');
romanLettersHash.set('5', 'V');
romanLettersHash.set('4', 'IV');
romanLettersHash.set('1', 'I');

let newHash = new HashTable(10);
newHash.set('I', 1);
newHash.set('V', 5);
newHash.set('X', 10);
newHash.set('L', 50);
newHash.set('C', 100);
newHash.set('M', 1000);

export const convertSlice = createSlice({
  name: 'convert',
  initialState: {
    value: '',
    isThereError: false,
    message: '',
  },
  reducers: {
    romanToDecimal: (state, payload) => {
      state.value = payload.payload;

      const secondFilter = validingNumber(payload.payload);
      console.log('hi', secondFilter);
      if (!secondFilter.isValid) {
        state.isThereError = true;
        state.message = secondFilter.message;
        state.value = '';
        return state;
      }

      const thirdFilter = romanNumberCheking(payload.payload, newHash);
      console.log('thirdFilter', thirdFilter);
      if (!thirdFilter.isValid) {
        state.isThereError = true;
        state.message = thirdFilter.message;
        state.value = '';
        return state;
      }

      state.isThereError = false;
      state.value = convertRomanToDecimal(payload.payload, newHash);
      return state;
    },

    decimalToRoman: (state, payload) => {
      if (payload.payload >= 4000) {
        state.isThereError = true;
        state.message =
          'wrong sintax';
        state.value = '';
        return state;
      }

      state.isThereError = false;
      state.value = convertDecimalToRoman(payload.payload, romanLettersHash);
      return state;
    },
  },
});

export const { romanToDecimal, decimalToRoman } = convertSlice.actions;

export default convertSlice.reducer;
