export const token = "";
export const ids = [];
export const outDir = "";
interface TokenItem {
  token: string[];
  cateIds: number[];
}
const tokensConfig: Record<string, TokenItem> = {
  sprint63: {
    token: [],
    cateIds: [],
  },
  sprint64: {
    token: [],
    cateIds: [],
  },
};
const valueInfo = Object.keys(tokensConfig).map((key) => tokensConfig[key]);
const tempTokens = valueInfo.map((item) => item.token).flat();
const tempCateIds = valueInfo.map((item) => item.cateIds).flat();
export const tokens = [...new Set(tempTokens)];
export const cateIds =
  [...new Set(tempCateIds)].length === 0 ? [0] : [...new Set(tempCateIds)];
