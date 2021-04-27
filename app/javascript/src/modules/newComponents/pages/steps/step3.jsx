import React, {useContext, useEffect, useState} from "react";
import {
  Panel,
  Input,
  Link,
  H2,
  Button
} from "@bigcommerce/big-design";
import { CheckCircleIcon, WarningIcon } from '@bigcommerce/big-design-icons';
import {ApiService} from "../../../../services/apiServices";

export default function Step3(props) {
  const handleChange = (val) => props.setStorefront(val);

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

        <Button onClick={() => props.setStep(3)} actionType="normal" isLoading={false} variant="primary">
          Connect with with {process.env.REACT_APP_CHANNEL_PLATFORM_NAME}
        </Button>

      </div>
    </Panel>
  );
}
