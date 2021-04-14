import React, {useState, useEffect} from 'react'

import { H1, H2, Button, Flex, Box, Text} from '@bigcommerce/big-design';
import { Footer } from "../createSettings/styled";
import Steps from "../steps";
import ConfigurationSteps from "./steps/ConfigurationSteps";
import {alertsManager} from "../../../app";
import {ApiService} from '../../../services/apiServices';
import Loader from "../../components/common/Loader";
import idx from "idx";

export default function configurePage(props) {
  const [step, setStep] = useState(1);
  const [storefront, setStorefront] = useState('');
  const [storeInfo, setStoreInfo] = useState({});
  const [storefrontOptions, setStorefrontOptions] = useState({});
  const [loading, setLoading] = useState(true);

  const responseGoogle = (response) => {
    console.log(response);
  }

  function increaseStep() {
    if (step < 15) {
      setStep(step + 1);
    }
  }

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


  function decreaseStep() {
    if (step > 1) setStep(step - 1);
  }
  useEffect(() =>{
    if(step >1 && storefront === ''){
      setStep(1);
      AddAlert('Error', 'Please select a store first!', 'error')
    }
  }, [step])

  useEffect(() =>{
    ApiService.getChannelsDetails({store_id: props.currentStore})
      .then(function (response) {
        setStorefrontOptions(response.data.store.data);
        setLoading(false);
      })
      .catch(function (error) {
        AddAlert('Error', 'Unable To Fetch Data, Please Try Again!', 'error')
      })
  }, [])

  return (
    <>
      {loading &&
      <Loader/>
      }
      {!loading &&
      <Flex flexDirection="column" marginTop="medium">
        <div>

          <div style={{marginLeft: '50px'}}>
            <>
              { step < 8 &&
              <>
                <h1 style={{color: 'gray',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  lineHeight: '2rem'}}>
                  Set up { storefront || '<Channel name>'} channel
                </h1>
                <Steps step={step}></Steps>
              </>
              }
            </>
            <ConfigurationSteps
              step={step}
              setStep={setStep}
              storeInfo={props.storeInfo}
              storefront={storefront}
              setStorefront={setStorefront}
              AddAlert={AddAlert}
              storefrontOptions={storefrontOptions}
              setStorefrontOptions={setStorefrontOptions}
              currentStore={props.currentStore}
            />
          </div>
        </div>

        <Footer>
          <Box>
            <Button variant="primary" onClick={increaseStep}>
              Continue
            </Button>
          </Box>
        </Footer>
      </Flex>
      }
    </>
  )
}
