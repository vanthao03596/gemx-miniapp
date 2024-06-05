import type { ComponentType, JSX } from "react";

import { IndexPage } from "@/pages/IndexPage/IndexPage";
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
  { path: "/", Component: IndexPage, title: "Home" },
  { path: "/init-data", Component: InitDataPage, title: "Init Data" },
  { path: "/theme-params", Component: ThemeParamsPage, title: "Theme" },
  {
    path: "/launch-params",
    Component: LaunchParamsPage,
    title: "Launch",
  },
];
