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

export default function Step1(props) {
  const options = props.storefrontOptions.map((storeOption) => ({ value: storeOption.name,  content: storeOption.name }))

  const handleChange = (val) => {
    props.AddAlert('Success', 'Store Selected Successfully', 'success')
    props.setStorefront(val);
  }

  return (
    <Panel
    >
      <div style={{textAlign: 'left'}}>
        <H2>
          Storefront
        </H2>
        <h3>Select Storefront to sync with</h3>
        <h3 style={{color: 'gray'}}>Products from this storefront will be used in the channel</h3>
      </div>

      <Form>
        <FormGroup>
          <Select
            maxHeight={350}
            onOptionChange={() => null}
            onOptionChange={handleChange}
            options={options}
            value={props.storefront}
            placeholder="Select Storefront"
            required
          />
        </FormGroup>
      </Form>
    </Panel>
  );
}
