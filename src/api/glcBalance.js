// api/glcBalance.js
import { apiUrls } from "constants/urls";

const fetchGlcBalance = () => {
  return fetch(apiUrls.glcBalanceApi).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export default fetchGlcBalance;
