import {
    MaterialSymbolsAccountBalanceWallet,
    MaterialSymbolsBreakingNewsRounded,
    MaterialSymbolsCampaignRounded,
    MaterialSymbolsHouseRounded,
    MaterialSymbolsPerson,
} from '@/icon/icon';
import { HomePage } from '@/pages/HomePage';
import { LaunchParamsPage } from '@/pages/LaunchParamsPage/LaunchParamsPage.tsx';
import { QuestPage } from '@/pages/QuestPage';
import ResearchPage from '@/pages/ResearchPage';
import { ThemeParamsPage } from '@/pages/ThemeParamsPage/ThemeParamsPage.tsx';
import { UserPage } from '@/pages/UserPage';
import { WalletHistoryPage } from '@/pages/WalletHistoryPage';
import { WalletPage } from '@/pages/WalletPage';
import type { ComponentType, JSX } from 'react';

export interface Route {
    path: string;
    Component: ComponentType;
    title?: string;
    icon?: JSX.Element;
}

export const routes: Route[] = [
    {
        path: '/',
        Component: HomePage,
        title: 'Home',
        icon: <MaterialSymbolsHouseRounded fontSize={18} />,
    },
    {
        path: '/wallet',
        Component: WalletPage,
        title: 'Wallet',
        icon: <MaterialSymbolsAccountBalanceWallet fontSize={18} />,
    },
    {
        path: '/research',
        Component: ResearchPage,
        title: 'Research',
        icon: <MaterialSymbolsBreakingNewsRounded fontSize={18} />,
    },
    {
        path: '/quest',
        Component: QuestPage,
        title: 'Quest',
        icon: <MaterialSymbolsCampaignRounded fontSize={18} />,
    },
    {
        path: '/user',
        Component: UserPage,
        title: 'User',
        icon: <MaterialSymbolsPerson fontSize={18} />,
    },
    {
        path: '/wallet/history',
        Component: WalletHistoryPage,
        title: 'Wallet History',
    },
    {
        path: '/theme-params',
        Component: ThemeParamsPage,
        title: 'Theme',
    },
    {
        path: '/launch-params',
        Component: LaunchParamsPage,
        title: 'Launch',
    },
];
