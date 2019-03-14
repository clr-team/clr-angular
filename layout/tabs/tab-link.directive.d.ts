import { ComponentFactoryResolver, ElementRef, ViewContainerRef } from '@angular/core';
import { IfActiveService } from '../../utils/conditional/if-active.service';
import { TemplateRefContainer } from '../../utils/template-ref/template-ref-container';
import { TabsService } from './providers/tabs.service';
import { AriaService } from './providers/aria.service';
export declare class ClrTabLink {
    ifActiveService: IfActiveService;
    private id;
    private ariaService;
    private el;
    private cfr;
    private viewContainerRef;
    private tabsService;
    tabsId: number;
    private _inOverflow;
    inOverflow: boolean;
    readonly addLinkClasses: boolean;
    templateRefContainer: TemplateRefContainer;
    constructor(ifActiveService: IfActiveService, id: number, ariaService: AriaService, el: ElementRef, cfr: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, tabsService: TabsService, tabsId: number);
    readonly ariaControls: string;
    tabLinkId: string;
    activate(): void;
    readonly active: boolean;
}
