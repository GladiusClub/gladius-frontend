import React from "react";
import Box from "@mui/material/Box";

import { PopoverClose, PopoverContent } from "components/Popover";
import useUserProfile from "context/userProfile/useUserProfile";
import CopyToClipboard from "components/CopyToClipboard";
import { externalUrls } from "constants/urls";

const ReceivePopoverContent = () => {
  const { user } = useUserProfile();

  const stellarWalletAddres = `${externalUrls.stellarAccount}/${user.stellarWallet}`;

  return (
    <PopoverContent
      origin={{
        anchorOrigin: {
          vertical: "center",
          horizontal: "center",
        },
        transformOrigin: {
          vertical: "center",
          horizontal: "center",
        },
      }}
    >
      <Box className="p-8">
        <a
          href={stellarWalletAddres}
          target="_blank"
          rel="noreferrer"
          className="underline text-primary break-words"
        >
          {stellarWalletAddres}
        </a>
        {/* Close Button */}
        <div className="flex justify-between mt-4">
          <CopyToClipboard
            text={stellarWalletAddres}
            className="text-sm"
          />
          <PopoverClose>
            <button className="text-secondary text-sm">Close</button>
          </PopoverClose>
        </div>
      </Box>
    </PopoverContent>
  );
};

export default ReceivePopoverContent;
