import React, {useContext, useEffect, useState} from "react";
import {
  Panel,
  Input,
  Link,
  H2,
  Small,
  Text,
  Form,
  FormGroup,
  Select,
  Flex,
  FlexItem
} from "@bigcommerce/big-design";
import { CheckCircleIcon, WarningIcon } from '@bigcommerce/big-design-icons';
import {ApiService} from "../../../../services/apiServices";

export default function Step2(props) {
  return (
    <Panel header={`${process.env.REACT_APP_CHANNEL_PLATFORM_NAME} requirements`}>
        <Text>
          Complete all requirements to connect to {props.storefront.name}
        </Text>

        <Flex borderBottom="box" paddingTop="small" paddingBottom="small">
          <FlexItem flexGrow={0} paddingRight="small">
            <CheckCircleIcon color="success" size="xLarge" />
          </FlexItem>
          <FlexItem flexGrow={1}>
            <Text bold as="span">
              Store default currency is set to USD
            </Text>
            <Small>
              {props.storefront.name} supports only payments in USD
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
