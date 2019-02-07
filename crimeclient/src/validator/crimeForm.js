import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import { isNullOrUndefined } from 'util';
export default function validateinput(data) {
    let errors = {};
    debugger;
    if(data.select == 'select any country'){
        data.select=null;
    }
    debugger;
    const check =  isNull(data.select);
    console.log('check',check);
    if(Validator.isEmpty(data.name)){
        errors.name='feild is required!';
    }
    if(Validator.isEmpty(data.email)){
        errors.email='email is required';
    }
    
    if(Validator.isEmpty(data.description)){
        errors.description='feild is required';
    }
    
    if(check){
        console.log(check);
        errors.select='feild is required';     
      }
    return {
        errors,
        isValid:isEmpty(errors)
    }
}