export declare enum DragEventType {
    DRAG_START = 0,
    DRAG_MOVE = 1,
    DRAG_END = 2,
    DRAG_ENTER = 3,
    DRAG_LEAVE = 4,
    DROP = 5
}
export interface DragEventInterface<T> {
    type: DragEventType;
    group?: string | string[];
    ghostElement?: any;
    dragPosition: {
        pageX: number;
        pageY: number;
    };
    dragDataTransfer?: T;
    dropPointPosition?: {
        pageX: number;
        pageY: number;
    };
}
