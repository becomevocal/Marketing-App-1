import React, {useState, useEffect} from 'react'
import { AlertsManager, createAlertsManager, GlobalStyles } from '@bigcommerce/big-design';
import { theme } from '@bigcommerce/big-design-theme';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Main from './modules/main'

const AppGlobalStyles = createGlobalStyle`
  body {
    height: 100%;
    max-width: 1080px;
    margin: 2rem auto;
    background-color: ${({ theme }) => theme.colors.secondary10};
  }
`;

export default function App() {
  const [currentStore, setCurrentStore] = useState('');
  useEffect(() =>{
    setCurrentStore(localStorage.getItem('store_id'));
  }, [])
  return(
    <ThemeProvider theme={theme}>
      <AppGlobalStyles />
      <GlobalStyles />
      {currentStore &&
        <>
          <AlertsManager manager={alertsManager}/>
          <Main currentStore={currentStore}/>
        </>
      }
    </ThemeProvider>
  )
}
export const alertsManager = createAlertsManager();
