import { apiUrls } from "constants/urls";

const fetchGlcBalance = async (uid) => {
  try {
    const response = await fetch(apiUrls.glcBalanceByIdApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UID: uid }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching GLC balance:", error);
    throw error;
  }
};

export default fetchGlcBalance;
