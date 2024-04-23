import React, { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";

import Select from "components/Select";
import { usePopover } from "components/Popover";
import { AmountAdornment } from "components/OutlinedInput/Adornments";
import OutlinedInput from "components/OutlinedInput";
import Typography from "components/Typography";
import useUserProfile from "context/userProfile/useUserProfile";
import { glcTransactionSend } from "api/stellarWallet";
import EventBus from "helpers/EventBus";
import { busEvents } from "constants/busEvents";

const TransferForm = ({ members }) => {
  const [values, setValues] = useState({ selectedUser: "", amount: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const { user } = useUserProfile();
  const { setAnchorEl } = usePopover();

  const clubMembers = useMemo(() => {
    return members.filter((member) => member.uid !== user.uid);
  }, [members, user.uid]);

  const handleSelectedUserChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
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
      <Select
        value={values.selectedUser}
        name="selectedUser"
        label="Send to"
        onChange={handleSelectedUserChange}
      >
        {clubMembers.map((member) => (
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
