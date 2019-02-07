import React, { Component } from 'react'
import { Container ,Col, Button, Form, FormGroup, Label, Input ,Row , Alert } from 'reactstrap';
import {connect} from 'react-redux';
import validateInputForget from '../validator/forget';
import Axios from '../../node_modules/axios';
import * as actionFlash from '../Actions/flashmessageAction/flashmessage';
import config from '../config';
import { bindActionCreators } from 'redux';
class Forgetpassword extends Component {
  constructor(props) {
      super(props);
      this.state={
          email:'',
          errors:{},
          errorStatus:false,
          isLoading:false,
      }
  }
  isValid = () =>{
    const { errors , isValid }=validateInputForget(this.state);
      if(!isValid){
        this.setState({errors});
      }

      return isValid;
  }

  onChange=(event)=>{
    this.setState({email:event.target.value})
  }
  handleSubmit=(e)=>{
      e.preventDefault();
      const {errors ,email } = this.state;
      const data={
          email,
      }
    if (this.isValid()) {
        this.setState({errors:{},isLoading:true});
        Axios.post(`${config.port}/api/forgetPass`,data)
        .then((sucess)=>{
            console.log(sucess.data.message)
            const txtmsg = sucess.data.message;
            this.props.actions.flashMessage({type:'emailCon',text:txtmsg})
            this.setState({
                errorStatus:false,
            })
            this.props.history.push('/confirmation');
        })
        .catch((err)=>{
            console.log('it hase some errors');
            console.log(err.response)
            this.setState({
                errorStatus:true,
                isLoading:false,   
            })
        })
    }
      console.log('working!');
  }
  tokenExpire=()=>{
      if((typeof this.props.flashtxt !== 'undefined') && (this.props.flashtype =='expireReset')){
          return(
            <div>
            <Alert color="danger">
             {this.props.flashtxt}
       </Alert>
         </div>
          )
      }
  }
  checkUser = () =>{
      const { errorStatus } = this.state;
     if(errorStatus){
         return(
             <div>
              <Alert color='danger' >
                  No such user exist please check your email!. 
                  </Alert>   
             </div>
         )
     }
    } 
    render() {
        const { isLoading ,errors } = this.state;
    return (
      <div>
          <Container>
              {this.tokenExpire()}
              {this.checkUser()}
     <Row>
     <Col className={'mt-sm-5'} sm='12'  md={{size:5 , offset:2}}  > 
     <Form onSubmit={this.handleSubmit}  >

        <FormGroup >
          <Label for="exampleEmail" hidden>Email</Label>
          <Input type="email" name="email" id="exampleEmail" onChange={this.onChange} value={this.state.email} placeholder="Email" />
          {errors.email && <span style={{color:'#ff0000' }} >{`* ${errors.email}`}</span>}
  
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
function mapStateToProps(state) {
    return{
    flashtxt:state.flashmsg.text,
    flashtype:state.flashmsg.type,
    }
}
function mapDispatchToProps(dispatch) {
    return{
        actions:bindActionCreators(actionFlash,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Forgetpassword);