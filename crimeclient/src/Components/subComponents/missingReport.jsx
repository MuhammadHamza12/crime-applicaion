import React, { Component } from 'react'
import { Badge ,Card, Button, CardTitle, CardText , Alert } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Col ,Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import validateInputMissingPerson from '../../validator/validateInputMissing';
import { bindActionCreators } from 'redux';
import * as crimeActions from '../../Actions/crimeReportActions/crimeActions';
import { connect } from 'react-redux';
import { isDate } from '../../../node_modules/util';
import config from '../../config';
 class MissingReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      description:'',
      missingname:'',
      errors:{},
      select:null,
      isLoading:false,
      date:null,
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
    const { errors , isValid }=validateInputMissingPerson(this.state);
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
    console.log(this.state.date)
    if(this.isValid()){
      this.setState({errors:{},isLoading:true});
      const { email , description , name ,select , missingname , date } = this.state;
      const userDataId = this.props.userId;
      const data = {
        email,
        description,
        name,
        select,
        missingname,
        date,
        userDataId,
      }
      this.props.actions.postCrimeDataToServer(`${config.port}/api/sendmissiingtData`,data)
      .then((response)=>{
        this.setState({
          modal:true,
          isLoading:false,
          email:'',
          missingname:'',
          description:'',
          name:'',
          date:null,
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


  render() {
    const { isLoading , email , description , name  , errors , missingname , missdate } = this.state;
    return (
      <div>
       <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
        <CardTitle style={{textAlign:'center'}} ><Badge color="secondary"> <h1>Missing Report</h1> </Badge></CardTitle>
        <hr/>
        <Form onSubmit={this.handleSubmit} >
        <FormGroup>
          <Label for="exampleName">Name</Label>
          <Input type="text" name="name" onChange={this.onChange} value={name}    id="exampleName" placeholder="Enter-Name" />
          {errors.name && <span style={{color:'#ff0000' }} >{`* ${errors.name}`}</span>}
    
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" value={email}  onChange={this.onChange} id="exampleEmail" placeholder="Enter-Email" />
          {errors.email && <span style={{color:'#ff0000' }} >{`* ${errors.email}`}</span>}
        </FormGroup>
        <FormGroup>
        <Label for="exampleMissingname">Missing Name</Label>
          <Input type="text" name="missingname" onChange={this.onChange} value={this.state.missingname}    id="exampleName" placeholder="Enter-Missing Person Name" />
          {errors.missingname && <span style={{color:'#ff0000' }} >{`* ${errors.missingname}`}</span>}
    
          </FormGroup>
                <FormGroup>
          <Label for="exampleMissingDate">Missing Date</Label>
          <Input onChange={this.onChange} type="date" name="date" value={this.state.date || ''} id="exampleMissingDate" placeholder="Missing Date" />
          {errors.date && <span style={{color:'#ff0000' }} >{`* ${errors.date}`}</span>}
    
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Country</Label>
          <Input onChange={this.onChange}   type="select" value={this.state.select || ''}  name="select" id="exampleSelect">
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
function mapStateToProps(state) {
    return{
      userId:state.setuser.users.id,
      reportCount:state.setRCount.missingReportCount,
    }
}
function mapDispatchToProps(dispatch) {
  return{
    actions:bindActionCreators(crimeActions,dispatch),  
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MissingReport)