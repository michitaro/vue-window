export declare class DraggableHelper {
    readonly handle: HTMLElement;
    readonly container: HTMLElement;
    readonly onMove: (() => void) | undefined;
    constructor(handle: HTMLElement, container: HTMLElement, onMove?: (() => void) | undefined);
    teardown(): void;
    private offsetX;
    private offsetY;
    private mousedown;
    private mousemove;
    private mouseup;
}
