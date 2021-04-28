import React, {useContext, useEffect, useState} from "react";
import {
  Panel,
  Input,
  Link,
  H2,
  Button, Flex
} from "@bigcommerce/big-design";
import { CheckCircleIcon, WarningIcon } from '@bigcommerce/big-design-icons';
import {ApiService} from "../../../../services/apiServices";
import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'
const axios = require('axios')


export default function Step4(props) {
  const handleChange = (val) => props.setStorefront(val);

  function responseGoogle(response) {
    ApiService.goolgeMerchantIds(response.getAuthResponse().access_token)
      .then(function (response) {
      })
      .catch(function (error) {
      })
  const responseGoogle = (response) => {
    debugger;
    props.setStep(4);
  }

  return (
    <Panel
    >
      <div style={{textAlign: 'left'}}>
        <H2>
          Authenticate with {process.env.REACT_APP_CHANNEL_PLATFORM_NAME}
        </H2>

        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          render={renderProps => (
            <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          scope={"profile email https://www.googleapis.com/auth/content"}
        />

      </div>
    </Panel>
  );
}
