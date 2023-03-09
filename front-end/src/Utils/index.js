export const fixDecimals = (value) => {
  const valueToNumber = Number(value);
  const result = parseFloat(valueToNumber).toFixed(2);

  return result.replace('.', ',');
};

export const calcCartTotal = (cartArray) => {
  let acc = 0;
  cartArray.forEach((item) => {
    acc += (Number(item.price) * item.quantity);
  });

  return acc;
};
