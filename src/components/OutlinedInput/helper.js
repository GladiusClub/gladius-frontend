const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{6,}$/;

const requiredText = {
  email: "Email",
  password: "Password",
  guardianName: "Guardian name",
  guardianEmail: "Guardian email",
  guardianPassword: "Guardian password",
  guardianConfirmPassword: "Guardian confirm password",
  studentName: "Student name",
  club: "Club",
  group: "Course",
};

export const getError = (name, values) => {
  if (!values[name].trim()) {
    return `${requiredText[name]} is required`;
  }

  switch (name) {
    case "email":
    case "guardianEmail": {
      if (!emailRegex.test(values[name])) {
        return "Invalid email format";
      }
      break;
    }
    case "password":
    case "guardianPassword": {
      if (!passwordRegex.test(values[name])) {
        return "Password must be at least 6 characters";
      }
      break;
    }
    case "guardianConfirmPassword": {
      if (values[name] !== values.guardianPassword) {
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
