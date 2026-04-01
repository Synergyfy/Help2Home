
const formatCurrency = (amount) => {
    if (amount >= 1000000000000) return `₦${(amount / 1000000000000).toFixed(1)}T`;
    if (amount >= 1000000000) return `₦${(amount / 1000000000).toFixed(1)}B`;
    if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(1)}M`;
    return `₦${amount.toLocaleString()}`;
};

console.log("Testing formatCurrency:");
console.log(`500,000 => ${formatCurrency(500000)}`);
console.log(`1,500,000 => ${formatCurrency(1500000)}`);
console.log(`2,500,000,000 => ${formatCurrency(2500000000)}`);
console.log(`3,500,000,000,000 => ${formatCurrency(3500000000000)}`);
