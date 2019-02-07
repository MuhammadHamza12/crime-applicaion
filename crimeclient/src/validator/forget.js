import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateinput(data) {
    let errors = {};

    if(Validator.isEmpty(data.email)){
        errors.email='feild is required!';
    }
   
    return {
        errors,
        isValid:isEmpty(errors)
    }
}