export const getError = (name, values) => {
  let error = "";
  switch (name) {
    case "username": {
      if (!values[name].trim()) {
        error = "Username is required";
      }
      break;
    }
    case "email": {
      if (!values[name].trim()) {
        error = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[name])) {
        error = "Invalid email format";
      }
      break;
    }
    case "password": {
      if (!values[name].trim()) {
        error = "Password is required";
      }
      break;
    }
    case "confirmPassword": {
      if (!values[name].trim()) {
        error = "Confirm Password is required";
      } else if (values[name] !== values.password) {
        error = "Passwords do not match";
      }
      break;
    }
    default: {
    }
  }
  return error;
};

export const getAllErrors = (values) => {
  const errors = {};
  for (let key in values) {
    const error = getError(key, values);
    if (error) {
      errors[key] = error;
    }
  }
  return errors;
};
