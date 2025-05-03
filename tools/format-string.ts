import { isArray } from '@dimjs/lang';
import { trim } from '@flatbiz/utils';

export const formatString = (value: string | number = '', format: number[], sp = ' ') => {
  try {
    const newValue = trim(value.toString() || '');
    if (!isArray(format) || format.length === 0) return [newValue];
    const accumulation: { min: number; max: number }[] = [];
    format.forEach((item, index) => {
      if (index === 0) {
        accumulation.push({ min: 0, max: item });
      } else {
        const preValue = accumulation[index - 1].max;
        const currentValue = item + preValue;
        accumulation.push({ min: preValue, max: currentValue });
        if (index === format.length - 1 && currentValue < newValue.length) {
          accumulation.push({ min: currentValue, max: newValue.length });
        }
      }
    });
    const strArray: string[] = [];
    accumulation.forEach((item) => {
      const temp = newValue.substring?.(item.min, item.max);
      if (temp) {
        strArray.push(temp);
      }
    });
    return strArray.join(sp);
  } catch (error) {
    console.error(error);
  }
  return '';
};
