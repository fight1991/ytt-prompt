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
export const tokens = valueInfo.map((item) => item.token).flat();
export const cateIds = valueInfo.map((item) => item.cateIds).flat();
