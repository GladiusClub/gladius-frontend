import { useState, useEffect } from "react";
import { getError, getAllErrors } from "./helper";

export const useValidate = (values) => {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const errors = getAllErrors(values);
    setIsValid(!Object.keys(errors).length);
  }, [values]);

  const validateOnBlur = (name, values) => {
    const newError = getError(name, values);
    setErrors((prev) => ({ ...prev, [name]: newError }));
  };

  const validateOnSubmit = (values) => {
    const newErrors = getAllErrors(values);
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  return { errors, isValid, validateOnBlur, validateOnSubmit };
};
