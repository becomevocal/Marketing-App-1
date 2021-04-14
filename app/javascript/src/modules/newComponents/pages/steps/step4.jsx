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


export default function Step4(props) {
  const handleChange = (val) => props.setStorefront(val);
  const responseGoogle = (response) => {
    props.setStep(5);
  }

  return (
    <Panel
    >
      <div style={{textAlign: 'left'}}>
        <H2>
          Authenticate with Google account
        </H2>

        <GoogleLogin
          clientId="1090849701177-kq5gufe0g2vssa71lu9jkg1tid11k6ib.apps.googleusercontent.com"
          render={renderProps => (
            <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />

      </div>
    </Panel>
  );
}
