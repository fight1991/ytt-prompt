const tokensConfig: Record<string, string[]> = {
  sprint63: [
    "6832361f8b4ace5567b33763e942a85f50df621a7880c1e7ce01170fafbc8750",
    "82e947061977ee9f69ba0d4e852e50a57b34c92efa60a528037521695eaf189c",
  ],
  sprint64: [],
};

const valueInfo = Object.keys(tokensConfig).map((key) => tokensConfig[key]);
const tempTokens = valueInfo.flat();

export const tokens = [...new Set(tempTokens)];
