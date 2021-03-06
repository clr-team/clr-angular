import { AfterContentInit, ElementRef, Injector, OnDestroy, QueryList } from '@angular/core';
import { AbstractPopover } from '../common/abstract-popover';
import { DropdownFocusHandler } from './providers/dropdown-focus-handler.service';
import { FocusableItem } from '../../utils/focus/focusable-item/focusable-item';
export declare class ClrDropdownMenu extends AbstractPopover implements AfterContentInit, OnDestroy {
    constructor(injector: Injector, parentHost: ElementRef<HTMLElement>, nested: ClrDropdownMenu, focusHandler: DropdownFocusHandler);
    position: string;
    private focusHandler;
    items: QueryList<FocusableItem>;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
