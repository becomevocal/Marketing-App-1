import React, {useContext, useState} from "react";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";
import Step7 from "./step7";
import Step8 from "./step8";

export default function ConfigurationSteps(props) {
  const [ projectId, setProjectId ] = useState('');
  const [ dataSetId, setDataSetId ] = useState('');

  return (
    <>
      { props.step == 0 &&
      <Step1 step={props.step} setStep={props.setStep} storeInfo={props.storeInfo}
             storefront={props.storefront} setStorefront={props.setStorefront}
             AddAlert={props.AddAlert} setStorefrontOptions={props.setStorefrontOptions}
             storefrontOptions={props.storefrontOptions} currentStore={props.currentStore}
      />
      }
      { props.step == 1 &&
      <Step2 step={props.step} setStep={props.setStep} storeInfo={props.storeInfo}
             storefront={props.storefront} setStorefront={props.setStorefront}
             AddAlert={props.AddAlert} currentStore={props.currentStore}
      />
      }
      { props.step == 2 &&
      <Step3 step={props.step} setStep={props.setStep} storeInfo={props.storeInfo}
             storefront={props.storefront} setStorefront={props.setStorefront}
             AddAlert={props.AddAlert} currentStore={props.currentStore}
      />
      }
      {props.step == 3 &&
      <Step4 step={props.step} setStep={props.setStep} storeInfo={props.storeInfo}
             storefront={props.storefront} setStorefront={props.setStorefront}
             AddAlert={props.AddAlert} merchantIds={props.merchantIds}
             setMerchantIds={props.setMerchantIds} selectedMerchantId={props.selectedMerchantId}
             setSelectedMerchantId={props.setSelectedMerchantId} googleAccessToken={props.googleAccessToken}
             setGoogleAccessToken={props.setGoogleAccessToken} currentStore={props.currentStore}
      />
      }
      {props.step == 4 &&
      <Step5 step={props.step} setStep={props.setStep} storeInfo={props.storeInfo}
             storefront={props.storefront} setStorefront={props.setStorefront}
             AddAlert={props.AddAlert} merchantIds={props.merchantIds}
             setMerchantIds={props.setMerchantIds} selectedMerchantId={props.selectedMerchantId}
             setSelectedMerchantId={props.setSelectedMerchantId}  googleAccessToken={props.googleAccessToken}
             setGoogleAccessToken={props.setGoogleAccessToken} currentStore={props.currentStore}
      />
      }
      {props.step == 5 &&
      <Step6 step={props.step} setStep={props.setStep} storeInfo={props.storeInfo}
             storefront={props.storefront} setStorefront={props.setStorefront}
             AddAlert={props.AddAlert} merchantIds={props.merchantIds}
             setMerchantIds={props.setMerchantIds} selectedMerchantId={props.selectedMerchantId}
             setSelectedMerchantId={props.setSelectedMerchantId}  googleAccessToken={props.googleAccessToken}
             setGoogleAccessToken={props.setGoogleAccessToken} currentStore={props.currentStore}
      />
      }

      { props.step == 6 &&
      <Step7 step={props.step} setStep={props.setStep} storeInfo={props.storeInfo}
             storefront={props.storefront} setStorefront={props.setStorefront}
             AddAlert={props.AddAlert} merchantIds={props.merchantIds}
             setMerchantIds={props.setMerchantIds} selectedMerchantId={props.selectedMerchantId}
             setSelectedMerchantId={props.setSelectedMerchantId} googleAccessToken={props.googleAccessToken}
             setGoogleAccessToken={props.setGoogleAccessToken} currentStore={props.currentStore}
      />
      }

      { props.step == 7 &&
      <Step8 step={props.step} setStep={props.setStep} storeInfo={props.storeInfo}
             storefront={props.storefront} setStorefront={props.setStorefront}
             AddAlert={props.AddAlert} merchantIds={props.merchantIds}
             setMerchantIds={props.setMerchantIds} currentStore={props.currentStore}
      />
      }
    </>
  );
}
