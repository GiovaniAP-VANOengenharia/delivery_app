export const verifyPathProducts = (pathname) => {
  if (pathname.includes('products')) {
    return {
      backgroundColor: '#2FC18C',
      color: 'black',
    };
  } return {
    backgroundColor: '#036B52',
    color: 'white',
  };
};

export const verifyPathOrder = (pathname) => {
  if (pathname.includes('order')) {
    return {
      backgroundColor: '#2FC18C',
      color: 'black',
    };
  } return {
    backgroundColor: '#036B52',
    color: 'white',
  };
};
