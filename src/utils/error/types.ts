export interface IError {
    readonly headline: string;
    readonly details?: any;
    readonly ref: string;
    readonly stack?: any;
    readonly debugInfo?: any;
}