import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateinput(data) {
    let errors = {};

    if(Validator.isEmpty(data.password)){
        errors.password='feild is required!';
    }
    if(Validator.isEmpty(data.cpassword)){
        errors.cpassword='feild is required!';
    }
    if(!Validator.equals(data.password,data.cpassword)){
        errors.cpassword='password not match';
    }
        

   
    return {
        errors,
        isValid:isEmpty(errors)
    }
}