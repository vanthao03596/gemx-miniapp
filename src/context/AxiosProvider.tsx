import { axiosAuth } from '@/lib/axios';
import { useLaunchParams } from '@tma.js/sdk-react';
import { AxiosInstance } from 'axios';
import React, { createContext, useEffect } from 'react';

interface AxiosProviderProps {
    children: React.ReactNode;
}

interface AxiosContextType {
    axiosAuth: AxiosInstance;
}

export const AxiosContext = createContext<AxiosContextType>(null!);

const AxiosProvider = (props: AxiosProviderProps) => {
    const { children } = props;
    const initData = useLaunchParams().initDataRaw;

    useEffect(() => {
        const requestIntercept = axiosAuth.interceptors.request.use((config) => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `tma ${initData}`;
            }
            return config;
        });

        // Clean up
        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept);
        };
    }, [initData]);

    const value = { axiosAuth };

    return <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>;
};

export default AxiosProvider;
