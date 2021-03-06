import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DomAdapter } from '../../dom-adapter/dom-adapter';
import { ClrDragEvent } from '../drag-event';
import { ClrDropToleranceInterface } from '../interfaces/drop-tolerance.interface';
import { DragAndDropEventBusService } from '../providers/drag-and-drop-event-bus.service';
export declare class ClrDroppable<T> implements OnInit, OnDestroy {
    private el;
    private eventBus;
    private domAdapter;
    private renderer;
    private dragStartSubscription;
    private dragMoveSubscription;
    private dragEndSubscription;
    private droppableEl;
    private clientRect;
    constructor(el: ElementRef, eventBus: DragAndDropEventBusService<T>, domAdapter: DomAdapter, renderer: Renderer2);
    private isDraggableMatch;
    private _isDraggableOver;
    isDraggableOver: boolean;
    private _group;
    group: string | string[];
    private _dropTolerance;
    private dropToleranceGenerator;
    dropTolerance: number | string | ClrDropToleranceInterface;
    dragStartEmitter: EventEmitter<ClrDragEvent<T>>;
    dragMoveEmitter: EventEmitter<ClrDragEvent<T>>;
    dragEndEmitter: EventEmitter<ClrDragEvent<T>>;
    dragLeaveEmitter: EventEmitter<ClrDragEvent<T>>;
    dragEnterEmitter: EventEmitter<ClrDragEvent<T>>;
    dropEmitter: EventEmitter<ClrDragEvent<T>>;
    private unsubscribeFrom;
    private checkGroupMatch;
    private isInDropArea;
    private onDragStart;
    private onDragMove;
    private onDragEnd;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
