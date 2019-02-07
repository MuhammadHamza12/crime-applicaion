import React, { Component } from 'react';
import { Card, CardTitle, CardText, Row, Col, Button,ListGroupItemText , Modal, ModalHeader, ModalBody, Label, FormGroup , ModalFooter ,ListGroup, ListGroupItem , Badge } from 'reactstrap';
import { connect } from 'react-redux';
import {AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation'
import { bindActionCreators } from 'redux';
import * as crimeViewerActions from '../../../Actions/crimeReportViewerAction/crimeReportAction';
import loading from '../../../images/loading.gif';
import config from '../../../config';
import { debug } from 'util';

class AdminCrimeReport extends Component {
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
        this.props.actions.getAllUserCrimeReportData(`${config.port}/api/getallusercrimedata`)
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
                localStorage.setItem('tempEmail',item.email);
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
          case 'Reviewed':
            this.setState({
              emailtext:' Thanks for become a part of our helping service through this reports lots of people avoid to go such places where this kind of worst experiences people had faced.'
            })
            break;
            
          default:
            break;
        }
      }
      setMark =(userDataId)=>{
        const {allData} = this.state;
        allData.map((item,index)=>{
          if(item._id == userDataId ){
            item.adminStatus = 'Reviewed'   
          }
        }) 
        localStorage.removeItem('tempId');   
        this.setState({
          allData:allData,
        })
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
      reload = () => {
        this.props.history.push('/dashboard/ReportManager/AllDetailsCrimeReport');
     }
      handleSubmit(event, errors, values) {
        if(this.isValid(errors,values)){
          this.setState({
            isLoading:true,
          })
           const data ={};
           const { modalData } = this.state;
           const { _id , email } = modalData[0];
           data.id=_id; 
           data.email=email;
           data.emailtext=values.emailtext
           data.crimeStatus = values.Status;
          this.props.actions.postStatusData(`${config.port}/api/getCrimeStatusinfo`,data) 
           .then((res)=>{
             this.setState({
              emailtext:'',
              isLoading:false,
              modal:false,
              nestedModal: false,
              closeAll: false,    
             })
            
           let keyId = localStorage.getItem('tempId');
           debugger;
           this.setMark(keyId); 
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
        <CardTitle  > <p style={{fontSize:30}} >Crime Reports are
          </p> </CardTitle>
        <ListGroup>

  {allData.map((item,index)=>(
      
      <ListGroupItem key={index} onClick={() => this.takeOutUser(item._id)} tag="button" action>  
      <Badge style={{fontSize:18}}  color='danger'>Reporter # {index+1}</Badge>
        {item.email}
      {(item.adminStatus == 'Reviewed' || this.state.isLoading) ? doneStatus : null }
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
<AvRadioGroup   name="Status" label="radioStatus!"  required errorMessage="Pick one!">
  <AvRadio onChange={this.onStatusChange}  label="Reviewed" value='Reviewed' />
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
      allReportData :state.setARRecord,
    }
  }
  function mapDispatchToProps(dispatch) {
    return{
      actions:bindActionCreators(crimeViewerActions,dispatch)
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(AdminCrimeReport);