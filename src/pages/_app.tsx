import React from 'react';
import '@/styles/globals.scss';
import classNames from 'classnames';
import type { AppProps } from 'next/app';
import { Vazirmatn, DM_Sans } from '@next/font/google';
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import store from '@/store/store';

const vazirmatn = Vazirmatn({
    subsets: ['latin'],
    variable: '--font-vazirmatn',
});
const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-dm-sans',
});

function App({ Component, pageProps }: AppProps): ReactJSXElement {
    return (
        <main className={classNames(vazirmatn.variable, dmSans.variable)}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </main>
    );
}

export default appWithTranslation(App);
