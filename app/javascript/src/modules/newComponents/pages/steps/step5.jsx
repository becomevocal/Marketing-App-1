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

export default function Step5(props) {
  const options = props.merchantIds.map((merchantId) => ({ value: merchantId.merchantId,  content: merchantId.merchantId }))

  const handleChange = (val) => {
    props.AddAlert('Success', 'MerchantId Selected Successfully', 'success')
    props.setSelectedMerchantId(val);
    props.setStep(5);
  }

  return (
    <Panel header="Storefront">
      <FormGroup>
        <Select
          label="Select the Merchant ID to connect to your storefront"
          description="We'll use this to create a Google Shopping feed inside your Merchant Center account"
          onOptionChange={handleChange}
          options={options}
          value={props.selectedMerchantId}
          placeholder="Select Merchant ID"
          maxHeight={350}
          required
        />
      </FormGroup>
    </Panel>
  );
}
