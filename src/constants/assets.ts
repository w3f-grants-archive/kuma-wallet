import { BN } from "bn.js";
import { BigNumber } from "ethers";
import { PARACHAINS } from "./chains";

export const REF_TIME = new BN("1000000000000");
export const PROOF_SIZE = new BN("1000000000000");

export const BigNumber0 = BigNumber.from(0);
export const BN0 = new BN("0");

export const defaultAssetConfig = {
  [PARACHAINS.MOONBEAM]: [
    {
      address: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
      symbol: "xcDOT",
      decimals: 10,
    },
    {
      address: "0xFfFFFfffA893AD19e540E172C10d78D4d479B5Cf",
      symbol: "xcASTR",
      decimals: 18,
    },
  ],

  [PARACHAINS.MOONRIVER]: [
    {
      address: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
      symbol: "xcKSM",
      decimals: 12,
    },
    {
      address: "0xFFFfffFF0Ca324C842330521525E7De111F38972",
      symbol: "xcSDN",
      decimals: 18,
    },
  ],
};

export const COINGECKO_ASSET_MAP: { [key: string]: string } = {
  xcatom: "cosmos",
  bnc: "bifrost-native-coin",
  glmr: "moonbeam",
  dot: "polkadot",
  aca: "acala",
  ldot: "liquid-staking-dot",
  hdx: "hydradx",
  ausd: "acala-dollar",
  usdt: "tether",
  ibtc: "interbtc",
  intr: "Interlay",
  pha: "pha",
  unq: "unq",
  vdot: "voucher-dot",

  astr: "astar",

  xcdot: "polkadot",
  xchdx: "hydradx",
  xcausd: "acala-dollar",
  xcibtc: "interbtc",
  xcusdt: "tether",
  xcpha: "pha",
  xcbnc: "bifrost-native-coin",
  xcastr: "astar",
  xcaca: "acala",
};
