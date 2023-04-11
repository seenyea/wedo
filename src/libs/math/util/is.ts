import { BOM_TYPES_MAPS } from '@src/libs/math/constant/bom.type';
import { toString } from './object';

const { FUNCTION, ARRAY, NUMBER } = BOM_TYPES_MAPS;

export const isFunction = (o: any): boolean => {
   return toString(o) === FUNCTION;
}

export const isArray = (o: any): boolean => {
    return toString(o) === ARRAY;
}

export const isNumber = (o: any): boolean => {
    return toString(o) === NUMBER;
};