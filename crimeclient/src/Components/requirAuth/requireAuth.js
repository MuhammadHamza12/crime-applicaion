import React ,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flashAction from '../../Actions/flashmessageAction/flashmessage';
import * as checkTokenStatus  from '../../Actions/dashBoardActions.js/dashboardActions';
import loading from '../../images/loading.gif';
//loading.gif';
export default function(ComposeComponent){
 class Authenticate extends Component {
 state={
     isLoading:true,
 }
    componentWillMount(){
     if(!this.props.auth){
         this.props.action.flashMessage(
             {type:'autherror',
             text:'You need to first signIn to access this page!',}
         );
         this.props.history.push('/signUp');
     }
     
 }
componentDidMount(){
    this.setState({
        isLoading:false,
    })
}
 renderComponent=()=>{
    if(this.state.isLoading){
      return(
          <div>
            <div>
              <img src={loading}  alt="#loader"/>
              </div>
          </div>
      )
  }
  else {
     return(
    <div>
        <ComposeComponent {...this.props}  />
        </div>
    )
}
  }
 componentWillUpdate(props){
     if(!props.auth){
         this.props.history.push('/login')
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
        auth:state.setuser.isAuth,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        action_1:bindActionCreators(checkTokenStatus,dispatch),
        action:bindActionCreators(flashAction,dispatch)
    }
}
return connect(mapStateToProps,mapDispatchToProps)(Authenticate);
}
