import { axiosAuth } from "@/lib/axios";
import { useLaunchParams } from "@tma.js/sdk-react";
import { AxiosInstance } from "axios";
import React, { createContext, useEffect } from "react";

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
      if (!config.headers["Authorization"]) {
        config.headers[
          "Authorization"
        ] = `tma user=%7B%22id%22%3A827738864%2C%22first_name%22%3A%22Ph%E1%BA%A1m%22%2C%22last_name%22%3A%22Th%E1%BA%A3o%22%2C%22username%22%3A%22phamthao03596%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-7663282384920711406&chat_type=sender&auth_date=1717726404&hash=213dc00556d62ee25d4e75fa0360fe58b4052a39ea7d9fcd3bd90b10b817d739`;
      }
      return config;
    });

    // Clean up
    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
    };
  }, [initData]);

  const value = { axiosAuth };

  return (
    <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
  );
};

export default AxiosProvider;
