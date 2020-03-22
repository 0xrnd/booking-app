import { isEmpty } from "../utils/isEmpty";
import { User } from "../types/user";
import { ValidationResponse } from "../types/validation-response";
const validator = require('validator')
const zxcvbn = require('zxcvbn')

export const isMailValid = (mail: string): ValidationResponse => {
  if (isEmpty(mail)) {
    return {
      isValid: false,
      errorMessage: "Η διευθυνσή email δεν μπορεί να είναι κενη",
      formValidationStatus: "warning"
    };
  }

  if (!validator.isEmail(mail)) {
    return {
      isValid: false,
      errorMessage: "Η διευθυνσή email δεν εχεί σωστη μορφή",
      formValidationStatus: "warning"
    };
  }

  return {
    isValid: true,
    formValidationStatus: "success"
  };
};

export const isFullNameValid = (name: string): ValidationResponse => {
  if (isEmpty(name)) {
    return {
      isValid: false,
      errorMessage: "Το πληρες ονομα δεν μπορει να ειναι κενο ",
      formValidationStatus: "warning"
    };
  }

  if (!/[^%]{3,}/g.test(name)) {
    return {
      isValid: false,
      errorMessage: "Το πληρες ονομα δεν ειναι σωστο",
      formValidationStatus: "warning"
    };
  }

  return {
    isValid: true,
    formValidationStatus: "success"
  };
};

export const isPasswordValid = (password: string): ValidationResponse => {
  if (isEmpty(password)) {
    return {
      isValid: false,
      formValidationStatus: "warning",
      errorMessage: "Ο κώδικος δεν μπορει να ειναι κενος"
    };
  }

  if (zxcvbn(password).score < 2) {
    return {
      isValid: false,
      formValidationStatus: "warning",
      errorMessage: "Ο κώδικος δεν ειναι αρκετα δυνατος"
    };
  }

  return {
    isValid: true,
    formValidationStatus: "success"
  };
};

export const isAccountValid = (account: User): boolean => {
  const { mail, password, fullName } = account;

  if (
    isMailValid(mail).isValid &&
    isPasswordValid(password).isValid &&
    isFullNameValid(fullName).isValid
  ) {
    return true;
  }

  return false;
};
