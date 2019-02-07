import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import setAuthorizationToken from './webToken/setAuthorizationToken';
import { setCurrentUser } from './Actions/setCurrentUser/setCurrentUser';
import jwt from 'jsonwebtoken';
const store = configureStore();
// import Bootstrap1 from 'bootstrap/dist/js/bootstrap';
if(localStorage.jwtToken){
setAuthorizationToken(localStorage.jwtToken);
store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));  
}
ReactDOM.render(
    <Provider store={store} >
    <App />
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
