declare class Failure extends Error {
    code: number;
    constructor(message: string, code: number);
    static notFound: (message: string) => Failure;
    static unauthorized: (message: string) => Failure;
    static forbidden: (message: string) => Failure;
    static internalServer: (message: string) => Failure;
    static badRequest: (message: string) => Failure;
    static conflict: (message: string) => Failure;
}
export { Failure };
