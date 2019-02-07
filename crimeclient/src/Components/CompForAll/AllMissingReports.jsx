import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { Input, ListGroup, ListGroupItem,Label ,ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as missingReportViewAction from '../../Actions/ViewMissingReportAction/missingReportViewActions';
import {Container, Alert ,Card, Badge , Button ,  CardTitle, CardText, Row, Col } from 'reactstrap';
import loading from '../../images/loading.gif';
import config from '../../config';
const GREY = "#9E9E9E";

const styles = {
    header: {
      // styles go here!
    },
    well: {
      boxShadow: `3px 3px 1px ${GREY}`,
    },
  };
class AllMissingReports extends Component {
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
      <div>
      
      <h1>Missing reports are</h1>
        <Container>
          
    {/* {((this.state.select == null) || (this.state.select == 'Search By Country')) ? ( <p>no country selcted</p>) :  myFilterCountryList.map((item,index)=>( <li key={index}>{item.country}</li> ))  }  */}

          
          <div style={{padding:40,textAlign:'right',width:'50%'}} >
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
      
      <Col style={{padding:40}} key={index} sm="4"  key={index} sm="4">
      {/* <Card body>
        
      <ListGroup flush>
      <ListGroupItemHeading style={{textAlign:'center'}} >Missing<Badge style={{fontSize:20}} color="secondary">Report # {index+1}</Badge></ListGroupItemHeading>
      <ListGroupItem >Name: {item.name}</ListGroupItem>
      <ListGroupItem >Email: {item.email} </ListGroupItem>
      <ListGroupItem >Missing Person: {item.missingname}</ListGroupItem>
      <ListGroupItem >Missing Date:{new Date(item.date).toDateString()}</ListGroupItem>
      <ListGroupItem >Country: {item.country}</ListGroupItem>
      <ListGroupItem>Description: {item.description}</ListGroupItem>
    </ListGroup><Button color='dark' readOnly>Pending...</Button>
      </Card> */}
       <Card  style={styles.well} body outline color="secondary">
        <CardTitle>Missing Reports # {index+1}</CardTitle>
        <CardText> <Badge style={{fontSize:15}} color='info' >Missing Person Name:</Badge></CardText>
        <CardText>{item.missingname}</CardText>
        <CardText> <Badge style={{fontSize:15}} color='info' >Missing Date:</Badge></CardText>
        <CardText>{new Date(item.date).toDateString()}</CardText>
        <CardText> <Badge style={{fontSize:15}} color='info' >Country:</Badge> </CardText>
        <CardText>{item.country}</CardText>
        <CardText> <Badge style={{fontSize:15}} color='info' >Description:</Badge> </CardText>
        <CardText>{item.description}</CardText>
        <Button>{item.adminStatus}</Button>
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
      
      <div>
      
      <h1>Missing reports are</h1>
        <Container>
          
    {/* {((this.state.select == null) || (this.state.select == 'Search By Country')) ? ( <p>no country selcted</p>) :  myFilterCountryList.map((item,index)=>( <li key={index}>{item.country}</li> ))  }  */}

          
          <div style={{padding:40,textAlign:'right',width:'50%'}} >
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
      
      <Col style={{padding:40}} key={index} sm="4">
      {/* <Card body>
        
      <ListGroup flush>
      <ListGroupItemHeading style={{textAlign:'center'}} >Missing<Badge style={{fontSize:20}} color="secondary">Report # {index+1}</Badge></ListGroupItemHeading>
      <ListGroupItem >Name: {item.name}</ListGroupItem>
      <ListGroupItem >Email: {item.email} </ListGroupItem>
      <ListGroupItem >Missing Person: {item.missingname}</ListGroupItem>
      <ListGroupItem >Missing Date:{new Date(item.date).toDateString()}</ListGroupItem>
      <ListGroupItem >Country: {item.country}</ListGroupItem>
      <ListGroupItem>Description: {item.description}</ListGroupItem>
    </ListGroup><Button color='dark' readOnly>Pending...</Button>
      </Card> */}
       <Card style={styles.well} body outline color="secondary">
        <CardTitle>Missing Report # {index+1}</CardTitle>
        <CardText> <Badge style={{fontSize:15}} color='info' >Missing Person Name:</Badge></CardText>
        <CardText>{item.missingname}</CardText>
        <CardText> <Badge style={{fontSize:15}} color='info' >Missing Date:</Badge></CardText>
        <CardText>{new Date(item.date).toDateString()}</CardText>
        <CardText> <Badge style={{fontSize:15}} color='info' >Country:</Badge> </CardText>
        <CardText>{item.country}</CardText>
        <CardText> <Badge style={{fontSize:15}} color='info' >Description:</Badge> </CardText>
        <CardText>{item.description}</CardText>
        <Button>{item.adminStatus}</Button>
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
    // userId:state.setuser.users.id,
    allReportData :state.setMRRecord,
  }
}
function mapDispatchToProps(dispatch) {
  return{
    actions:bindActionCreators(missingReportViewAction,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AllMissingReports);
