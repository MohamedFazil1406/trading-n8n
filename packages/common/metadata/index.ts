export const SUPPORTED_ASSETS = ["BTC", "ETH", "SOL", "USDC", "USDT"];

export type TimerNodeData = {
  time: number;
};

export type PriceTriggerNodeData = {
  asset: string;
  price: number;
};

export type TradingMetadata = {
  type: "LONG" | "SHORT";
  qty: number;
  symbol: typeof SUPPORTED_ASSETS;
};
