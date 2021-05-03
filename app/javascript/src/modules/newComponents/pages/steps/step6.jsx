import React, { useEffect, useState } from "react";
import { Panel, Box, ProgressBar, Text, Small } from "@bigcommerce/big-design";
import {ApiService} from "../../../../services/apiServices";

export default function Step6(props) {
  const [isLoading, setLoading] = useState(false);
  const [syncData, setSyncData] = useState({ status: null });
  const syncIsRunning = (syncData.status !== null && syncData.status !== 'complete');

  const addProducts = (e) => {
    e.preventDefault();
    setLoading(true);
    
    ApiService.startShoppingFeedSync({
      google_auth_token: props.googleAccessToken,
      merchant_id: props.selectedMerchantId,
      channel_id: props.storefront,
      store_id: props.currentStore
    })
    .then(response => {
      setSyncData(response.data);
      checkSyncStatus();
      setLoading(false);
    })
    .catch(function (error) {
      props.AddAlert('Error', `An error occurred while starting sync: ${error}`, 'error');
      setLoading(false);
    });

    props.AddAlert('Success', 'Sync Started Successfully', 'success')
  }

  const checkSyncStatus = () => {
    ApiService.checkShoppingFeedSync({
      google_auth_token: props.googleAccessToken,
      merchant_id: props.selectedMerchantId,
      channel_id: props.storefront,
      store_id: props.currentStore
    })
    .then(response => {
      setSyncData(response.data);
    })
    .catch(function (error) {
      props.AddAlert('Error', `An error occurred while checking sync: ${error}`, 'error');
    });
  }

  useEffect(() => {
    if (syncIsRunning) {
      setTimeout(checkSyncStatus(), 3000);
    }
  }, [syncData]);

  return (
    <Panel
      header="Get started by adding products"
      action={{
        variant: 'primary',
        text: 'Add products',
        onClick: addProducts,
        disabled: syncIsRunning,
        isLoading
      }}
    >
      {!syncIsRunning && <Text>Add products from your BigCommerce catalog to this channel.</Text>}

      {syncData.status &&
        <Box marginVertical="large">
          <Small>
            While the feed is being processed in the background you can leave this
            screen and come back later when it's complete.
          </Small>
          {syncData.status !== 'writing' && <ProgressBar />}
          {syncData.status === 'writing' && <ProgressBar percent={(syncData.loop / syncData.of) * 100} />}
          <Box marginTop="small">
            <Small>
              {syncData.readable}
            </Small>
          </Box>
        </Box>
      }
    </Panel>
  );
}
