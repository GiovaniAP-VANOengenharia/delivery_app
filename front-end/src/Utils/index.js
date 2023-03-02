export const fixDecimals = (value) => {
  const result = parseFloat(value).toFixed(2);

  return result;
};

export const calcCartTotal = (cartArray) => {
  let acc = 0;
  cartArray.forEach((item) => {
    acc += (Number(item.price) * item.quantity);
  });
  return acc;
};
