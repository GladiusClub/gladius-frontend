import { useEffect } from "react";
import { apiUrls } from "constants/urls";

const GlcBalanceFetcher = () => {
  useEffect(() => {
    fetch(apiUrls.glcBalanceApi)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("GLC Balance:", data); // Log the balance
      })
      .catch((error) => {
        console.error("Error fetching GLC balance:", error);
      });
  }, []); // Empty dependency array to run only on mount

  return null; // Component renders nothing
};

export default GlcBalanceFetcher;
