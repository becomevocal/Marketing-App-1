import React, { useEffect, useState } from "react";
import { Panel, ProgressCircle, Flex, FlexItem, Text } from "@bigcommerce/big-design";
import { CheckCircleIcon } from '@bigcommerce/big-design-icons';
import { ApiService } from "../../../../services/apiServices";
import { useLocales } from 'react-localized';

export default function ActivateChannel(props) {
  const { gettext } = useLocales();
  const [isLoading, setLoading] = useState(false);
  const [channelActivated, setChannelActivated] = useState(false);

  useEffect(() => {
    setLoading(true);

    ApiService.createChannel()
    .then(function (response) {
      console.log(response.data);
      const channelId = response.data.data.id;
      const appId = response.data.data.config_meta.app.id;

      setChannelActivated(true);
      setLoading(false);
      setTimeout(() => {
        window.location.href = `https://store-vv4u5fczu.mybigcommerce.com/manage/channel/${channelId}/app?id=${appId}`;
      }, 2000)
    })
    .catch(function (error) {
      if (error.response.data?.error_message) {
        props.AddAlert(gettext('Error'), gettext(error.response.data.error_message), 'error')
      } else {
        props.AddAlert(gettext('Error'), gettext('Unable to create %s channel: %s', process.env.REACT_APP_CHANNEL_PLATFORM_NAME, error), 'error')
      }
      setLoading(false);
    })
  }, [])

  return (
    <Panel>
      {isLoading && !channelActivated &&
        <Flex>
          <FlexItem flexGrow={0}>
            <ProgressCircle size="large" />
          </FlexItem>
          <FlexItem flexGrow={1} alignSelf="center" paddingLeft="medium">
            <Text color="secondary">{gettext('Activating %s channel', process.env.REACT_APP_CHANNEL_PLATFORM_NAME)}</Text>
          </FlexItem>
        </Flex>
      }
      {isLoading && channelActivated &&
        <Flex>
          <FlexItem flexGrow={0} padding="medium">
            <CheckCircleIcon color="success" size="xxxLarge" />
          </FlexItem>
          <FlexItem flexGrow={1} alignSelf="center" paddingLeft="medium">
            <Text color="secondary">{gettext('Redirecting to Channel Manager')}</Text>
          </FlexItem>
        </Flex>
      }
    </Panel>
  );
}
