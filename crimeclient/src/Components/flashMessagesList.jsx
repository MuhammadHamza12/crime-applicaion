import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Alert } from 'reactstrap'; 
class FlashMessagesList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          visible: true
        };
    
        this.onDismiss = this.onDismiss.bind(this);
      }
    
      onDismiss() {
        this.setState({ visible: false });
      }
      successRender =()=>{
        if(typeof this.props.flashtxt !== 'undefined' && this.props.flashtype == 'loginsuccess')
        return(
          <div style={{float:'right',width:'40%'}} >
          <Alert color='success'  isOpen={this.state.visible} toggle={this.onDismiss} fade={false} >
          {this.props.flashtxt}
        </Alert>

          </div>
          
        )
      }
  render() {
    return (
      <div>
          {this.successRender()}
      </div>
    )
  }
}
function mapStateToProps(state) 
{
    return{
        flashtxt:state.flashmsg.text,
        flashtype:state.flashmsg.type,
    }
    
}
export default connect(mapStateToProps,null)(FlashMessagesList);

