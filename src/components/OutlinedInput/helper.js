const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{4,}$/;

const requiredText = {
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm password",
};

export const getError = (name, values) => {
  if (!values[name].trim()) {
    return `${requiredText[name]} is required`;
  }

  switch (name) {
    case "email": {
      if (!emailRegex.test(values[name])) {
        return "Invalid email format";
      }
      break;
    }
    case "password": {
      if (!passwordRegex.test(values[name])) {
        return "Password must be at least 4 characters";
      }
      break;
    }
    case "confirmPassword": {
      if (values[name] !== values.password) {
        return "Passwords do not match";
      }
      break;
    }
    default: {
      return "";
    }
  }
  return "";
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
