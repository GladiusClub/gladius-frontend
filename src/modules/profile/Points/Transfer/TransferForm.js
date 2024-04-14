import React, { useState } from "react";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";

import { usePopover } from "components/Popover";
import { AmountAdornment } from "components/OutlinedInput/Adornments";
import OutlinedInput from "components/OutlinedInput";
import Typography from "components/Typography";
import glcTransactionSend from "api/glcTransaction";
import EventBus from "helpers/EventBus";
import { busEvents } from "constants/busEvents";

const sendToSelectProps = {
  inputProps: {
    className: "text-default font-light font-manrope",
    name: "selectedUser",
    required: true,
    autoComplete: "off",
  },
  MenuProps: {
    PaperProps: {
      style: {
        maxHeight: "12rem",
        borderRadius: 0,
      },
    },
  },
  sx: {
    ".MuiSelect-icon": {
      color: "var(--color-default)",
    },
  },
};

const TransferForm = ({ members }) => {
  const [values, setValues] = useState({ selectedUser: "", amount: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const { setAnchorEl } = usePopover();

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
    glcTransactionSend(values.selectedUser, values.amount)
      .then((response) => {
        if (response.to_address) {
          // Emit event to refetch the balance wherever subscribed
          EventBus.emit(busEvents.sendBalanceSuccess);
          setAnchorEl(null); // Close the popover
          setApiError(null);
          toast.success("Successfully sent!");
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
    <form onSubmit={handleSubmit}>
      <FormControl variant="outlined" className="w-full text-default mb-4">
        <InputLabel className="text-sm text-default font-manrope font-light">
          Send to
        </InputLabel>
        <Select
          value={values.selectedUser}
          onChange={handleSelectedUserChange}
          label="Send to"
          {...sendToSelectProps}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {members.map((member) => (
            <MenuItem
              value={member.uid}
              key={member.uid}
              className="flex justify-between"
            >
              <Typography variant="span">{member.name} </Typography>
              <Typography variant="span" className="text-sm text-neutral">
                ({member.email})
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <OutlinedInput
        field={{
          type: "number",
          name: "amount",
          label: "Amount",
          required: true,
        }}
        onBlur={handleAmountChange}
        endAdornment={<AmountAdornment />}
      />

      {apiError && (
        <Typography className="text-info text-sm mb-2">{apiError}</Typography>
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
  );
};

export default TransferForm;
