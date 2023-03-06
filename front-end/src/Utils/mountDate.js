const mountDate = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const turnInTwoDigits = -2;

  return `${(`0${day}`)
    .slice(turnInTwoDigits)}/${(`0${month}`).slice(turnInTwoDigits)}/${year}`;
};

export default mountDate;
