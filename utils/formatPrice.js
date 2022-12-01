export const formatPrice = (num) => {
  num = num / 100;
  return `₱${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
};
