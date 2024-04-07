import { apiUrls } from "constants/urls";

const GlcTransactionSend = async (uid, amount) => {
  try {
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
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error invoking transaction:", error);
    throw error; // Rethrow the error for handling in the calling component
  }
};

export default GlcTransactionSend;
