import { ElementRef } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { ClrDropdown } from './dropdown';
import { DropdownFocusHandler } from './providers/dropdown-focus-handler.service';
export declare class ClrDropdownTrigger {
    private ifOpenService;
    isRootLevelToggle: boolean;
    constructor(dropdown: ClrDropdown, ifOpenService: IfOpenService, el: ElementRef<HTMLElement>, focusHandler: DropdownFocusHandler);
    readonly active: boolean;
    onDropdownTriggerClick(event: any): void;
}
