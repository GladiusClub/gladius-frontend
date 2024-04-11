import { apiUrls } from "constants/urls";

const glcTransactionSend = async (uid, amount) => {
  const postData = {
    UID: uid, // Pass UID as a parameter
    amount: amount, // Pass amount as a parameter
  };

  const response = await fetch(apiUrls.invokeGladiusTransactionApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};

export default glcTransactionSend;
