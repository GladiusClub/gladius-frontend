const usernameRegex = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{4,}$/;

const requiredText = {
  username: "Username",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm password",
};

export const getError = (name, values) => {
  if (!values[name].trim()) {
    return `${requiredText[name]} is required`;
  }

  switch (name) {
    case "username": {
      if (!usernameRegex.test(values[name])) {
        return "Username must be between 3 and 20 characters long and can contain letters, digits, and underscores. It cannot start or end with an underscore";
      }
      break;
    }
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
      return ""
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
