import { ElementRef, OnInit } from '@angular/core';
import { ResponsiveNavigationService } from './providers/responsive-navigation.service';
import { ResponsiveNavCodes } from './responsive-nav-codes';
export declare class ClrNavLevel implements OnInit {
    private responsiveNavService;
    private elementRef;
    _level: number;
    constructor(responsiveNavService: ResponsiveNavigationService, elementRef: ElementRef);
    ngOnInit(): void;
    addNavClass(level: number): void;
    readonly level: number;
    readonly responsiveNavCodes: ResponsiveNavCodes;
    open(): void;
    close(): void;
    onMouseClick(target: any): void;
    ngOnDestroy(): void;
}
