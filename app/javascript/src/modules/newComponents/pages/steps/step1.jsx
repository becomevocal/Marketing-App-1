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
    <Panel header="Storefront">
      <FormGroup>
        <Select
          label="Select Storefront to sync with"
          description="Products from this storefront will be used in the channel"
          onOptionChange={handleChange}
          options={options}
          value={props.storefront}
          placeholder="Select Storefront"
          maxHeight={350}
          required
        />
      </FormGroup>
    </Panel>
  );
}
