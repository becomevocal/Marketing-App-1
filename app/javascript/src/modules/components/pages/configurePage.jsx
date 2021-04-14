import React, {useState, useEffect} from 'react'

import { H1, H2, Button, Flex, Box, Text} from '@bigcommerce/big-design';
import { Footer } from "./createSettings/styled";
import Steps from "./steps";
import ConfigurationSteps from "./steps/ConfigurationSteps";
import { ArrowBackIcon } from '@bigcommerce/big-design-icons';
import { GoogleLogin } from 'react-google-login';

export default function configurePage(props) {
  const [step, setStep] = useState(1);

  const responseGoogle = (response) => {
    console.log(response);
  }

  function increaseStep() {
    if (step < 5) {
      setStep(step + 1);
    }
  }

  function decreaseStep() {
    if (step > 1) setStep(step - 1);
  }

  return (
    <Flex flexDirection="column" alignItems="center" marginTop="medium">
      <div style={{textAlign: 'left', width: '45%', margin: '10px'}}>
        <Text>
          <ArrowBackIcon size='small'/> My reports
        </Text>
      </div>

      <H2>Configure to Channel {props.currentProfitName}</H2>

      <GoogleLogin
        clientId="1090849701177-kq5gufe0g2vssa71lu9jkg1tid11k6ib.apps.googleusercontent.com"
        render={renderProps => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />

      <Footer>
        <Box>
          <Button variant="subtle" onClick={() => props.setCurrentPage(1)}>
            Cancel
          </Button>

          <Button disabled={step === 1} variant="subtle" onClick={decreaseStep}>
            Back
          </Button>
        </Box>
        <Box>
          <Button variant="primary" onClick={increaseStep}>
            Continue
          </Button>
        </Box> <Box>
          <Button variant="primary" onClick={increaseStep}>
            Continue
          </Button>
        </Box>
      </Footer>
    </Flex>
  )
}
