import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { initializeApp } from 'firebase/app';

import App from './App.tsx';
import { themes } from './ChakraThemes.ts';
import LookupsProvider from './contexts/LookupsContext.tsx';
import './index.scss';
import './Localization/i18next.ts';
import { UserProvider } from './contexts/UserContext.tsx';
import LanguageProvider from './Localization/LanguageProvider.tsx';

const theme = extendTheme(themes);

const firebaseConfig = {
    apiKey: 'AIzaSyATwJQD9uvk3s2WhtaevCzKAAYZIdFJ2Wc',
    authDomain: 'monroo-5aa9b.firebaseapp.com',
    projectId: 'monroo-5aa9b',
    storageBucket: 'monroo-5aa9b.appspot.com',
    messagingSenderId: '74112226438',
    appId: '1:74112226438:web:c4058f812654b9331f2d07',
    measurementId: 'G-QMZCEQX0P8',
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <LanguageProvider>
                <UserProvider>
                    <LookupsProvider>
                        <App />
                    </LookupsProvider>
                </UserProvider>
            </LanguageProvider>
        </ChakraProvider>
    </React.StrictMode>
);
