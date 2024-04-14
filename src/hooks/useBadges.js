import { useState } from "react";

import useFirebase from "services/firebase/useFirebase";
import useUserProfile from "context/userProfile/useUserProfile";
import getGlcNftBalance from "api/glcNftBalance";

const useBadges = () => {
  const { checkForNavigateToSignIn } = useFirebase();
  const { user } = useUserProfile();

  const [badges, setBadges] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const handleFailure = (err) => {
    console.error(err);
    checkForNavigateToSignIn(err.code);
  };

  const getBadges = async () => {
    setBadges((prev) => ({ ...prev, loading: true }));
    try {
      const nftBalance = await getGlcNftBalance(user.uid);
      
      if (nftBalance?.data?.nfts) {
        const data = nftBalance.data.nfts.map((nft, index) => ({
          id: index,
          points: 0,
          name: nft.name,
          image: nft.img_url,
        }));
        setBadges({ data, error: null, loading: false });
      }
    } catch (err) {
      console.error("Error getting badges");
      handleFailure(err);
      setBadges({ data: [], error: err.message, loading: false });
    }
  };

  return {
    badges,
    getBadges,
  };
};

export default useBadges;
