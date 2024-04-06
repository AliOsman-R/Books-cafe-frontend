export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/
      );
  };


export const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    // Adjust the minimum length as needed
    const isValidLength = password.length >= 8;
  
    if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isValidLength && password.trim() !== '') {
      return true;
    } else {
      return false;
    }
  }

export const validateMalaysianPhoneNumber = (phoneNumber) => {
  // Regex for validating Malaysian Mobile Numbers (E.g., +6012-3456789, 0123456789)
  console.log(phoneNumber)
  const regex = /^(?:(?:\+?60|0)1[0-9]{8,9}|(?:\+?60|0)3[0-9]{7,8})$/;

  return regex.test(phoneNumber);
}


export const validTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/svg+xml",
];
