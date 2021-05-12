import React, { useState, useCallback, useEffect } from 'react'
import { AlertsManager, createAlertsManager, GlobalStyles } from '@bigcommerce/big-design';
import { theme } from '@bigcommerce/big-design-theme';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import LocaleSwitcher from './modules/components/common/LocaleSwitcher';
import { LocalizedProvider } from 'react-localized';
import { getBrowserLocales } from './services/localeServices';
import Main from './modules/main';
import es from './locales/es';

const additionalLocales = { es };

const AppGlobalStyles = createGlobalStyle`
  body {
    height: 100%;
    max-width: 1080px;
    margin: 2rem auto;
    background-color: ${({ theme }) => theme.colors.secondary10};
  }
`;

export default function App() {
  const defaultLocale = () => getBrowserLocales({languageCodeOnly: true})[0];
  const [locale, setLocale] = useState(defaultLocale)

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'en' ? 'es' : 'en'))
  }, [])

  return(
    <ThemeProvider theme={theme}>
      <AppGlobalStyles />
      <GlobalStyles />
      {/* This LocaleSwitcher component is helpful for debugging translations but shouldn't be used in production */}
      {/* <LocaleSwitcher toggleFunction={toggleLocale} /> */}
      <LocalizedProvider locales={additionalLocales} selected={locale}>
        {({ localeReady }) => (
          localeReady
            ? (
              <>
                <AlertsManager manager={alertsManager}/>
                <Main />
              </>
            )
            : ''
        )}
      </LocalizedProvider>
    </ThemeProvider>
  )
}

export const alertsManager = createAlertsManager();
