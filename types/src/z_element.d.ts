export declare class ZElement {
    private _group;
    onChange: (zIndex: number) => void;
    zIndex?: number;
    constructor(_group: number, onChange: (zIndex: number) => void);
    group: number;
    unregister(): void;
    raise(): void;
    private a;
}
