import React from "react";
import StorefrontSelection from "./StorefrontSelection";
import StorefrontRequirements from "./StorefrontRequirements";
import ChannelAuthentication from "./ChannelAuthentication";
import MerchantIdSelection from "./MerchantIdSelection";
import AddProducts from "./AddProducts";
import AnalyticsTags from "./AnalyticsTags";
import ChannelAccount from "./ChannelAccount";
import ActivateChannel from "./ActivateChannel";

export default function ConfigurationSteps(props) {

  return (
    <>
      { props.step == 0 &&
      <StorefrontSelection step={props.step} setStep={props.setStep} storeInfo={props.storeInfo}
             storefront={props.storefront} setStorefront={props.setStorefront}
             AddAlert={props.AddAlert} setStorefrontOptions={props.setStorefrontOptions}
             storefrontOptions={props.storefrontOptions}
      />
      }
      { props.step == 1 &&
      <StorefrontRequirements step={props.step} setStep={props.setStep} storeInfo={props.storeInfo}
             storefront={props.storefront} setStorefront={props.setStorefront}
             AddAlert={props.AddAlert}
      />
      }
      { props.step == 2 &&
      <ChannelAuthentication step={props.step} setStep={props.setStep} storeInfo={props.storeInfo}
             storefront={props.storefront} setStorefront={props.setStorefront}
             AddAlert={props.AddAlert} googleAccessToken={props.googleAccessToken}
             setGoogleAccessToken={props.setGoogleAccessToken}
             googleProfile={props.googleProfile} setGoogleProfile={props.setGoogleProfile}
      />
      }
      { props.step == 3 &&
      <ChannelAccount step={props.step} setStep={props.setStep} storeInfo={props.storeInfo}
             storefront={props.storefront} setStorefront={props.setStorefront}
             AddAlert={props.AddAlert} merchantIds={props.merchantIds}
             setMerchantIds={props.setMerchantIds} selectedMerchantId={props.selectedMerchantId}
             setSelectedMerchantId={props.setSelectedMerchantId} googleAccessToken={props.googleAccessToken}
             setGoogleAccessToken={props.setGoogleAccessToken}
             googleProfile={props.googleProfile} setGoogleProfile={props.setGoogleProfile}
      />
      }
      {props.step == 4 &&
      <MerchantIdSelection step={props.step} setStep={props.setStep} storeInfo={props.storeInfo}
             storefront={props.storefront} setStorefront={props.setStorefront}
             AddAlert={props.AddAlert} merchantIds={props.merchantIds}
             setMerchantIds={props.setMerchantIds} selectedMerchantId={props.selectedMerchantId}
             setSelectedMerchantId={props.setSelectedMerchantId} googleAccessToken={props.googleAccessToken}
             setGoogleAccessToken={props.setGoogleAccessToken}
             googleProfile={props.googleProfile} setGoogleProfile={props.setGoogleProfile}
      />
      }
      {props.step == 5 &&
      <AddProducts step={props.step} setStep={props.setStep} storeInfo={props.storeInfo}
             storefront={props.storefront} setStorefront={props.setStorefront}
             AddAlert={props.AddAlert} merchantIds={props.merchantIds}
             setMerchantIds={props.setMerchantIds} selectedMerchantId={props.selectedMerchantId}
             setSelectedMerchantId={props.setSelectedMerchantId} googleAccessToken={props.googleAccessToken}
             setGoogleAccessToken={props.setGoogleAccessToken}
             googleProfile={props.googleProfile} setGoogleProfile={props.setGoogleProfile}
      />
      }
      {props.step == 6 &&
      <AnalyticsTags step={props.step} setStep={props.setStep} storeInfo={props.storeInfo}
             storefront={props.storefront} setStorefront={props.setStorefront}
             AddAlert={props.AddAlert} merchantIds={props.merchantIds}
             setMerchantIds={props.setMerchantIds} selectedMerchantId={props.selectedMerchantId}
             setSelectedMerchantId={props.setSelectedMerchantId}  googleAccessToken={props.googleAccessToken}
             setGoogleAccessToken={props.setGoogleAccessToken}
             googleProfile={props.googleProfile} setGoogleProfile={props.setGoogleProfile}
      />
      }

      { props.step == 7 &&
      <ActivateChannel step={props.step} setStep={props.setStep} storeInfo={props.storeInfo}
             storefront={props.storefront} setStorefront={props.setStorefront}
             AddAlert={props.AddAlert} merchantIds={props.merchantIds}
             setMerchantIds={props.setMerchantIds} googleAccessToken={props.googleAccessToken}
             setGoogleAccessToken={props.setGoogleAccessToken}
             googleProfile={props.googleProfile} setGoogleProfile={props.setGoogleProfile}
      />
      }
    </>
  );
}
