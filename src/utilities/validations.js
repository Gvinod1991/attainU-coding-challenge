export const isNumeric = (number) => {
  const regex = /^[0-9]*$/;
  return regex.test(number)
}