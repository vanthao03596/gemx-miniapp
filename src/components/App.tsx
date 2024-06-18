// import { AppRoot } from '@telegram-apps/telegram-ui';
import { useIntegration } from '@tma.js/react-router-integration';
import {
    bindMiniAppCSSVars,
    bindThemeParamsCSSVars,
    bindViewportCSSVars,
    initNavigator,
    postEvent,
    useClosingBehavior,
    useLaunchParams,
    useMiniApp,
    useThemeParams,
    useViewport,
} from '@tma.js/sdk-react';
import { useEffect, useMemo, type FC } from 'react';
// import { Navigate, Route, Router, Routes } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';

import AxiosProvider from '@/context/AxiosProvider';
// import { ProtectedRoute } from '@/navigation/ProtectedRoute';
// import { routes } from '@/navigation/routes.tsx';
// import { RegisterPage } from '@/pages/RegisterPage';
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
    const closing = useClosingBehavior();

    useEffect(() => {
        return bindMiniAppCSSVars(miniApp, themeParams);
    }, [miniApp, themeParams]);

    useEffect(() => {
        return bindThemeParamsCSSVars(themeParams);
    }, [themeParams]);

    useEffect(() => {
        postEvent('web_app_ready');

        viewport?.expand();

        return viewport && bindViewportCSSVars(viewport);
    }, [viewport]);

    useEffect(() => {
        closing.enableConfirmation();
    }, [closing]);

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
                {/* <AppRoot
                    appearance={miniApp.isDark ? 'dark' : 'light'}
                    platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
                >
                    <Router location={location} navigator={reactNavigator}>
                        <Routes>
                           
                            <Route Component={ProtectedRoute}>
                                {routes.map((route) => (
                                    <Route key={route.path} {...route} />
                                ))}
                            </Route>
                        
                            <Route path='/register' Component={RegisterPage} />
                            <Route path='*' element={<Navigate to='/' />} />
                        </Routes>
                    </Router>
                    <Toaster
                        toastOptions={{
                            style: {
                                background: '#0a1013',
                                color: '#fff',
                                border: '1px solid #262f31',
                            },
                        }}
                    />
                </AppRoot> */}
                <div style={{ border: '2px solid red', minHeight: '100vh' }}>
                    <div style={{ background: 'blue' }}>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                        <div>aaaaaaaa</div>
                    </div>
                    <div
                        style={{
                            background: 'green',
                            position: 'fixed',
                            bottom: '2px',
                            left: '2px',
                            right: '2px',
                            height: '4rem',
                        }}
                    >
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                    </div>
                </div>
            </AxiosProvider>
        </QueryClientProvider>
    );
};
