import * as React from "react";
import { FunctionComponent } from "react";
export type PackLoadingState = {
    mode: string;
    initializing: boolean;
    percent?: number;
    msg?: string;
};
export type PackLoadingAction = {
    msg?: string;
    initialized?: boolean;
    percent?: number;
    mode: string;
};
export type PackLoadingDispatch = (action: PackLoadingAction) => void;
export declare const useLoading: () => [PackLoadingState, PackLoadingDispatch];
export type AsyncLoadingProps = {
    children: React.ReactNode;
};
declare const AsyncLoading: FunctionComponent<AsyncLoadingProps>;
export default AsyncLoading;
