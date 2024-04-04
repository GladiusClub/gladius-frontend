import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField"; // Import for input field
import Button from "@mui/material/Button"; // Import for send button

import Typography from "components/Typography";
import { PopoverClose, PopoverContent } from "components/Popover";
import useUserProfile from "context/userProfile/useUserProfile";
import { apiUrls } from "constants/urls";
import GlcTransactionSend from "api/glcTransaction";

const TransferPopoverContent = () => {
  const [amount, setAmount] = useState(""); // State to store the amount
  const {
    user: { club },
  } = useUserProfile();

  const handleSend = () => {
    const uid = "40WiH4RtOIgtJxGjwO6vadjAOem2"; // Replace with the actual UID
    GlcTransactionSend(uid, amount)
      .then((response) => {
        console.log("Transaction successful:", response);
        // Handle successful transaction
      })
      .catch((error) => {
        console.error("Transaction failed:", error);
        // Handle transaction error
      });
  };

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
        <div className="flex justify-center items-center gap-3">
          <img
            src={club.src || `${apiUrls.uiAvatarApi}?name=${club.name}`}
            alt="sport-club"
            className="w-10 h-10 rounded-full"
          />
          <Typography className="text-xl">{club.name}</Typography>
        </div>

        {/* Input for Amount and Send Button */}
        <Box className="mt-4">
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            variant="outlined"
            size="small"
            className="mr-2"
            sx={{
              input: {
                color: "white", // Set text color
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Set border color
                },
                "&:hover fieldset": {
                  borderColor: "white", // Set border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Set border color on focus
                },
              },
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSend}>
            Send
          </Button>
        </Box>

        {/* Close Button */}
        <div className="flex justify-end mt-4">
          <PopoverClose>
            <button className="text-secondary text-sm">Close</button>
          </PopoverClose>
        </div>
      </Box>
    </PopoverContent>
  );
};

export default TransferPopoverContent;
