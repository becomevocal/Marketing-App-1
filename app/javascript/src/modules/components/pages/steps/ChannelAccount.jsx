import React from "react";
import { Panel, H2, Button, Badge, Text, Flex, FlexItem } from "@bigcommerce/big-design";
import { useLocales } from 'react-localized';

export default function ChannelAccount(props) {
  const { gettext } = useLocales();

  return (
    <Panel>
      <Flex>
        <FlexItem flexGrow={0} paddingRight="small">
          <H2>
            {props.storefront.name}
          </H2>
        </FlexItem>
        <FlexItem flexGrow={1}>
          <Badge label={gettext('connected')} variant="success" />
        </FlexItem>
        <FlexItem flexGrow={0}>
          <Button variant="secondary" onClick={() => props.setStep(2)}>{gettext('Switch account')}</Button>
        </FlexItem>
      </Flex>

      <Flex>
        <FlexItem flexGrow={0} paddingRight="small">
          <img src={props.googleProfile.picture} style={{ maxHeight: "36px" }} />
        </FlexItem>
        <FlexItem flexGrow={1}>
          <Text>
            {props.googleProfile.email}
          </Text>
        </FlexItem>
      </Flex>
    </Panel>
  );
}
