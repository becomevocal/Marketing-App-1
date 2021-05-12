import React from "react";
import { Panel, FormGroup, Select } from "@bigcommerce/big-design";
import _ from "lodash";
import { useLocales } from 'react-localized';

export default function StorefrontSelection(props) {
  const { gettext } = useLocales();

  const storefrontChannelsList = props.storefrontOptions.map((storeOption) => ({ value: storeOption.id,  content: storeOption.name }))

  const handleChange = (channelId) => {
    const selectedStorefront = _.find(storefrontChannelsList, { value: channelId });
    
    props.setStorefront({
      channel_id: selectedStorefront.value,
      name: selectedStorefront.content
    });
  }

  return (
    <Panel header={gettext('Storefront')}>
      <FormGroup>
        <Select
          label={gettext('Select storefront to sync with')}
          description={gettext('Products from this storefront will be used in the channel')}
          onOptionChange={handleChange}
          options={storefrontChannelsList}
          value={props.storefront.channel_id}
          placeholder={gettext('Select Storefront')}
          maxHeight={350}
          required
        />
      </FormGroup>
    </Panel>
  );
}
