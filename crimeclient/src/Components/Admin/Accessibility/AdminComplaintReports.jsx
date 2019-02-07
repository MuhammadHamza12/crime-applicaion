import React, { Component } from 'react';
import { Card, CardTitle, CardText, Row, Col, Button,ListGroupItemText , Modal, ModalHeader, ModalBody, Label, FormGroup , ModalFooter ,ListGroup, ListGroupItem , Badge } from 'reactstrap';
import { connect } from 'react-redux';
import {AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation'
import { bindActionCreators } from 'redux';
import * as complaintReportAction from '../../../Actions/ViewComplaintAction/ViewComplaintAction';
import loading from '../../../images/loading.gif';
import config from '../../../config';

class AdminComplaintReports extends Component {
    constructor(props) {
        super(props);
        this.state={
          isLoading:false,
            emailtext:'',
            statusText:'',
           allData:[],
           isLoading:true,   
           dropdownOpen: false,
          status:'',
          select:null,
          modalData:[],
          modal:false,
          nestedModal: false,
          closeAll: false,
          }
          this.handleSubmit = this.handleSubmit.bind(this);
          this.toggleNested = this.toggleNested.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
      }
      renderComponent=()=>{
        if(this.state.isLoading){
          return(
              <div>
                <div style={{textAlign:'center'}} >
                  <img src={loading}  alt="#loader"/>
                  
                  </div>
              </div>
          )
      }
      else {
        
      }
    }  
      toggleNested() {
        this.setState({
          nestedModal: !this.state.nestedModal,
          closeAll: false
        });
      }
      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
      toggle2() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggleAll() {
        this.setState({
          nestedModal: !this.state.nestedModal,
          closeAll: true,
          modal:false,
        });
      }
      
      componentWillReceiveProps=(nextProps)=>{
        this.setState({
        allData:nextProps.allReportData,
        })
      console.log(this.state.allData);
      }
     
      componentDidMount(){
        this.props.actions.getAllUserComplaintReportData(`${config.port}/api/getallusercomplaintdata`)
        .then((res)=>{
          {this.setState({
            isLoading:false,
          })}

          console.log('response' ,res);
        })
        .catch((err)=>{
          console.log(err);
        })
      }
      setStatus=()=>{
          this.setState({
              nestedModal:true,
          })
      }
      setMark =(userDataId)=>{
        const {allData} = this.state;
        allData.map((item,index)=>{
          debugger;
          if(item._id == userDataId ){
            debugger;
            item.adminStatus = 'Acknowledge'   
          }
        }) 
        localStorage.removeItem('tempId');   
        debugger;
        this.setState({
          allData:allData,
        })
      }
      takeOutUser = (userDataId) =>{
          this.setState({
              modalData:[],
          })
          localStorage.setItem('tempId',userDataId);
        const check = userDataId;    
        const {allData} = this.state;

          const modalFilterData=allData.filter((item)=>{
              if(item._id == userDataId){
                console.log('check country', item.userDataId);  
                return true;
              }
              return false;
          })
          this.setState({
              modalData:modalFilterData,
              modal:true,
          })
      }
      onStatusChange=(e)=>{
        switch (e.target.value) {
          case 'Acknowledge':
            this.setState({
              emailtext:'Thanks for submitting a report , we will imediately take an action over your complaint as soon as possible.'
            })
            break;
            
          default:
            break;
        }
      }
      onChange =(e)=>{
        this.setState({
          [e.target.name]:e.target.value,
        })
      }
      isValid(errors,values){
        if(errors.length <= 0)
          return true
          else
          return false;
      }
     
      handleSubmit(event, errors, values) {
        if(this.isValid(errors,values)){
          this.setState({
            isLoading:true,
          })
          debugger;
          console.log(values);
          const data ={};
           const { modalData } = this.state;
           const { _id , email } = modalData[0];
            data.id=_id;
            data.email=email;
            data.complaintStatus=values.complaintStatus;
            data.emailtext=values.emailtext;
            console.log('dat sent', data);
            this.props.actions.postStatusData(`${config.port}/api/getComplaintStatusinfo`,data) 
           .then((res)=>{
             this.setState({
              emailtext:'',
              isLoading:false,
              modal:false,
              nestedModal: false,
              closeAll: false,    
             })
             let key = localStorage.getItem('tempId')
             debugger;
             this.setMark(key);
             console.log('res',res);
           })      
            console.log(values)
        
        }
      
      
      }
    
 
    render() {
       
      const {allData} = this.state;
      const {modalData,statusText} = this.state;
      console.log(statusText);
      const doneStatus = ( <div style={{textAlign:'right',float:'right'}} >
      <i style={{color:'#308014'}} className="fa fa-check-circle-o" aria-hidden="true"></i>
      </div> );
      return(
        
        <div>
      
        <Row>
    <Col sm="12">
      <Card body>
        <CardTitle  > <p style={{fontSize:30}} >Complaint Reports are
          </p> </CardTitle>
        <ListGroup>

  {allData.map((item,index)=>(
      
      <ListGroupItem key={index} onClick={() => this.takeOutUser(item._id)} tag="button" action>  
      <Badge style={{fontSize:18}}  color='secondary'>Reporter # {index+1}</Badge>
        {item.email}
      {(item.adminStatus == 'Acknowledge') ? doneStatus : null }
      </ListGroupItem>
  ))}
  
</ListGroup>
       </Card>
    </Col>
    </Row>

  
 <Modal isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
  toggle={this.toggle2} className={this.props.className}>
  <ModalHeader toggle={this.toggle}>Crime Report Details</ModalHeader>
  <ModalBody>
   {this.state.modalData.map((item,index)=>(
    <ListGroup key={index} >
    <ListGroupItem>Name: {item.name}</ListGroupItem>
    <ListGroupItem>Country: {item.country}</ListGroupItem>
    <ListGroupItem>Description: {item.description}</ListGroupItem>
    <ListGroupItem>AdminStatus: {item.adminStatus}</ListGroupItem>
  </ListGroup>    
   ))}  
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={this.setStatus}>Set Status</Button>{' '}
    <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
      <ModalHeader>Set Status</ModalHeader>
      <ModalBody>
<AvForm onSubmit={this.handleSubmit} >
  <AvGroup>
  <Label for="example">Email with</Label>
  <AvInput type='textarea' onChange={this.onChange} value={this.state.emailtext} name="emailtext" id="emailText" required />
  <AvFeedback>This is an error!</AvFeedback>
</AvGroup>
{/* Radios */}
<AvRadioGroup   name="complaintStatus" label="radioStatus!"  required errorMessage="Pick one!">
  <AvRadio onChange={this.onStatusChange}  label="Acknowledge" value='Acknowledge' />
</AvRadioGroup>


{/* With select and AvField */}


<FormGroup>
  <Button disabled={this.state.isLoading} type='submit'>Submit</Button>
</FormGroup>
</AvForm>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.toggleNested}>Done</Button>{' '}
        <Button color="secondary" onClick={this.toggleAll}>All Done</Button>
      </ModalFooter>
    </Modal>
    <Button color="secondary" onClick={this.toggle2}>Cancel</Button>
  </ModalFooter>
</Modal>
    </div>
      )
    }
}

function mapStateToProps(state) {
    return{
      userId:state.setuser.users.id,
      allReportData :state.setCRRecord,
    }
  }
  function mapDispatchToProps(dispatch) {
    return{
      actions:bindActionCreators(complaintReportAction,dispatch)
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(AdminComplaintReports);