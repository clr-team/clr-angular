export declare enum Layouts {
    VERTICAL = "vertical",
    HORIZONTAL = "horizontal",
    COMPACT = "compact",
}
export declare class LayoutService {
    layout: Layouts;
    private layoutValues;
    isVertical(): boolean;
    readonly layoutClass: string;
    isValid(layout: string): boolean;
}
