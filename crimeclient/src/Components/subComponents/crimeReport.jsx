import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { Alert } from 'reactstrap';
import {Col ,Form, FormGroup, Label, Input, FormText , Badge   } from 'reactstrap';
import  validateInputCrimeReport from '../../validator/crimeForm';

import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import * as crimeActions from '../../Actions/crimeReportActions/crimeActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import config from '../../config';
class CrimeReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      description:'',
      errors:{},
      select:null,
      isLoading:false,
      modal:false,
    }
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  isValid = () =>{
    const { errors , isValid }=validateInputCrimeReport(this.state);
      
    if(!isValid){
        this.setState({errors});
      }

      return isValid;
  }
  onChange=(e)=>{
    this.setState({
      [e.target.name] : e.target.value,
    })
  }
  handleSubmit = (e)=>{
    e.preventDefault();
      console.log(this.state.errors);
    if(this.isValid()){
      this.setState({errors:{},isLoading:true});
      const { email , description , name ,select } = this.state;
      const userDataId = this.props.userId;
      const data = {
        email,
        description,
        name,
        select,
        userDataId,
      }
      this.props.actions.postCrimeDataToServer(`${config.port}/api/sendcrimeData`,data)
      .then((response)=>{
        this.setState({
          modal:true,
          isLoading:false,
          email:'',
          description:'',
          name:'',
          select:'select any country',
        })
        console.log('response after post data, ',response);
      })
      .catch((err)=>{
        console.log('error occur in posting data');
      })
      console.log(this.state);
    }
  }
  handleFocus = (event) => {
    this.setState({select:null});
  }
  render() {
    const { isLoading , email , description , name , country ,errors , select } = this.state;
    return (
      <div>
        <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
        <CardTitle style={{textAlign:'center'}} > <Badge color="danger"><h1>Crime Report</h1></Badge> </CardTitle>
        <hr/>
        <Form onSubmit={this.handleSubmit} > 
        <FormGroup>
          <Label for="exampleName">Name</Label>
          <Input type="text" name="name" onChange={this.onChange} value={name}    id="exampleName" placeholder="Enter-Name" />
          {errors.name && <span style={{color:'#ff0000' }} >{`* ${errors.name}`}</span>}
    
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <InputGroup>
          <Input type="email" name="email" value={email}  onChange={this.onChange} id="exampleEmail" placeholder="Enter-Email" />
          <InputGroupAddon addonType="append">@example.com</InputGroupAddon>
          </InputGroup>
          {errors.email && <span style={{color:'#ff0000' }} >{`* ${errors.email}`}</span>}
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Country</Label>
          <Input onChange={this.onChange} onFocus={this.handleFocus} value={this.state.select || ''}    type="select" name="select" id="exampleSelect">
          <option defaultValue={true} >select any country</option>
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Chichago</option>
            <option>Houston</option>
            <option>Phonix</option>
            <option>San Antonio</option>
            <option>San Deigo</option>
            <option>Dallas</option>
            <option>San Jose</option>

          </Input>
          {errors.select && <span style={{color:'#ff0000' }} >{`* ${errors.select}`}</span>}
          
        </FormGroup>
        <FormGroup>
          <Label for="exampleDescription">Description</Label>
          <Input  value={description} type="textarea" name="description" onChange={this.onChange} id="exampleDescription"  />
          {errors.description && <span style={{color:'#ff0000' }} >{`* ${errors.description}`}</span>}
    
        </FormGroup>  
        <Button disabled={isLoading} >Submit</Button>
      </Form>
      </Card>
      <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Confirmation</ModalHeader>
          <ModalBody>
            <Alert color='success' >
            Report Has Been Successfully Submited
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
    return{
       actions:bindActionCreators(crimeActions,dispatch),  
    }
}
function mapStateToProps(state) {
    return{
    userId:state.setuser.users.id,
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CrimeReport);