import React, { Component } from 'react';
import * as serverActions from '../Actions/serverSideActions';
import validateInput from '../validator/signup';
import { Redirect, Link,BrowserRouter,withRouter } from 'react-router-dom';      
import {bindActionCreators} from 'redux';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
  import GoogleLogin from 'react-google-login';
  import FacebookLogin from 'react-facebook-login';
import * as keys from '../config';
import {connect} from 'react-redux';
import * as signupAction from '../Actions/signupActions/signupActions';
import * as flashmsgAction from '../Actions/flashmessageAction/flashmessage';
import { Alert,Row,Container,Col ,Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Badge } from 'reactstrap';
import axios from 'axios';
import * as loginActions from '../Actions/loginActions/loginAction';
import config from '../config';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state={
      username:'',
      email:'',
      password:'',
      pasconfirm:'',
      errors:{},
      checkError:false,
      isLoading:false,
    }
  }
  isValid =()=>{
    
    const { errors , isValid} = validateInput(this.state)
     if(!isValid){
       this.setState({errors});
     }

     return isValid;
  }
  handleSubmit=(event)=>{
    event.preventDefault();

    if(this.isValid()){

      this.setState({error:{},isLoading:true});
      const userDetails = this.state;
      const options = {
        method:'POST',
        headers:{
            "Content-Type":"application/json"},
            data:JSON.stringify({bodyData:userDetails}),
            url:`${config.port}/api/users`,
      }
      axios(options)
      .then(
        (response)=>{
          console.log(response)
          // console.log("coming resp: "+response.data);
         
          if(response.data.data.name && response.data.data.message){
            console.log('user is not unique')
            this.props.history.push('/signUp')
            this.setState({
              isLoading:false,
              checkError:true,
            })
          }else{
            console.log('wroking')
           
            const userOBJ={
              username:response.data.data.username,
              email:response.data.data.email,
              id:response.data.data._id,
            }
            
            this.props.actions.signin(response.data.data)
            
            this.setState({
              checkError:false,
            })
            this.props.actions.signUpSaveToken(userOBJ)
            .then(
              (res) =>{
                this.props.actions_1.flashMessage({type:'loginsuccess' , text:'you have successfully login!'});
                this.props.history.push('/dashboard')
                console.log(res)
              }
            ) 
        }
        },
         ((error) => { 
           this.setState({errors:error.response.data,isLoading:false}) 
        }
      ))    
  }
}
  onChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value,
    });
  }
//Autentication hanlder Phase
responseFacebook = (response) => {
  console.log(response);
  const { email , id , name } = response;
  const facebookData = {
    email,
    id,
    name,
    picUrl:response.picture.data.url,
  }
  this.props.action.commonLogin(`${config.port}/auth/authFacebook`,facebookData)
  .then(
    (success)=>{
      this.props.actions_1.flashMessage({type:'loginsuccess' , text:'you have successfully login!'});
      this.props.history.push('/dashboard/Profile');
      console.log('user will going to save');
    },
    ((error) => { 
      console.log('error occur', error);
    }
 )
  )

}
responseGoogle = (response) => {
  console.log(response);
  console.log(response.profileObj);
  const googleUserData=response.profileObj;
  this.props.action.googleLogin(googleUserData)
  .then(
    (sucess)=>{
      this.props.actions_1.flashMessage({type:'loginsuccess' , text:'you have successfully login!'});
       this.props.history.push('/dashboard/Profile')    
     console.log('user going to login',sucess);
  },((error) => { 
    console.log('error occur', error);
  }
))
}



