import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { ClrDropdown } from './dropdown';
import { FocusableItem } from '../../utils/focus/focusable-item/focusable-item';
import { RootDropdownService } from './providers/dropdown.service';
export declare class ClrDropdownItem implements AfterViewInit {
    private dropdown;
    private el;
    private _dropdownService;
    private renderer;
    private focusableItem;
    constructor(dropdown: ClrDropdown, el: ElementRef<HTMLElement>, _dropdownService: RootDropdownService, renderer: Renderer2, focusableItem: FocusableItem);
    private unlisten;
    disabled: boolean | string;
    ngAfterViewInit(): void;
    onDropdownItemClick(): void;
    ngOnDestroy(): void;
}
