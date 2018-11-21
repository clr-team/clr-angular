import { ElementRef, Renderer2 } from '@angular/core';
export declare class ClrIconCustomTag {
    private el;
    private renderer;
    shape: string;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
}
