import React, { useState, useEffect, useCallback} from 'react'
import { Box, Panel, Text, Badge, Input, Table, Button, Modal } from '@bigcommerce/big-design';

import {ApiService} from '../../../../services/apiServices';
import {alertsManager} from "../../../../app";

export default function Step6(props) {
  let { storeId } = props;
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [storeScripts, setStoreScripts] = useState([]);
  const [storeInfo, setStoreInfo] = useState({});
  const [currentScript, setCurrentScript] = useState({});
  const [currentStatus, setCurrentStatus] = useState();
  const [storePropertyId, setStorePropertyId] = useState('');

  function AddAlert(title, details, type) {
    const alert = {
      header: title,
      messages: [
        {
          text: details,
        },
      ],
      type: type,
      onClose: () => null,
      autoDismiss: true
    }
    alertsManager.add(alert);
  }

  function addScript(){
    if(storePropertyId == ''){
      AddAlert('Error', 'Missing Tag, please add or create tag first', 'error')
      return
    }
    ApiService.addScript({property_id: storePropertyId})
    AddAlert('Success', 'Tag added Successfully', 'success')
  }

  function updateStatus(id, status){
    return(
      <>
        { status &&
        <Button onClick={() => setValuesToUpdate(id, 'Disable')} actionType="destructive">Disable</Button>
        }
        { !status  &&
        <Button onClick={() => setValuesToUpdate(id, 'Enable')} variant='secondary'>Enable</Button>
        }
      </>
    )
  }

  function setValuesToUpdate(script_id, status) {
    if(storePropertyId == '' || storePropertyId == null){
      AddAlert('Error', 'Please Add Your Property ID First!', 'error')
      return null;
    }
    setCurrentStatus(status);
    setCurrentScript(storeScripts.find(element => element.id == script_id));
    setOpen(true);
  }

  function handleUpdate(){
    setOpen(false);
    setLoading(true);
    let statusState = currentStatus == 'Enable'? true : false;
    ApiService.updateScript({store_id: storeId, script_id: currentScript.id, status: statusState})
      .then(function (response){
        let newScripts = storeScripts;
        let newScript = storeScripts.find(element => element.id == currentScript.id)
        newScript.status = statusState;
        const findIndex = storeScripts.findIndex( script => script.id === currentScript.id);
        newScripts[findIndex] = newScript;
        setStoreScripts(newScripts);
        AddAlert('Script Update', 'script Has Been Updated Successfully!', 'success')
        setLoading(false);
      })
      . catch(function (error) {
        console.log(error);
        AddAlert('Error', 'Something Went Wrong, Please Try Again!', 'error')
        setLoading(false);
      })
  }

  const onChangeInput = useCallback(
    e => {
      const {value} = e.target;
      setStorePropertyId(value);
    })

  const onUpdateInput= () => {
    updateStoreProperty(storePropertyId);
  }

  function updateStoreProperty(value){
    if(!storeInfo.enabled_scripts){
      AddAlert('Property ID Updated', 'Property ID Added Successfully, Enabling Your Tags !', 'success')
    } else {
      AddAlert('Property ID Updated', 'Property ID Updated Successfully', 'success')
    }
    ApiService.updateStoreProperty({store_id: storeId, new_value: value})
      .then(function (response) {
        if(response.data.store.enabled_scripts && !storeInfo.enabled_scripts){
          AddAlert('Tag Enabled', 'Tags Enabled Successfully!', 'success')
          RefatchScripts();
        }
      })
      .catch(function (error) {
        console.log(error);
        AddAlert('Error', 'Unable To Fetch Data, Please Try Again!', 'error')
      })
  }

  function RefatchScripts(){
    ApiService.getStoreScripts({store_id: storeId})
      .then(function (response) {
        setStoreScripts(response.data.scripts);
        setStoreInfo(response.data.store);
        setStorePropertyId(response.data.store.property_id);
        setLoading(false);
      })
  }

  // useEffect(() => {
  //   ApiService.getStoreScripts({store_id: storeId})
  //     .then(function (response) {
  //       setStoreScripts(response.data.scripts);
  //       setStoreInfo(response.data.store);
  //       setStorePropertyId(response.data.store.property_id);
  //       setLoading(false);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       AddAlert('Error', 'Unable To Fetch Data, Please Try Again!', 'error')
  //     })
  // },[]);

  return(
    <>
      <>
        <Panel header="Tag Settings"
               action={{
                 variant: 'secondary',
                 text: 'Create a Property ID',
                 onClick: () => {
                   setStorePropertyId('9797HKH6666JGFDHLKLK')
                 },
               }}>
          <h4>Property ID</h4>
          <p>This is the ID that your analytics provider uses to identity your business and site</p>
          <div style={{width: '40%'}}>
            <Input
              placeholder="Store Property Id"
              type="text"
              value={storePropertyId}
              onChange={onChangeInput}
            />
          </div>
          <div style={{marginTop: '10px', width: '50px'}}>
            <Button onClick={() => addScript()} style={{float: 'right'}} actionType="normal" isLoading={false} variant="primary">
              Add Script
            </Button>
          </div>
        </Panel>
      </>
    </>
  )}
