import { FunctionComponent } from "react";
export type ReactEngineProps = {
    engine: Engine;
    pck: string;
    width?: number;
    height?: number;
    params?: any;
    resize?: boolean;
};
declare const ReactCanvas: FunctionComponent<ReactEngineProps>;
export default ReactCanvas;
