import { apiUrls } from "constants/urls";

export const makeClubPayment = async (apiData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("done"), 10000);
  });

  // const response = await fetch(apiUrls.createStellarWallet, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(apiData),
  // });

  // if (!response.ok) {
  //   const error = await response.json();
  //   throw error;
  // }

  // return response.json();
};
