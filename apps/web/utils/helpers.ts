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

export const formatCurrency = (amount: number) => {
  if (amount >= 1000000000000) return `₦${(amount / 1000000000000).toFixed(1)}T`;
  if (amount >= 1000000000) return `₦${(amount / 1000000000).toFixed(1)}B`;
  if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(1)}M`;
  return `₦${amount.toLocaleString()}`;
};