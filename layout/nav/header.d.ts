import { OnDestroy } from '@angular/core';
import { ResponsiveNavigationService } from './providers/responsive-navigation.service';
import { ResponsiveNavCodes } from './responsive-nav-codes';
export declare class ClrHeader implements OnDestroy {
    private responsiveNavService;
    private _subscription;
    isNavLevel1OnPage: boolean;
    isNavLevel2OnPage: boolean;
    constructor(responsiveNavService: ResponsiveNavigationService);
    readonly responsiveNavCodes: ResponsiveNavCodes;
    resetNavTriggers(): void;
    initializeNavTriggers(navList: number[]): void;
    closeOpenNav(): void;
    toggleNav(navLevel: number): void;
    ngOnDestroy(): void;
}
