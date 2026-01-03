export const formatNumber = (val: number | string) => {
  if (!val) return "";
  // Remove existing commas and non-numeric characters, then format
  const number = parseFloat(val.toString().replace(/,/g, ""));
  if (isNaN(number)) return "";
  return new Intl.NumberFormat("en-US").format(number);
};

export const parseNumber = (val: string) => {
  // Remove commas before saving to state
  return parseFloat(val.replace(/,/g, "")) || 0;
};