import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { Input, ListGroup, ListGroupItem,Label ,ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as crimeViewerActions from '../../../Actions/crimeReportViewerAction/crimeReportAction';
import {Container, Alert ,Card, Badge , Button ,  CardTitle, CardText, Row, Col } from 'reactstrap';
import loading from '../../../images/loading.gif';
import crimeback from '../../../images/back.jpg'
import config from '../.././../config';

const divStyle = {
  width: '100%',
  height: '155px',
  backgroundImage: `url(${crimeback})`,
  backgroundSize: 'cover', 
 
};
class CrimeReportViewer extends Component {
  constructor(props) {
    super(props);
    this.state={
       allData:[],
       isLoading:true,   
       dropdownOpen: false,
      status:'',
      select:null,
      }
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  componentWillReceiveProps=(nextProps)=>{
    this.setState({
    allData:nextProps.allReportData,
    })

  console.log(this.state.allData);

  }
 
  componentDidMount(){
    const userId = this.props.userId;
    const data ={userId}
    this.props.actions.getAllCrimeReportData(`${config.port}/api/sendallcrimereports`,data)
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
  
  onChange =(e)=>{
    this.setState({
      [e.target.name]:e.target.value,
    })
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
  else if(this.state.select == null || this.state.select == 'Search By Country'){



    const {allData,select} = this.state;
    console.log(allData.length)
    {this.state.select}
    
    return (
      <div style={divStyle} >
      
      <h1 style={{color:'#ffff',textAlign:'center'}} >Crime reports </h1>
        <Container style={divStyle} >
          
    {/* {((this.state.select == null) || (this.state.select == 'Search By Country')) ? ( <p>no country selcted</p>) :  myFilterCountryList.map((item,index)=>( <li key={index}>{item.country}</li> ))  }  */}

          
          <div style={{paddingTop:80,textAlign:'right',width:'50%'}} >
          <Input onChange={this.onChange} value={this.state.select || ''}    type="select" name="select" id="exampleSelect">
          <option defaultValue={true} >Search By Country</option>
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
          {this.state.status}
      </div>
      <Row>
      {(allData.length <= 0) ? ( <div style={{width:'100%'}} ><Alert color='info' >No Record Exist</Alert></div> ) : null}
   
    {allData.map((item,index)=>(
      
      <Col style={{padding:30}} key={index} sm="4">
      <Card body>
        
      <ListGroup flush>
      <ListGroupItemHeading style={{textAlign:'center'}} >Crime<Badge style={{fontSize:20}} color="danger">Report #  {index+1}</Badge></ListGroupItemHeading>
      <ListGroupItem >Name: {item.name}</ListGroupItem>
      <ListGroupItem >Email: {item.email} </ListGroupItem>
      <ListGroupItem >Country: {item.country}</ListGroupItem>
      <ListGroupItem>Description: {item.description}</ListGroupItem>
      <p style={{textAlign:'left'}} ><Badge color="secondary">Reported on: {new Date(item.createdOn).toDateString()}</Badge></p>
     </ListGroup><Button color='dark' readOnly>{item.adminStatus || 'Pending...'}</Button>
      </Card>
    </Col> 
    ))}
     
  </Row>
        </Container>
    </div>
        
    )
 
  }
  else if(this.state.select !== null || this.state.select !== 'Search By Country'){
    const { select , allData } = this.state;
    let myFilterCountryList = allData.filter(function(item){
      if(item.country == select){
        console.log("check", item.country)
        return true;
      }
      return false
    })
    console.log('length mylist', myFilterCountryList.length)
    return (
      
      <div style={divStyle} >
      
      <h1 style={{color:'#ffff',textAlign:'center'}} >Crime reports</h1>
        <Container style={divStyle} >
          
    {/* {((this.state.select == null) || (this.state.select == 'Search By Country')) ? ( <p>no country selcted</p>) :  myFilterCountryList.map((item,index)=>( <li key={index}>{item.country}</li> ))  }  */}

          
          <div style={{paddingTop:80,textAlign:'right',width:'50%'}} >
          <Input onChange={this.onChange} value={this.state.select || ''}    type="select" name="select" id="exampleSelect">
          <option defaultValue={true} >Search By Country</option>
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
          {this.state.status}
      </div>
      <Row>
   
    {(myFilterCountryList.length <= 0) ? ( <div style={{width:'100%'}} ><Alert color='info' >No Record Exist</Alert></div> ) : null}
    {myFilterCountryList.map((item,index)=>(
      
      <Col style={{padding:30}} key={index} sm="4">
      <Card body>
        
      <ListGroup flush>
      <ListGroupItemHeading style={{textAlign:'center'}} >Crime<Badge style={{fontSize:20}} color="danger">Report # {index+1}</Badge></ListGroupItemHeading>
      <ListGroupItem >Name: {item.name}</ListGroupItem>
      <ListGroupItem >Email: {item.email} </ListGroupItem>
      <ListGroupItem >Country: {item.country}</ListGroupItem>
      <ListGroupItem>Description: {item.description}</ListGroupItem>
      <p style={{textAlign:'left'}} ><Badge color="secondary">Reported on: {new Date(item.createdOn).toDateString()}</Badge></p>
    </ListGroup><Button color='dark' readOnly>{item.adminStatus || 'Pending...'}</Button>
      </Card>
    </Col> 
    ))}
     
  </Row>
        </Container>
    </div>
        
    )
  }
  
}
  render() {
   
    return (
     <div>
       {this.renderComponent()}
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
export default connect(mapStateToProps,mapDispatchToProps)(CrimeReportViewer);
