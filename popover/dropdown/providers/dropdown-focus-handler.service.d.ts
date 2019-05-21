import { Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { IfOpenService } from '../../../utils/conditional/if-open.service';
import { FocusService } from '../../../utils/focus/focus.service';
import { FocusableItem } from '../../../utils/focus/focusable-item/focusable-item';
export declare class DropdownFocusHandler implements FocusableItem {
    id: string;
    private renderer;
    private parent;
    private ifOpenService;
    private focusService;
    private platformId;
    constructor(id: string, renderer: Renderer2, parent: DropdownFocusHandler, ifOpenService: IfOpenService, focusService: FocusService, platformId: Object);
    /**
     * If the dropdown was opened by clicking on the trigger, we automatically move to the first item
     */
    moveToFirstItemWhenOpen(): void;
    private focusBackOnTrigger;
    /**
     * Focus on the menu when it opens, and focus back on the root trigger when the whole dropdown becomes closed
     */
    handleRootFocus(): void;
    private _trigger;
    trigger: HTMLElement;
    private _container;
    container: HTMLElement;
    focus(): void;
    blur(): void;
    activate(): void;
    private children;
    right?: Observable<FocusableItem>;
    down?: Observable<FocusableItem>;
    up?: Observable<FocusableItem>;
    private openAndGetChildren;
    private closeAndGetThis;
    resetChildren(): void;
    addChildren(children: FocusableItem[]): void;
}
export declare const DROPDOWN_FOCUS_HANDLER_PROVIDER: ({
    provide: import("@angular/core").InjectionToken<string>;
    useFactory: typeof import("../../../utils/id-generator/id-generator.service").uniqueIdFactory;
} | import("@angular/core").Type<DropdownFocusHandler> | {
    provide: typeof FocusableItem;
    useExisting: import("@angular/core").Type<DropdownFocusHandler>;
})[];
