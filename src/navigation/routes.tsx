import Svg from "@/icon/svg";
import { HomePage } from "@/pages/HomePage";
import { LaunchParamsPage } from "@/pages/LaunchParamsPage/LaunchParamsPage.tsx";
import { ThemeParamsPage } from "@/pages/ThemeParamsPage/ThemeParamsPage.tsx";
import { WalletPage } from "@/pages/WalletPage";
import type { ComponentType, JSX } from "react";

export interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  {
    path: "/",
    Component: HomePage,
    title: "Home",
    icon: <Svg src="/icons/home.svg" className="icon" />,
  },
  {
    path: "/wallet",
    Component: WalletPage,
    title: "Wallet",
    icon: <Svg src="/icons/home.svg" className="icon" />,
  },
  {
    path: "/theme-params",
    Component: ThemeParamsPage,
    title: "Theme",
    icon: <Svg src="/icons/home.svg" className="icon" />,
  },
  {
    path: "/launch-params",
    Component: LaunchParamsPage,
    title: "Launch",
    icon: <Svg src="/icons/home.svg" className="icon" />,
  },
];
