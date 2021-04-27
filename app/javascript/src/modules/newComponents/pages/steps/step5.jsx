import React, {useContext, useEffect, useState} from "react";
import {
  Panel,
  Input,
  Link,
  H2,
  Button, ProgressCircle
} from "@bigcommerce/big-design";
import { CheckCircleIcon, WarningIcon } from '@bigcommerce/big-design-icons';
import {ApiService} from "../../../../services/apiServices";

export default function Step5(props) {
  useEffect(() => {
    setTimeout(function() {
      props.setStep(5);
    }, 5000);
  })
  return (
    <Panel
    >
      <div style={{textAlign: 'left'}}>
        <H2>
        {process.env.REACT_APP_CHANNEL_PLATFORM_NAME} account
        </H2>
        <h4 style={{color: 'gray', marginTop: '-10px'}}>
          Connect your {process.env.REACT_APP_CHANNEL_PLATFORM_NAME} account with BigCommerce to complete setting up this channel.
        </h4>
        <ProgressCircle size="small" />
      </div>
    </Panel>
  );
}
