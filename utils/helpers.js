"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrency = exports.parseNumber = exports.formatNumber = void 0;
var formatNumber = function (val) {
    if (!val)
        return "";
    // Remove existing commas and non-numeric characters, then format
    var number = parseFloat(val.toString().replace(/,/g, ""));
    if (isNaN(number))
        return "";
    return new Intl.NumberFormat("en-US").format(number);
};
exports.formatNumber = formatNumber;
var parseNumber = function (val) {
    // Remove commas before saving to state
    return parseFloat(val.replace(/,/g, "")) || 0;
};
exports.parseNumber = parseNumber;
var formatCurrency = function (amount) {
    if (amount >= 1000000000000)
        return "\u20A6".concat((amount / 1000000000000).toFixed(1), "T");
    if (amount >= 1000000000)
        return "\u20A6".concat((amount / 1000000000).toFixed(1), "B");
    if (amount >= 1000000)
        return "\u20A6".concat((amount / 1000000).toFixed(1), "M");
    return "\u20A6".concat(amount.toLocaleString());
};
exports.formatCurrency = formatCurrency;
