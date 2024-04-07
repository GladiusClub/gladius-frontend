import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import BadgesList from "./BadgesList";
import BadgesInfo from "./BadgesInfo";
import getGlcNftBalance from "api/glcNftBalance";
import useUserProfile from "context/userProfile/useUserProfile";

const Badges = () => {
  const [badges, setBadges] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const { user } = useUserProfile();

  useEffect(() => {
    if (!user || !user.uid) {
      console.log("User data is not available yet");
      return; // Early return if user or user.uid is not available
    }

    async function fetchNftBalance() {
      setIsLoading(true); // Start loading
      try {
        const nftBalance = await getGlcNftBalance(user.uid);
        console.log("NFT Balance:", nftBalance);

        if (nftBalance && nftBalance.data && nftBalance.data.nfts) {
          setBadges(
            nftBalance.data.nfts.map((nft, index) => ({
              id: index,
              points: 0,
              name: nft.name,
              image: nft.img_url,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching NFT balance:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    }

    fetchNftBalance();
  }, [user]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh", // Set the height to 100% of the viewport height
        }}
      >
        <CircularProgress />
      </Box>
    ); // Loading indicator
  }

  return (
    <div className="mt-10">
      <BadgesInfo NumBadges={badges.length} />
      <BadgesList badges={badges} />
    </div>
  );
};

export default Badges;
