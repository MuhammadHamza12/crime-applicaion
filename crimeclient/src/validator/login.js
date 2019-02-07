import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateinput(data) {
    let errors = {};

    if(Validator.isEmpty(data.identifier)){
        errors.identifier='feild is required!';
    }
    if(Validator.isEmpty(data.password)){
        errors.password='Password is required';
    }
  
    return {
        errors,
        isValid:isEmpty(errors)
    }
}