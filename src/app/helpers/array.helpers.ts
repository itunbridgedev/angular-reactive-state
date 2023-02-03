export const arrayToEntities = (array: Array<any>, key:string) => {
  const initialValue = {};
  return array.reduce((accumulator, currentValue) => {
    return {
      ...accumulator,
      [currentValue[key]]: currentValue,
    };
  }, initialValue);
};
