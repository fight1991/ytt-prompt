export const token = "";
export const ids = [];
export const outDir = "";
interface TokenItem {
  token: string[];
  cateIds: number[];
}
const tokensConfig: Record<string, TokenItem> = {
  sprint63: {
    token: [
      "6832361f8b4ace5567b33763e942a85f50df621a7880c1e7ce01170fafbc8750",
      "82e947061977ee9f69ba0d4e852e50a57b34c92efa60a528037521695eaf189c",
    ],
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
