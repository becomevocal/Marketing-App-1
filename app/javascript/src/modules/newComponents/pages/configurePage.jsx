import React, {useState, useEffect} from 'react'

import { H1, H2, Button, Flex, Box, Text, Stepper, Form } from '@bigcommerce/big-design';
import { Footer } from "../createSettings/styled";
import ConfigurationSteps from "./steps/ConfigurationSteps";
import {alertsManager} from "../../../app";
import {ApiService} from '../../../services/apiServices';
import Loader from "../../components/common/Loader";
import idx from "idx";

export default function configurePage(props) {
  const steps = ['Storefront Selection', 'Requirements', 'Connection'];
  const [currentStep, setCurrentStep] = useState(0);
  const [storefront, setStorefront] = useState('');
  const [storeInfo, setStoreInfo] = useState({});
  const [storefrontOptions, setStorefrontOptions] = useState({});
  const [loading, setLoading] = useState(true);

  const responseGoogle = (response) => {
    console.log(response);
  }

  function increaseStep() {
    if (currentStep < 15) {
      setCurrentStep(currentStep + 1);
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
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }
  useEffect(() =>{
    if(currentStep >1 && storefront === ''){
      setCurrentStep(1);
      AddAlert('Error', 'Please select a store first!', 'error')
    }
  }, [currentStep])

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
        <>

          <Box>
            
            { currentStep < 8 &&
            <>
              <H1>
                Set up {process.env.REACT_APP_CHANNEL_PLATFORM_NAME}
              </H1>
              <Stepper steps={steps} currentStep={currentStep} />
            </>
            }
            
            <Form>  
              <ConfigurationSteps
                step={currentStep}
                setStep={setCurrentStep}
                storeInfo={props.storeInfo}
                storefront={storefront}
                setStorefront={setStorefront}
                AddAlert={AddAlert}
                storefrontOptions={storefrontOptions}
                setStorefrontOptions={setStorefrontOptions}
                currentStore={props.currentStore}
              />
            </Form>
          </Box>
        

          <Footer>
            <Box>
              <Button variant="primary" onClick={increaseStep}>
                Continue
              </Button>
            </Box>
          </Footer>
        </>
      
      }
    </>
  )
}
