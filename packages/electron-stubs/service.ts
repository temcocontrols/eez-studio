// Stub for eez-studio-shared/service — browser-safe pass-through

export let service: <I, O>(
    serviceName: string,
    serviceImplementation: (inputParams: I) => Promise<O>,
    executeInsideMainProcess?: boolean
) => (inputParams: I) => Promise<O> = <I, O>(
    _serviceName: string,
    serviceImplementation: (inputParams: I) => Promise<O>
) => {
    return serviceImplementation;
};
