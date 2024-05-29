/**
 * @function ReactGodot
 */
import "./styles.css";
import { FunctionComponent } from "react";
export type ReactGodotProps = {
    script: EngineLoaderDescription;
    pck: string;
    resize?: boolean;
    width?: number;
    height?: number;
    params?: any;
};
declare const ReactGodot: FunctionComponent<ReactGodotProps>;
export default ReactGodot;
