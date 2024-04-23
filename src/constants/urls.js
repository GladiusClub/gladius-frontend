const WALLET_API_BASE =
  "https://europe-west1-wallet-login-45c1c.cloudfunctions.net";

export const apiUrls = {
  uiAvatarApi: "https://ui-avatars.com/api",
  calendarApi: "https://www.googleapis.com/calendar/v3/calendars",
  glcBalanceByIdApi: `${WALLET_API_BASE}/getStudentBalanceByID`,
  invokeGladiusTransactionApi: `${WALLET_API_BASE}/invokeGladiusTransaction`,
  nftBalanceApi: `${WALLET_API_BASE}/fetchGladiusNFT`,
  signupGladiusParent: `${WALLET_API_BASE}/SignupGladiusParent`,
};

export const externalUrls = {
  stellarAccount: "https://stellar.expert/explorer/testnet/account",
};
