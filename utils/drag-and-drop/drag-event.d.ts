import { DragEventInterface } from './interfaces/drag-event.interface';
export declare class ClrDragEvent<T> {
    dragPosition: {
        pageX: number;
        pageY: number;
    };
    group: string | string[];
    dragDataTransfer: T;
    dropPointPosition: {
        pageX: number;
        pageY: number;
    };
    constructor(dragEvent: DragEventInterface<T>);
}
