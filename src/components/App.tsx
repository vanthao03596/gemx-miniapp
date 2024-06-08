import { AppRoot } from '@telegram-apps/telegram-ui';
import { useIntegration } from '@tma.js/react-router-integration';
import {
    bindMiniAppCSSVars,
    bindThemeParamsCSSVars,
    bindViewportCSSVars,
    initNavigator,
    useLaunchParams,
    useMiniApp,
    useThemeParams,
    useViewport,
} from '@tma.js/sdk-react';
import { type FC, useEffect, useMemo } from 'react';
import { Navigate, Route, Router, Routes } from 'react-router-dom';

import AxiosProvider from '@/context/AxiosProvider';
import { ProtectedRoute } from '@/navigation/ProtectedRoute';
import { routes } from '@/navigation/routes.tsx';
import { RegisterPage } from '@/pages/RegisterPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10000,
        },
    },
});

export const App: FC = () => {
    const lp = useLaunchParams();
    const miniApp = useMiniApp();
    const themeParams = useThemeParams();
    const viewport = useViewport();

    useEffect(() => {
        return bindMiniAppCSSVars(miniApp, themeParams);
    }, [miniApp, themeParams]);

    useEffect(() => {
        return bindThemeParamsCSSVars(themeParams);
    }, [themeParams]);

    useEffect(() => {
        viewport?.expand();

        return viewport && bindViewportCSSVars(viewport);
    }, [viewport]);

    // Create new application navigator and attach it to the browser history, so it could modify
    // it and listen to its changes.
    const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
    const [location, reactNavigator] = useIntegration(navigator);

    // Don't forget to attach the navigator to allow it to control the BackButton state as well
    // as browser history.
    useEffect(() => {
        navigator.attach();
        return () => navigator.detach();
    }, [navigator]);

    return (
        <QueryClientProvider client={queryClient}>
            <AxiosProvider>
                <AppRoot
                    appearance={miniApp.isDark ? 'dark' : 'light'}
                    platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
                >
                    <Router location={location} navigator={reactNavigator}>
                        <Routes>
                            {/* Protected routes */}
                            <Route element={<ProtectedRoute />}>
                                {routes.map((route) => (
                                    <Route key={route.path} {...route} />
                                ))}
                            </Route>
                            {/* Not protected */}
                            <Route path='/register' element={<RegisterPage />} />
                            <Route path='*' element={<Navigate to='/' />} />
                        </Routes>
                    </Router>
                </AppRoot>
            </AxiosProvider>
        </QueryClientProvider>
    );
};
