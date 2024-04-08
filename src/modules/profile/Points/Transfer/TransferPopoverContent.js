import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import Typography from "components/Typography";
import { PopoverClose, PopoverContent, usePopover } from "components/Popover";
import useUserProfile from "context/userProfile/useUserProfile";
import GlcTransactionSend from "api/glcTransaction";
import GlcBalanceFetcher from "api/glcBalance";

const TransferPopoverContent = ({ setPointsBalance }) => {
  const [amount, setAmount] = useState("");
  const { setAnchorEl } = usePopover();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClub, setSelectedClub] = useState();

  const { user } = useUserProfile();

  useEffect(() => {
    console.log("User object:", user);
    if (user && user.club && user.club.name) {
      setSelectedClub(user.club.name); // Update selectedClub when club is loaded
    }
  }, [user]);

  const {
    user: { uid },
  } = useUserProfile();

  const handleClubChange = (event) => {
    setSelectedClub(event.target.value);
  };

  const handleSend = () => {
    setIsLoading(true); // Start loading
    GlcTransactionSend(uid, amount)
      .then((response) => {
        console.log("Transaction successful:", response);
      })
      .catch((error) => {
        console.error("Transaction failed:", error);
      })
      .finally(() => {
        GlcBalanceFetcher(uid)
          .then((response) => {
            // Assuming the response contains the points balance
            setPointsBalance(response.data != null ? response.data : 0);
          })
          .catch((error) => {
            console.error("Error fetching GLC balance:", error);
          });
        setIsLoading(false); // Stop loading
        setAnchorEl(null); // Close the popover
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
        {isLoading ? (
          <>
            <CircularProgress />
            <Typography sx={{ color: "white", mt: 2 }}>
              Sending To {selectedClub}
            </Typography>
          </>
        ) : (
          <>
            <div className="mb-4">
              <InputLabel id="select-label" sx={{ color: "white" }}>
                Send To
              </InputLabel>
              <Select
                labelId="select-label"
                value={selectedClub}
                onChange={handleClubChange}
                displayEmpty
                fullWidth
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  ".MuiSelect-icon": {
                    color: "white",
                  },
                }}
              >
                <MenuItem value={selectedClub}>{selectedClub}</MenuItem>
              </Select>
            </div>

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
                    color: "white",
                  },
                  "& label.Mui-focused": {
                    color: "white",
                  },
                  "& label": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />
              <Button variant="contained" color="primary" onClick={handleSend}>
                Send
              </Button>
            </Box>
          </>
        )}

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
