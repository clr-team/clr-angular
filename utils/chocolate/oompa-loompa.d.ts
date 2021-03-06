import { AfterContentChecked, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { WillyWonka } from './willy-wonka';
export declare abstract class OompaLoompa implements AfterContentChecked, OnDestroy {
    constructor(cdr: ChangeDetectorRef, willyWonka: WillyWonka);
    private subscription;
    private latestFlavor;
    abstract readonly flavor: any;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
}