//end Authentication phase

  loginError =()=>{
   
    if ((!this.props.auth) && (typeof this.props.flashtxt !== 'undefined') &&(this.props.flashtype == 'autherror' ) ) {
      return(
        <div>
           <Alert color="danger">
            {this.props.flashtxt}
      </Alert>
        </div> 
        );
  }
}
  displayError =(Errormsg) => {

   if(this.state.checkError){
     return(
       <div>
          <Alert color="danger">
            {Errormsg}
      </Alert>
       </div>
     )
   }
 
  }
  render(){
    const {errors} = this.state;
    return (
      <div >
          <Container>
          <Row>
             
          <Col xs="8"  >
          <Card style={{border:'1px solid #FFf',width:'100%',boxShadow: `5px 5px 5px #9E9E9E`,borderRadius:5}}  body >
              <h1>
        <Badge color="warning">Sign Up</Badge>
          </h1> 
       {this.displayError('Username and Email must be unique')} 
       {this.loginError()}
       
       <Form onSubmit={this.handleSubmit}  >
       <FormGroup  >
          <Label sm={4} for="exampleUsername">Username:</Label>
        <Col sm={8} >
         
          <Input type="text"  value={this.state.username}  name="username" onChange={this.onChange} placeholder="Enter-Username" />
           
        {errors.username && <span style={{color:'#ff0000' }} >{`* ${errors.username}`}</span>}
        </Col>
        </FormGroup>
        <FormGroup>
          <Label sm={4} for="exampleEmail">Email:</Label>
        <Col sm={8} >
          <Input type="email" value={this.state.email} name="email" id="email" onChange={this.onChange} placeholder="Enter-Email" />
          {errors.email && <span style={{color:'#ff0000' }} >{`* ${errors.email}`}</span>}
               
        </Col>
        </FormGroup>
        <FormGroup>
          <Label className='has-error'  sm={4} for="Password">Password</Label>
          <Col sm={8} >
          <Input type="password" value={this.state.password}  name="password" onChange={this.onChange} id="sPassword" placeholder="Enter-Password" />
          {errors.password && <span style={{color:'#ff0000' }} >{`* ${errors.password}`}</span>}
       
          </Col>
        </FormGroup>
        <FormGroup>
          <Label sm={8} for="Password"> Confirmation-Password</Label>
          <Col sm={8} >
          <Input type="password" name="pasconfirm" value={this.state.pasconfirm}    onChange={this.onChange} id="cPassword" placeholder="Confirmation-Password" />
          {errors.pasconfirm && <span style={{color:'#ff0000' }} >{`* ${errors.pasconfirm}`}</span>}
          </Col>
        </FormGroup>
     
        <Col sm={8} >
        <Button disabled={this.state.isLoading}  type='submit' >Submit</Button>
        </Col>
      </Form>
      </Card>
          

</Col>

          <Col >
          <Card style={{boxShadow: `5px 5px 5px #9E9E9E`,borderRadius:5}}  >
        <CardBody xs="4" >
          <CardTitle>Other Sign In Options</CardTitle>
          <Col style={{paddingTop:30}} sm={4} >
        <GoogleLogin
        disabled={this.state.isLoading}
    clientId={keys.GoogleClientId}
    buttonText="Login with Google +"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
   />
         </Col>
         <Col style={{paddingTop:30}} >
         <FacebookLogin
         isDisabled={this.state.isLoading}
    appId={keys.FacebookClientId}
    autoLoad={false}
    fields="name,email,picture"
    callback={this.responseFacebook}
    icon={<i className="fa fa-facebook-official" style={{fontSize:20}} aria-hidden="true"></i>
  }
    />
         
         </Col>       
        </CardBody>
      </Card>
      </Col>
        </Row>
     
      </Container>
    
      </div>
    )
  }
}
function mapStateToProps(state) {
  
  return {
    errors:state.signup,
    auth:state.setuser.isAuth,
    flashtxt:state.flashmsg.text,
    flashtype:state.flashmsg.type,
 }
}
function mapDispatchToProps(dispatch) {
  return {
    actions_1:bindActionCreators(flashmsgAction,dispatch), 
    actions:bindActionCreators(signupAction,dispatch),
    action:bindActionCreators(loginActions,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);