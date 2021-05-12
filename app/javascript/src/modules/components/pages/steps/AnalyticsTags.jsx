import React, { useState, useEffect } from 'react'
import { Panel, Input, Button} from '@bigcommerce/big-design';
import { ApiService } from '../../../../services/apiServices';

export default function AnalyticsTags(props) {
  let { storefront } = props;
  console.log(props)
  const [loading, setLoading] = useState(true);
  const [storePropertyId, setStorePropertyId] = useState('');
  console.log(storePropertyId);

  function addScript(e){
    e.preventDefault();
    
    if(storePropertyId == ''){
      props.AddAlert('Error', 'Missing Tag, please add or create tag first', 'error')
      return
    }
    ApiService.addScript({channel_id: storefront, property_id: storePropertyId}).then(response => {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    });
    props.AddAlert('Success', 'Tag added Successfully', 'success')
  }

  return ( 
    <Panel header="Tag Settings"
      action={{
        variant: 'secondary',
        text: 'Create a Property ID',
        onClick: (e) => {
          e.preventDefault();
          setStorePropertyId('9797HKH6666JGFDHLKLK');
        },
      }}
    >
      <h4>Property ID</h4>
      <p>This is the ID that your analytics provider uses to identity your business and site</p>
      <div style={{width: '40%'}}>
        <Input
          placeholder="Store Property Id"
          type="text"
          value={storePropertyId}
          onChange={(e) => setStorePropertyId(e.target.value)}
        />
      </div>
      <div style={{marginTop: '10px', width: '50px'}}>
        <Button onClick={(e) => addScript(e)} style={{float: 'right'}} actionType="normal" isLoading={false} variant="primary">
          Add Script
        </Button>
      </div>
    </Panel>
  )
}
