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
    props.setGoogleAccessToken(response.getAuthResponse().access_token)
    ApiService.goolgeMerchantIds(response.getAuthResponse().access_token)
      .then(function (response) {
        props.setMerchantIds(response.data.accountIdentifiers)
        props.setStep(4);
      })
      .catch(function (error) {
      })
  }

    return (
      <Panel
      >
        <div style={{textAlign: 'left'}}>
          <H2>
            Authenticate with {process.env.REACT_APP_CHANNEL_PLATFORM_NAME}
          </H2>

          <GoogleLogin
            clientId="1009593719081-a490f6nrlisnommhvuin1vj4o4o9oteb.apps.googleusercontent.com"
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
