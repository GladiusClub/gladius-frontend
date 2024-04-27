import api from "./helper";
import { apiUrls } from "constants/urls";

export const makeClubPayment = async (data) => {
  return api.post(apiUrls.signupGladiusParent, data);
};

export const fetchGlcBalance = async (UID) => {
  return api.post(apiUrls.glcBalanceByIdApi, { UID });
};

export const getGlcNftBalance = async (UID) => {
  return api.post(apiUrls.nftBalanceApi, { UID });
};

export const glcTransactionSend = async (to_uid, from_uid, amount) => {
  return api.post(apiUrls.transferGlcApi, {
    to_uid,
    from_uid,
    amount,
  });
};
