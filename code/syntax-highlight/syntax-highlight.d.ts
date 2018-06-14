import { ElementRef, Renderer2 } from '@angular/core';
/** @deprecated since 0.12 */
export declare class ClrCodeHighlight {
    private _el;
    private renderer;
    private platformId;
    private _highlight;
    constructor(_el: ElementRef, renderer: Renderer2, platformId: Object);
    ngAfterContentInit(): void;
    redraw(): void;
    highlight: string;
}
