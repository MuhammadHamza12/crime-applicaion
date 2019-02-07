import React, { Component } from 'react'
import { Container ,Col, Button, Form, FormGroup, Label, Input ,Row , Alert } from 'reactstrap';
import validateInputReset from '../validator/reset';
import Axios from '../../node_modules/axios';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as flashmsg from '../Actions/flashmessageAction/flashmessage';
import config from '../config';
 
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state={
            password:'',
            cpassword:'',
            errors:{},
            isLoading:false,
        }
    }
    
    onChange = (event) => {
        this.setState({
          [event.target.name]:event.target.value,
        });
      }
      isValid = () =>{
        const { errors , isValid }=validateInputReset(this.state);
          if(!isValid){
            this.setState({errors});
          }
    
          return isValid;
      }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log('workiing');
        if(this.isValid()){
            this.setState({errors:{}})
           const query = window.location.search.substring(1);
           const getToken=query.split('=');
           
           const stateData = this.state;
           const data={
               token:getToken[1],
               stateData, 
            }
           Axios.post(`${config.port}/api/paswrdreset`,data)
           .then((res)=>{
               
               this.setState({cpassword:'',password:''})
               if((res.data.status) && (!res.data.message)){
                   this.props.actions.flashMessage({type:'resetSuccess',text:'Successfully Reset Password!'});
                   this.props.history.push('/login');
                }else{
                    this.props.actions.flashMessage({type:'expireReset',text:'This password reset link is no longer valid, Please try again'});          
                  this.props.history.push('/password_forget');
                }
                console.log('in response',res);
           },
           ((error)=>{
               console.log(error);
           })
        )
           
        
        
        }
    }
      
    render() {
        const { errors,isLoading } = this.state;
    return (
      <div>
                     <Container>
                         <p>{this.state.password}</p>
                         <p>{this.state.cpassword}</p>
     <Row>
     <Col className={'mt-sm-5'} sm='12'  md={{size:5 , offset:2}}  > 
     <Form onSubmit={this.handleSubmit}  >

        <FormGroup >
          <Label for="exampleEmail" hidden>PASSWORD</Label>
          <Input type="password" name="password" id="exampleEmail" onChange={this.onChange} value={this.state.email} placeholder="New Password" />
          {errors.password && <span style={{color:'#ff0000' }} >{`* ${errors.password}`}</span>}
  
        </FormGroup>
        <FormGroup >
          <Label for="exampleEmail" hidden>CPASSWORD</Label>
          <Input type="password" name="cpassword" id="examplePAssword1" onChange={this.onChange} value={this.state.email} placeholder="Confirm Password" />
          {errors.cpassword && <span style={{color:'#ff0000' }} >{`* ${errors.cpassword}`}</span>}
  
        </FormGroup>
        <FormGroup>

        <Button disabled={isLoading} >Submit</Button>
        </FormGroup>
     
      </Form>
     </Col>
     </Row>
     
          </Container> 
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
    return{
        actions:bindActionCreators(flashmsg,dispatch),
    }
}
export default connect(null,mapDispatchToProps)(ResetPassword);