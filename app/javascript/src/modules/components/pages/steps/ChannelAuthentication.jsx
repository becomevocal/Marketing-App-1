import React, { useEffect, useState } from "react";
import { Panel, Text, Button, ProgressCircle, Flex, FlexItem } from "@bigcommerce/big-design";
import { GoogleLogin } from 'react-google-login';
import { ApiService } from '../../../../services/apiServices';
import { useLocales } from 'react-localized';

export default function ChannelAuthentication(props) {
  const { gettext } = useLocales();
  const [isLoading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const [profile, setProfile] = useState(null);

  const processGoogleResponse = (response) => {
    setCode(response.code);
  }

  useEffect(() => {
    if (!code) return
    
    setLoading(true);

    ApiService.googleAuthCodeExchange(code)
    .then((response) => {
      console.log(response.data);
      props.setGoogleAccessToken(response.data.access_token)
      setProfile(response.data.profile)
    })
    .catch((error) => {
      props.AddAlert(gettext('Error'), gettext('Unable to authenticate with %s.', process.env.REACT_APP_CHANNEL_PLATFORM_NAME), 'error')
      setLoading(false);
    })
  }, [code]);

  useEffect(() => {
    if (!profile) return

    props.setGoogleProfile(profile);
    props.setStep(3);
  }, [profile]);

  return (
    <Panel header={gettext('%s account', process.env.REACT_APP_CHANNEL_PLATFORM_NAME)}>
      <Text>
        {gettext('Connect your %s account with BigCommerce to complete setting up this channel.', process.env.REACT_APP_CHANNEL_PLATFORM_NAME)}
      </Text>
      {isLoading &&
        <Flex>
          <FlexItem flexGrow={0}>
            <ProgressCircle size="large" />
          </FlexItem>
          <FlexItem flexGrow={1} alignSelf="center" paddingLeft="medium">
            <Text color="secondary">{gettext('Connecting')}</Text>
          </FlexItem>
        </Flex>
      }
      {!isLoading && 
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          render={renderProps => (
            <Button variant="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>{gettext('Connect with %s', 'Google')}</Button>
          )}
          buttonText="Login"
          onSuccess={processGoogleResponse}
          onFailure={processGoogleResponse}
          accessType="offline"
          prompt="consent"
          responseType="code"
          cookiePolicy={'single_host_origin'}
          scope={"openid profile email https://www.googleapis.com/auth/content"}
        />
      }
    </Panel>
  );
}
