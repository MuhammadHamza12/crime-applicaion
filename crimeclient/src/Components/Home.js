import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Background from '../images/crback.jpg';
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image';

let sectionStyle = {
  marginTop:0,
  height:'auto',  
  backgroundImage: `url(${Background})`,
  backgroundRepeat:'no-repeat',
  backgroundSize:'100%',
  backgroundPosition:'center center',
  padding:'250px 0',
} 
class Home extends Component {
  render() {
    return (
      // <Row>
      // <Col xs="6">.col-6 .col-sm-4</Col>
      // <Col xs="6"  >
      //   <img src={Background}  style={{ width:'70%' ,height:300}} alt="#back"/>
      //   </Col>
      //   </Row>
    <section  className="img-responsive"  style={sectionStyle} >
    </section>       
    )}
  };
export default Home;