import React, {useContext, useEffect, useState} from "react";
import {
  Panel,
  Input,
  Link,
  H2,
  Button, ProgressCircle, Badge
} from "@bigcommerce/big-design";
import { CheckCircleIcon, WarningIcon } from '@bigcommerce/big-design-icons';
import {ApiService} from "../../../../services/apiServices";

export default function Step8(props) {
  return (
    <Panel
    >
      <div style={{textAlign: 'left'}}>
        <H2>
          {props.storefront}
          <span style={{marginLeft: '100px'}}>
            <Badge label="connected" variant="success" />
         </span>
          <span style={{float: "right"}}> <Button s variant="secondary">Switch Account</Button></span>
        </H2>
        <div>
          <div style={{display: "inline-block", width: '30px', height: '30px', background: "lightgray", borderRadius: '5px'}}></div>
          <div style={{display: "inline-block"}}>
            <h4 style={{marginLeft: '10px',color: 'gray', marginTop: '-100px', display: "inline-block"}}>
              dummy-user@test-compant.com
            </h4>
          </div>
        </div>
      </div>
    </Panel>
  );
}
