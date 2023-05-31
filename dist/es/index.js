var numberToString = function (num) {
    return typeof num === "number" ? String(num) : undefined;
};
var stringToNumber = function (str) {
    return str ? Number(str) : undefined;
};

export { numberToString, stringToNumber };
