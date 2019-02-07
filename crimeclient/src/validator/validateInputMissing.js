import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import { isNullOrUndefined } from 'util';
export default function validateinput(data) {
    let errors = {};
    if(data.select == 'select any country'){
        data.select=null;
    }
    const check2=isNull(data.select);
    const check =isNull(data.date);
    if(check){
        errors.date='feild is required';
    }
    if(Validator.isEmpty(data.missingname)){
        errors.missingname='feild is required';
    }
    if(Validator.isEmpty(data.name)){
        errors.name='feild is required!';
    }
    if(Validator.isEmpty(data.email)){
        errors.email='email is required';
    }
    
    if(Validator.isEmpty(data.description)){
        errors.description='feild is required';
    }
    if(check2){
        console.log(check);
        errors.select='feild is required';     
      }
    return {
        errors,
        isValid:isEmpty(errors)
    }
}