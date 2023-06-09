export const emailValidate = (email) => {
  const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegEx.test(email);
};

export const passwordValidate = (password) => {
  const minPasswordLength = 6;
  return password.length >= minPasswordLength;
};

export const nameValidate = (name) => {
  const minNameLength = 12;
  return name.length >= minNameLength;
};
