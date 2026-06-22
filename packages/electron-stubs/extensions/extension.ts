// Re-export types from the real source (types are compile-time only)
export type { IFieldProperties } from "../../eez-studio-ui/generic-dialog";

export interface IEditor {
    open: () => void;
    close: () => void;
    isOpen: () => boolean;
}

export interface IDashboard {
    open: () => void;
    close: () => void;
    isOpen: () => boolean;
}

export interface IExtensionProperties {
    [key: string]: any;
}

export type HomeTabCategory = "none" | "common" | "instrument";

export interface IHomeSection {
    id: string;
    title: string;
    render: () => React.ReactNode;
    category: HomeTabCategory;
}

export interface IActivityLogController {
    start: () => void;
    stop: () => void;
}

export type IMeasurementFunctionResultType = "value" | "chart";

export interface IMeasurementFunction {
    name: string;
    resultType: IMeasurementFunctionResultType;
}

export interface IChart {
    id: string;
    title: string;
}

export interface IMeasureTask {
    id: string;
}

export type CommandsProtocolType = "SCPI" | "PROPRIETARY";
export type CommandLineEnding = "LF" | "CR" | "CRLF";

export interface IExtensionDescription {
    id: string;
    name: string;
    version: string;
}

export interface IExtensionHost {
    id: string;
}

export type ExtensionType = "instrument" | "measurement" | "other";

export interface IExtensionDefinition {
    id: string;
    name: string;
    version: string;
}

export type IExtension = IExtensionDescription & IExtensionDefinition;
