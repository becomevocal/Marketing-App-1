import React, {useContext, useEffect, useState} from "react";
import {
  Panel,
  Input,
  Link,
  H2,
  Small,
  Text,
  Form,
  FormGroup,
  Select
} from "@bigcommerce/big-design";
import { CheckCircleIcon, WarningIcon } from '@bigcommerce/big-design-icons';
import {ApiService} from "../../../../services/apiServices";

export default function Step2(props) {
  return (
    <Panel
    >
      <div style={{textAlign: 'left'}}>
        <H2>
          {props.storefront.name} requirements
        </H2>
        <h4 style={{color: 'gray', marginTop: '-10px'}}>
          Complete each requirements to connect to {props.storefront.name}
        </h4>

        <div style={{borderBottom: '1px solid lightgray'}}>
          <CheckCircleIcon color="success" size="xxLarge" />
          <h3 style={{display: 'inline-block', paddingTop: '5px', marginLeft: '10px'}}>
            Store default currency is set to USD
          </h3>

          <div style={{marginLeft: '40px', marginTop: '-10px', marginBottom: '20px'}}>
            <h5 style={{color: 'gray', marginTop: '-10px'}}>
              {props.storefront.name} supports only payments in USD
              <span style={{display: 'inline-block', float: 'right', marginRight: '50px'}}>
              {/*<Link href="#">Store Currency Is not in USD</Link>*/}
            </span>
            </h5>
          </div>
        </div>

        <div style={{borderBottom: '1px solid lightgray'}}>
          <CheckCircleIcon color="success" size="xxLarge" />
          <h3 style={{display: 'inline-block', paddingTop: '5px', marginLeft: '10px'}}>
            Requirement
          </h3>
          <div style={{marginLeft: '40px', marginTop: '-10px', marginBottom: '20px'}}>
            <h5 style={{color: 'gray', marginTop: '-10px'}}>
              Requirement description
            </h5>
          </div>
        </div>

        <div style={{borderBottom: '1px solid lightgray'}}>
          {/*<WarningIcon color="warning" size="xxLarge" />*/}
          <CheckCircleIcon color="success" size="xxLarge" />
          <h3 style={{display: 'inline-block', paddingTop: '5px', marginLeft: '10px'}}>
            Requirement
          </h3>
          <div style={{marginLeft: '40px', marginTop: '-10px', marginBottom: '20px'}}>
            <h5 style={{color: 'gray', marginTop: '-10px', display: "inline-block"}}>
              Requirement description
            </h5>
            {/*<span style={{display: 'inline-block', float: 'right', marginRight: '50px'}}>*/}
            {/*  <Link href="#">Make required changes</Link>*/}
            {/*</span>*/}
          </div>
        </div>

      </div>
    </Panel>
  );
}
