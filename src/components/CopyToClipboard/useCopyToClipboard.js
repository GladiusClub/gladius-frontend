import { useState } from "react";

const useCopyToClipboard = () => {
  const [title, setTitle] = useState("Copy");

  const disabled = title !== "Copy";
  const success = title === "Copied!";
  const error = title === "Not copied!";

  const onCopyClicked = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setTitle("Copied!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
        setTitle("Not copied!");
      });
  };

  return { title, disabled, success, error, onCopyClicked };
};

export default useCopyToClipboard;
