export const isDefined = (value) => {
  return value !== undefined && value !== null;
};

export const isJSONString = (str) => {
  try {
    const parsedJSON = JSON.parse(str);
    return typeof parsedJSON === "object" && parsedJSON !== null;
  } catch (error) {
    return false;
  }
};

export const sortArrayInAscByKey = (arr, key) => {
  arr.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    } else if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
};

const generateRandomNumber = (numDigits = 2) => {
  const min = Math.pow(10, numDigits - 1);
  const max = Math.pow(10, numDigits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateEmailFromName = (name, domain = "gladius.com") => {
  // Convert name to lowercase and replace spaces with dots
  const emailName = name.trim().toLowerCase().replace(/\s+/g, ".");
  // Concatenate with random number and domain
  const email = emailName + generateRandomNumber() + "@" + domain;
  return email;
};

export const generatePassword = (passwordLength = 6) => {
  let password = "";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";

  for (let i = 0; i < passwordLength; i++) {
    const randomCharType = Math.random() < 0.5 ? "letter" : "digit";
    if (randomCharType === "letter") {
      const randomIndex = Math.floor(Math.random() * lowercaseLetters.length);
      password += lowercaseLetters[randomIndex];
    } else {
      const randomIndex = Math.floor(Math.random() * digits.length);
      password += digits[randomIndex];
    }
  }

  return password;
};
