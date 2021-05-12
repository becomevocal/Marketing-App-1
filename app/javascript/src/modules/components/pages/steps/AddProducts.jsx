import React, { useEffect, useState } from "react";
import { Panel, Box, ProgressBar, Text, Small } from "@bigcommerce/big-design";
import { ApiService } from "../../../../services/apiServices";
import { useLocales } from 'react-localized';

export default function AddProducts(props) {
  const { gettext } = useLocales();
  const [isLoading, setLoading] = useState(false);
  const [syncData, setSyncData] = useState({ status: null });
  const syncIsRunning = (syncData.status !== null && syncData.status !== 'complete');

  const addProducts = (e) => {
    e.preventDefault();
    setLoading(true);
    
    ApiService.startShoppingFeedSync({
      google_auth_token: props.googleAccessToken,
      merchant_id: props.selectedMerchantId,
      channel_id: props.storefront.channel_id
    })
    .then(response => {
      setSyncData(response.data);
      checkSyncStatus();
      setLoading(false);
    })
    .catch(function (error) {
      props.AddAlert(gettext('Error'), gettext('An error occurred while starting sync: %s', error), 'error');
      setLoading(false);
    });

    props.AddAlert(gettext('Success'), gettext('Catalog sync has started.'), 'success')
  }

  const checkSyncStatus = () => {
    ApiService.checkShoppingFeedSync({
      google_auth_token: props.googleAccessToken,
      merchant_id: props.selectedMerchantId,
      channel_id: props.storefront.channel_id
    })
    .then(response => {
      setSyncData(response.data);
    })
    .catch(function (error) {
      props.AddAlert(gettext('Error'), gettext('An error occurred while checking sync: %s', error), 'error');
    });
  }

  const percentStatus = () => {
    return (syncData?.loop && syncData?.of) ? 
      (syncData.loop / syncData.of) * 100 :
      null;
  }

  const readableStatus = () => {
    let statusText = '';

    if (syncData.status === 'reading' && syncData.platform === 'bigcommerce') {
      statusText = gettext('Fetching %s of %s pages of products from BigCommerce', syncData.loop, syncData.of);
    } else if (syncData.status === 'writing' && syncData.platform === 'google') {
      statusText = gettext('Writing %s of %s product variants into a feed', syncData.loop, syncData.of);
    }

    return statusText;
  }

  useEffect(() => {
    if (syncIsRunning) {
      setTimeout(checkSyncStatus(), 3000);
    }
  }, [syncData]);

  return (
    <Panel
      header={gettext('Get started by adding products')}
      action={{
        variant: 'primary',
        text: gettext('Add products'),
        onClick: addProducts,
        disabled: syncIsRunning,
        isLoading
      }}
    >
      {!syncIsRunning && <Text>{gettext('Add products from your BigCommerce catalog to this channel.')}</Text>}

      {syncData.status &&
        <Box marginVertical="large">
          <Small>
            {gettext("While the feed is being processed in the background you can leave this screen and come back later when it's complete.")}
          </Small>
          {syncData.status !== 'writing' && <ProgressBar />}
          {syncData.status === 'writing' && <ProgressBar percent={percentStatus()} />}
          <Box marginTop="small">
            <Small>
              {readableStatus()}
            </Small>
          </Box>
        </Box>
      }
    </Panel>
  );
}
