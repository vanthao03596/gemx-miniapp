import { axiosAuth } from '@/lib/axios';
import { useLaunchParams } from '@tma.js/sdk-react';
import { AxiosInstance } from 'axios';
import React, { createContext, useLayoutEffect } from 'react';

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
    // console.log(initData);
    // const initData =
    //     'user=%7B%22id%22%3A827738864%2C%22first_name%22%3A%22Ph%E1%BA%A1m%22%2C%22last_name%22%3A%22Th%E1%BA%A3o%22%2C%22username%22%3A%22phamthao03596%22%2C%22language_code%22%3A%22vi%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=8141968843457848536&chat_type=sender&auth_date=1718092648&hash=802e1ec920b4a83148b756e51fa57ed70e78193e214bdcb342590d4b4972c614';

    useLayoutEffect(() => {
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
