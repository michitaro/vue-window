export interface Options {
    minWidth: number;
    maxWidth?: number;
    minHeight: number;
    maxHeight?: number;
    onResize?: () => void;
}
export declare class ResizableHelper {
    readonly container: HTMLElement;
    readonly options: Options;
    private handles;
    constructor(container: HTMLElement, options: Options);
    teardown(): void;
}
