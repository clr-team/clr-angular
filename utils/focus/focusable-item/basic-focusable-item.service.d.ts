import { ElementRef, Renderer2 } from '@angular/core';
import { FocusableItem } from './focusable-item';
export declare class BasicFocusableItem implements FocusableItem {
    id: string;
    private el;
    private renderer;
    private platformId;
    constructor(id: string, el: ElementRef<HTMLElement>, renderer: Renderer2, platformId: Object);
    disabled: boolean;
    focus(): void;
    blur(): void;
    activate(): void;
}
export declare const BASIC_FOCUSABLE_ITEM_PROVIDER: ({
    provide: import("@angular/core").InjectionToken<string>;
    useFactory: typeof import("../../id-generator/id-generator.service").uniqueIdFactory;
} | {
    provide: typeof FocusableItem;
    useClass: typeof BasicFocusableItem;
})[];
