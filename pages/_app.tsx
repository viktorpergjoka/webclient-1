import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme } from 'baseui';
import React from 'react';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { AppProps } from 'next/app';
import { debug, styletron } from '../styletron';
import { AuthContextProvider } from '../lib/digitalstage/useAuth';
import { SocketContextProvider } from '../lib/digitalstage/useStageContext';
import { RequestContextProvider } from '../lib/useRequest';
import StageJoiner from '../components/elements/StageJoiner';
import { AudioContextProvider } from '../lib/useAudioContext';
import { MediasoupProvider } from '../lib/digitalstage/useMediasoup';
import { wrapper } from '../lib/digitalstage/useStageContext/redux';
import { DarkModeConsumer, DarkModeProvider } from '../lib/useDarkModeSwitch';
import StageWebAudioProvider from '../lib/useStageWebAudio';
import { DSDarkTheme, DSLightTheme } from '../components/DSTheme';
import { ErrorsProvider } from '../lib/useErrors';
import DarkTheme from '../uikit/Theme';
import { ProvideStage } from '../components/stage/useStage';

const MyApp = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
        <ErrorsProvider>
          <RequestContextProvider>
            <AuthContextProvider>
              <SocketContextProvider>
                <MediasoupProvider>
                  <AudioContextProvider>
                    <DarkModeProvider>
                      <DarkModeConsumer>
                        {(darkMode) => (
                          <ThemeProvider theme={darkMode ? DSDarkTheme : DSLightTheme}>
                            <CssBaseline />
                            <BaseProvider theme={darkMode ? DarkTheme : LightTheme}>
                              <style jsx global>
                                {`
                                                            @import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Poppins:wght@600&display=swap');
                                            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
                                            @import("https://use.fontawesome.com/releases/v5.12.0/css/all.css");
                                            * {
                                                box-sizing: border-box;
                                            }
                                            html {
                                                height: -webkit-fill-available;
                                            }
                                            html, body {
                                                margin: 0;
                                                padding: 0;
                                            }
                                            body {
                                                min-height: 100vh;
                                                min-height: -webkit-fill-available;
                                                font-family: var(--font-sans);
                                                color: ${darkMode ? '#ffffff' : '#000000'};
                                                background-color: ${darkMode ? '#343434' : '#ffffff'};
                                                background: linear-gradient(218deg, rgba(52,52,52,1) 0%, rgba(20,20,20,1) 100%);
                                                background-repeat: no-repeat;
                                                background-attachment: fixed;
                                                background-size: cover;
                                                transition-timing-function: cubic-bezier(0, 0, 1, 1);
                                                transition: color 200ms, background-color 200ms;
                                                overflow-x: hidden;
                                                overflow-y: scroll;
                                            }
                                            @keyframes bounce {
                                                0%   { transform: translateY(0); }
                                                50%  { transform: translateY(-20px); }
                                                100% { transform: translateY(0); }
                                            }
                                            @keyframes ripple {
                                              to {
                                                opacity: 0;
                                                transform: scale(2);
                                              }
                                            }
                                        `}
                              </style>
                              <StageWebAudioProvider>
                                <ProvideStage>
                                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                                  <Component {...pageProps} />
                                </ProvideStage>
                              </StageWebAudioProvider>

                              <StageJoiner />

                            </BaseProvider>
                          </ThemeProvider>
                        )}
                      </DarkModeConsumer>
                    </DarkModeProvider>
                  </AudioContextProvider>
                </MediasoupProvider>
              </SocketContextProvider>
            </AuthContextProvider>
          </RequestContextProvider>
        </ErrorsProvider>
      </StyletronProvider>
    </>
  );
};
export default wrapper.withRedux(MyApp);
