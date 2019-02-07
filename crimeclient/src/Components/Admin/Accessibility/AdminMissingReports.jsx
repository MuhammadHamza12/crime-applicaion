import React, { Component } from 'react';
import { Card, CardTitle, CardText, Row, Col, Button,ListGroupItemText , Modal, ModalHeader, ModalBody, Label, FormGroup , ModalFooter ,ListGroup, ListGroupItem , Badge } from 'reactstrap';
import { connect } from 'react-redux';
import {AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation'
import { bindActionCreators } from 'redux';
import * as missingReportViewAction from '../../../Actions/ViewMissingReportAction/missingReportViewActions';
import loading from '../../../images/loading.gif';
import config from '../../../config';


class AdminMissingReports extends Component {
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
        this.props.actions.getAllUserMissingData(`${config.port}/api/getallusermissingdata`)
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
      setMark =(userDataId,missingStatus)=>{
        const { allData } = this.state;
        allData.map((item,index)=>{
          debugger;
          if(item._id == userDataId ){
            item.adminStatus = `${missingStatus}`   
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
          debugger;
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
          console.log('form data', values);
           const data ={};
           console.log(values.MissingStatus);
           const { modalData } = this.state;
           const { _id , email } = modalData[0];
            data.id=_id;   
            data.MissingStatus=values.MissingStatus;
            data.emailtext=values.emailtext;
            data.email=email,
            console.log('data for server', data);
          this.props.actions.postStatusData(`${config.port}/api/getMissingStatusinfo`,data) 
           .then((res)=>{
             this.setState({
              emailtext:'',
              isLoading:false,
              modal:false,
              nestedModal: false,
              closeAll: false,    
             })
             let key = localStorage.getItem('tempId');
             debugger;
             this.setMark(key,values.MissingStatus);
             console.log('res',res);
           })      
            console.log(values)
        
        }
      
      
      }
      catchRadioChange=(e)=>{
        const { emailtext } = this.state;  
        console.log(e.target.value)
        switch (e.target.value) {
            case 'In Proccess':
                console.log('your report has been successfully submit and process on your report has in begining stages!');
                this.setState({
                    emailtext:'your report has been successfully submit and process on your report it has in begining stages! when any successfull development occur we will informed you through email and also you can check status from our website',
                })
                break;
            case 'Investigation Done!':
            this.setState({
                emailtext:'Congratulation! your missing person has been tracked for further information contact at our Office',
            })
                break;
            case 'Provided Information not enough':
                this.setState({
                    emailtext:'Sorry, we have faced issue due to the lack of provided information kindly give us an appropriate details so that we can do our job efficiently',        
                })
                break;
            default:
                break;
        }
            
        }
 
    render() {
       
      const {allData} = this.state;
      const {modalData,statusText} = this.state;
      console.log(statusText);
      const doneStatus = ( <div style={{textAlign:'right',float:'right'}} >
      <i  style={{color:'#308014'}} class="fa fa-check-square-o" aria-hidden="true"></i>
      </div> );
      return(
        
        <div>
      
        <Row>
    <Col sm="12">
      <Card body>
        <CardTitle> <p style={{fontSize:30}} >Missing Reports are
          </p> </CardTitle>
        <ListGroup>

  {allData.map((item,index)=>(
      
      <ListGroupItem key={index} onClick={() => this.takeOutUser(item._id)} tag="button" action>  
      <Badge style={{fontSize:18}}  color='dark'>Reporter # {index+1}</Badge>
        {item.email}
      {(item.adminStatus == 'In Proccess' || item.adminStatus == 'Investigation Done!' || item.adminStatus == 'Provided Information not enough' || this.state.isLoading) ? doneStatus : null }
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
    <ListGroupItem>Missing Person: {item.missingname}</ListGroupItem>
    <ListGroupItem>Missing Date: {new Date(item.date).toDateString()}</ListGroupItem>
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
<AvRadioGroup   name="MissingStatus" label="radioStatus!"  required errorMessage="Pick one!">
  <AvRadio  onChange={this.catchRadioChange} label="In Proccess" value='In Proccess' />
  <AvRadio onChange={this.catchRadioChange}  label="Investigation Done!" value='Investigation Done!'  />
  <AvRadio onChange={this.catchRadioChange}  label="Provided Information not enough" value='Provided Information not enough'  />

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
      allReportData :state.setMRRecord,
    }
  }
  function mapDispatchToProps(dispatch) {
    return{
      actions:bindActionCreators(missingReportViewAction,dispatch)
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(AdminMissingReports);