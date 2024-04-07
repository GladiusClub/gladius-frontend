import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import BadgesList from "./BadgesList";
import BadgesInfo from "./BadgesInfo";
import getGlcNftBalance from "api/glcNftBalance";

const Badges = () => {
  const [badges, setBadges] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    async function fetchNftBalance() {
      setIsLoading(true); // Start loading
      const uid = "4KKWdVfzUcUcJf9mVSVdPRXSNLI2";
      try {
        const nftBalance = await getGlcNftBalance(uid);
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
  }, []);

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
