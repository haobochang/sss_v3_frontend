export type FundProduct = {
  id: string;
  fundName: string;
  ticker: string;
  manager: string;
  strategy: "多资产" | "量化对冲" | "固收+" | "指数增强";
  inceptionDate: string;
  navStart: number;
  navEnd: number;
  stockExposureStart: number;
  stockExposureEnd: number;
  futuresExposureStart: number;
  futuresExposureEnd: number;
  aum: number;
  sharpe: number;
  ytdReturn: number;
};
