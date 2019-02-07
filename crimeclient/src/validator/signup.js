import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  if (Validator.isEmpty(data.pasconfirm)) {
    errors.pasconfirm = 'Confirmation required';
  }
  if (!Validator.equals(data.password, data.pasconfirm)) {
    errors.pasconfirm = 'Password must match';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}