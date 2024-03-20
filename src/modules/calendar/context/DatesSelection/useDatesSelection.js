import { useContext } from "react";

import { DatesSelectionContext } from "./DatesSelectionContext";

const useDatesSelection = () => {
  return useContext(DatesSelectionContext);
};

export default useDatesSelection;
