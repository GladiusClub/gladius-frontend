// api/glcBalance.js
import { apiUrls } from "constants/urls";

const fetchGlcBalance = async () => {
  const publicKey = "GDKT3YL6QCPPJZ53R7PUN6VX7F2SFZNSYCGALC7DIUVNHEV5IJSNKFRM";

  try {
    const url = new URL(apiUrls.glcBalanceApi);
    url.searchParams.append("publicKey", publicKey); // Append the publicKey as a query parameter

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching GLC balance:", error);
    throw error; // Optional: rethrow the error if you want to handle it outside
  }
};

export default fetchGlcBalance;
