export const numberToString = (num?: number) => {
  return typeof num === "number" ? String(num) : undefined;
};
export const stringToNumber = (str?: string) => {
  return str ? Number(str) : undefined;
};
