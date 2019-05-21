import { Optional, Renderer2 } from '@angular/core';
import { ArrowKeyDirection } from './arrow-key-direction.enum';
import { FocusableItem } from './focusable-item/focusable-item';
export declare class FocusService {
    private renderer;
    constructor(renderer: Renderer2);
    private container;
    private _current;
    readonly current: FocusableItem;
    reset(first: FocusableItem): void;
    listenToArrowKeys(el: HTMLElement): void;
    registerContainer(el: HTMLElement): void;
    moveTo(item: FocusableItem): void;
    /**
     * The second parameter, optional, is here to allow recursion to skip disabled items.
     */
    move(direction: ArrowKeyDirection, current?: FocusableItem): boolean;
    activateCurrent(): boolean;
}
export declare function clrFocusServiceFactory(existing: FocusService, renderer: Renderer2): FocusService;
export declare const FOCUS_SERVICE_PROVIDER: {
    provide: typeof FocusService;
    useFactory: typeof clrFocusServiceFactory;
    deps: (Optional[] | typeof Renderer2)[];
};
