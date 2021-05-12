import React, { useEffect } from "react";
import { Panel, Small, Text, Flex, FlexItem } from "@bigcommerce/big-design";
import { CheckCircleIcon, WarningIcon } from '@bigcommerce/big-design-icons';
import { useLocales } from 'react-localized';
import { ApiService } from "../../../../services/apiServices";

export default function StorefrontRequirements(props) {
  const { gettext } = useLocales();

  useEffect(() => {
    // setLoading(true);

    ApiService.createChannel()
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
      props.AddAlert(gettext('Error'), gettext(error.response.data.error_message), 'error')
      // props.AddAlert(gettext('Error'), gettext('Unable to create %s channel: %s', process.env.REACT_APP_CHANNEL_PLATFORM_NAME, error), 'error')
      // setLoading(false);
    })
  }, [])

  return (
    <Panel header={gettext('%s requirements', process.env.REACT_APP_CHANNEL_PLATFORM_NAME)}>
        <Text>
          {gettext('Complete all requirements to connect to %s', props.storefront.name)}
        </Text>

        <Flex borderBottom="box" paddingTop="small" paddingBottom="small">
          <FlexItem flexGrow={0} paddingRight="small">
            <CheckCircleIcon color="success" size="xLarge" />
          </FlexItem>
          <FlexItem flexGrow={1}>
            <Text bold as="span">
              {gettext('Store default currency is set to USD')}
            </Text>
            <Small>
              {gettext('Storefront has set USD as default currency')}
            </Small>
          </FlexItem>
        </Flex>

        <Flex borderBottom="box" paddingTop="small" paddingBottom="small">
          <FlexItem flexGrow={0} paddingRight="small">
            <CheckCircleIcon color="success" size="xLarge" />
          </FlexItem>
          <FlexItem flexGrow={1}>
            <Text bold as="span">
              Requirement
            </Text>
            <Small>
              Requirement description
            </Small>
          </FlexItem>
        </Flex>

        <Flex borderBottom="box" paddingTop="small" paddingBottom="small">
          <FlexItem flexGrow={0} paddingRight="small">
            <CheckCircleIcon color="success" size="xLarge" />
          </FlexItem>
          <FlexItem flexGrow={1}>
            <Text bold as="span">
              Requirement
            </Text>
            <Small>
              Requirement description
            </Small>
          </FlexItem>
        </Flex>
    </Panel>
  );
}
