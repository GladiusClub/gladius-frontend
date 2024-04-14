import { apiUrls } from "constants/urls";

const getGlcNftBalance = async (uid) => {
  const postData = {
    UID: uid,
  };

  const response = await fetch(apiUrls.nftBalanceApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default getGlcNftBalance;
