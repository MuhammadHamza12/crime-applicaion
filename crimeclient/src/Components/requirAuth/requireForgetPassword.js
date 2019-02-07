import React ,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flashAction from '../../Actions/flashmessageAction/flashmessage';

export default function(ComposeComponent){
 class Authenticate extends Component {
 componentWillMount(){
     if(this.props.auth){
        this.props.history.push('/dashboard');
     }
    
 }
   render() {
    return (

    <ComposeComponent {...this.props}  />
    
    )
  }
}
function mapStateToProps(state) {
    return{
        auth:state.setuser.isAuth,
        flashtxt:state.flashmsg.text,
    flashtype:state.flashmsg.type,
    }
}
function mapDispatchToProps(dispatch) {
    return{
        action:bindActionCreators(flashAction,dispatch)
    }
}
return connect(mapStateToProps,mapDispatchToProps)(Authenticate);
}
