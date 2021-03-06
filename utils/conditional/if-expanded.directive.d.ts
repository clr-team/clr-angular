import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { IfExpandService } from './if-expanded.service';
export declare class ClrIfExpanded implements OnInit, OnDestroy {
    private template;
    private container;
    private el;
    private renderer;
    private expand;
    private _expanded;
    expanded: boolean;
    expandedChange: EventEmitter<boolean>;
    constructor(template: TemplateRef<any>, container: ViewContainerRef, el: ElementRef, renderer: Renderer2, expand: IfExpandService);
    /**
     * Subscriptions to all the services and queries changes
     */
    private _subscriptions;
    private updateView;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
