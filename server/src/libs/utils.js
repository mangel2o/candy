const standardizeValue = (value) => {
   return value[0].toString().toUpperCase() +
      value.toString().toLowerCase().substring(1).replace(/-/g, ' ');
};

export { standardizeValue };
