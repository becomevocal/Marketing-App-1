import React, { useEffect, useState } from "react";
import { Panel, FormGroup, Select, ProgressCircle } from "@bigcommerce/big-design";
import { ApiService } from "../../../../services/apiServices";
import { useLocales } from 'react-localized';

export default function MerchantIdSelection(props) {
  const { gettext } = useLocales();
  const [isLoading, setLoading] = useState(false);
  const { googleAccessToken } = props;
  
  const options = props.merchantIds.map((merchantId) => ({ value: merchantId.merchantId,  content: merchantId.merchantId }))

  const handleChange = (val) => {
    props.setSelectedMerchantId(val);
  }

  useEffect(() => {
    setLoading(true);

    ApiService.googleMerchantIds(googleAccessToken)
    .then(function (response) {
      console.log(response.data);
      props.setMerchantIds(response.data.accountIdentifiers);
      setLoading(false);
    })
    .catch(function (error) {
      props.AddAlert(gettext('Error'), gettext('Unable to fetch %s.', 'Google Merchant Center IDs'), 'error')
      setLoading(false);
    })
  }, [])

  return (
    <Panel header={gettext('Google Merchant Center')}>
      {isLoading && <ProgressCircle size="large" />}
      {!isLoading && 
        <FormGroup>
          <Select
            label={gettext('Select the account to connect to your storefront')}
            description={gettext("We'll create a shopping feed inside this account")}
            onOptionChange={handleChange}
            options={options}
            value={props.selectedMerchantId}
            placeholder={gettext('Select account')}
            maxHeight={350}
            required
          />
        </FormGroup>
      }
    </Panel>
  );
}
