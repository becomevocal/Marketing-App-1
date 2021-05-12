import React, { useState, useEffect } from 'react'
import { H1, Button, Box, Stepper, Form } from '@bigcommerce/big-design';
import ConfigurationSteps from "./steps/ConfigurationSteps";
import { useLocales } from 'react-localized';
import { alertsManager } from "../../../app";
import { ApiService } from '../../../services/apiServices';
import Loader from "../common/Loader";
import Footer from "../common/Footer";

export default function configurePage(props) {
  const { gettext } = useLocales();
  const steps = [
    gettext('Storefront Selection'),
    gettext('Requirements'),
    gettext('Connection')
  ];
  const activateChannelStep = 6;
  const [currentStep, setCurrentStep] = useState(0);
  const [storefront, setStorefront] = useState({
    channel_id: null,
    name: null
  });
  const [merchantIds, setMerchantIds] = useState([]);
  const [selectedMerchantId, setSelectedMerchantId] = useState('');
  const [storeInfo, setStoreInfo] = useState({});
  const [googleAccessToken, setGoogleAccessToken] = useState('');
  const [googleProfile, setGoogleProfile] = useState({});
  const [storefrontOptions, setStorefrontOptions] = useState({});
  const [loadingInitialData, setLoadingInitialData] = useState(true);

  function increaseStep() {
    if (currentStep < 9) {
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
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }
  useEffect(() =>{
    if(currentStep > 0 && storefront.channel_id === null){
      setCurrentStep(0);
      AddAlert('Error', gettext('Please select a store first.'), 'error')
    }
  }, [currentStep])

  useEffect(() =>{
    ApiService.getChannelsDetails()
      .then(function (response) {
        setStorefrontOptions(response.data.store.data);
        setLoadingInitialData(false);
      })
      .catch(function (error) {
        AddAlert('Error', gettext('Unable to fetch data. Please try again.'), 'error')
      })
  }, [])

  useEffect(() => {
    console.log('storefront channel_id changed', storefront);
    if (!storefront.channel_id) {
      return
    }

    ApiService.selectStorefrontChannel(storefront.channel_id)
      .catch(function (error) {
        AddAlert('Error', gettext('Unable to select storefront. Please try again.'), 'error')
      })
  }, [storefront.channel_id])

  const nextButtonText = () => {
    return (currentStep < activateChannelStep) ? 
      gettext('Continue') :
      gettext('Activate channel')
  }

  return (
    <>
      {loadingInitialData &&
        <Loader/>
      }
      {!loadingInitialData &&
        <>
          <Box>
            
            { currentStep < 8 &&
            <>
              <H1>
                {gettext('Set up %s', process.env.REACT_APP_CHANNEL_PLATFORM_NAME)}
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
                merchantIds={merchantIds}
                setMerchantIds={setMerchantIds}
                selectedMerchantId={selectedMerchantId}
                setSelectedMerchantId={setSelectedMerchantId}
                googleAccessToken={googleAccessToken}
                setGoogleAccessToken={setGoogleAccessToken}
                googleProfile={googleProfile}
                setGoogleProfile={setGoogleProfile}
              />
            </Form>
          </Box>
        

          <Footer>
            <Box>
              <Button variant="primary" onClick={increaseStep}>
                {nextButtonText()}
              </Button>
            </Box>
          </Footer>
        </>
      }
    </>
  )
}
