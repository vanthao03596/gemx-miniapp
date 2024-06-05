import type { ComponentType, JSX } from "react";

import Svg from "@/icon/svg";
import { HomePage } from "@/pages/HomePage";
import { InitDataPage } from "@/pages/InitDataPage/InitDataPage";
import { LaunchParamsPage } from "@/pages/LaunchParamsPage/LaunchParamsPage.tsx";
import { ThemeParamsPage } from "@/pages/ThemeParamsPage/ThemeParamsPage.tsx";

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
    path: "/init-data",
    Component: InitDataPage,
    title: "Init Data",
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
