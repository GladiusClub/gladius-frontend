import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { PopoverClose, PopoverContent, usePopover } from "components/Popover";
import { AmountAdornment } from "components/OutlinedInput/Adornments";
import OutlinedInput from "components/OutlinedInput";
import Typography from "components/Typography";
import useUserProfile from "context/userProfile/useUserProfile";
import glcTransactionSend from "api/glcTransaction";
import EventBus from "helpers/EventBus";
import { busEvents } from "constants/busEvents";

const TransferPopoverContent = () => {
  const [values, setValues] = useState({ selectedUser: "", amount: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const { setAnchorEl } = usePopover();

  const {
    user: { uid },
  } = useUserProfile();

  const handleSelectedUserChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleAmountChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    setIsLoading(true); // Start loading
    glcTransactionSend(uid, values.amount)
      .then((response) => {
        if (response.to_address) {
          // Emit event to refetch the balance wherever subscribed
          EventBus.emit(busEvents.sendBalanceSuccess);
          setAnchorEl(null); // Close the popover
          setApiError(null);
        }
      })
      .catch((error) => {
        console.error("Transaction failed:", error);
        setApiError(error.error);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
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
        <form onSubmit={handleSubmit}>
          <FormControl variant="outlined" className="w-full text-default mb-4">
            <InputLabel className="text-sm text-default font-manrope font-light">
              Send to
            </InputLabel>
            <Select
              value={values.selectedUser}
              onChange={handleSelectedUserChange}
              label="Send to"
              inputProps={{
                className: "text-default font-light font-manrope",
                name: "selectedUser",
                required: true,
                autoComplete: "off"
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: "12rem",
                    borderRadius: 0,
                  },
                },
              }}
              sx={{
                ".MuiSelect-icon": {
                  color: "var(--color-default)",
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="User1">User1</MenuItem>
              <MenuItem value="User2">User2</MenuItem>
              <MenuItem value="User3">User3</MenuItem>
              <MenuItem value="User4">User4</MenuItem>
              <MenuItem value="User5">User5</MenuItem>
              <MenuItem value="User6">User6</MenuItem>
              <MenuItem value="User7">User7</MenuItem>
              <MenuItem value="User8">User8</MenuItem>
            </Select>
          </FormControl>

          <OutlinedInput
            onBlur={handleAmountChange}
            field={{
              type: "number",
              name: "amount",
              label: "Amount",
              required: true,
            }}
            endAdornment={<AmountAdornment />}
          />

          {apiError && (
            <Typography className="text-info text-sm mb-2">
              {apiError}
            </Typography>
          )}

          <Button
            size="large"
            variant="contained"
            className="font-manrope w-full normal-case bg-gradient-active border rounded-lg"
            type="submit"
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </form>

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
