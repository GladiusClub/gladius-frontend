import React from "react";
import Typography from "components/Typography";
import { PopoverTarget } from "components/Popover";
import WalletIcon from "@mui/icons-material/Wallet";
import { Box } from "@mui/material";

const StyledWalletIcon = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 66,
        height: 65,
        backgroundColor: "#101835",
        borderRadius: "50%",
        color: "white",
      }}
    >
      <WalletIcon sx={{ fontSize: 30 }} /> {/* Adjust size as needed */}
    </Box>
  );
};

const ReceivePopoverTarget = () => {
  return (
    <PopoverTarget>
      <div>
        <StyledWalletIcon />
        <Typography className="text-sm text-center mt-3">Wallet</Typography>
      </div>
    </PopoverTarget>
  );
};

export default ReceivePopoverTarget;
