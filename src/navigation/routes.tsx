import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { LaunchParamsPage } from '@/pages/LaunchParamsPage/LaunchParamsPage.tsx';
import { ThemeParamsPage } from '@/pages/ThemeParamsPage/ThemeParamsPage.tsx';
import { WalletPage } from '@/pages/WalletPage';

export interface Route {
    path: string;
    Component: ComponentType;
    title?: string;
    icon?: JSX.Element;
}

export const routes: Route[] = [
    { path: '/', Component: IndexPage, title: 'Home' },
    { path: '/wallet', Component: WalletPage, title: 'Wallet' },
    { path: '/theme-params', Component: ThemeParamsPage, title: 'Theme' },
    {
        path: '/launch-params',
        Component: LaunchParamsPage,
        title: 'Launch',
    },
];
