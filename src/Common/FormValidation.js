export const validateEmail = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email);
  };
  
  export const validatePassword = (password) => {
    return password.length >= 6;
  };
  
  export const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  
  export const validateWicEbtNumber = (wicEbtNumber) => {
    let reg = /^\d{16}$/;
    return reg.test(wicEbtNumber);
  };
  
  export const validateBirthDate = (birthDate) => {
    let reg = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return reg.test(birthDate);
  };
  
  export const validateZipCode = (zipCode) => {
    let reg = /^\d{5}$/;
    return reg.test(zipCode);
  };
  