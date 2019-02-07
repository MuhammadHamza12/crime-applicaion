import React, { Component } from 'react'
import { Container , Alert } from 'reactstrap';

 class ForgetConfirm extends Component {
  render() {
    return (
      <div>
        <Container>
            <Alert color='success' >
            we just send an email to you with a link to reset your password
            </Alert>
        </Container>
      </div>
    )
  }
}
export default ForgetConfirm;
