/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, ElementRef, Inject, Injector, Input, Optional, QueryList, SkipSelf, } from '@angular/core';
import { AbstractPopover } from '../common/abstract-popover';
import { Point } from '../common/popover';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';
import { DropdownFocusHandler } from './providers/dropdown-focus-handler.service';
import { FocusableItem } from '../../utils/focus/focusable-item/focusable-item';
var ClrDropdownMenu = /** @class */ (function (_super) {
    tslib_1.__extends(ClrDropdownMenu, _super);
    function ClrDropdownMenu(injector, parentHost, nested, focusHandler) {
        var _this = this;
        if (!parentHost) {
            throw new Error('clr-dropdown-menu should only be used inside of a clr-dropdown');
        }
        _this = _super.call(this, injector, parentHost) || this;
        if (!nested) {
            // Default positioning for normal dropdown is bottom-left
            _this.anchorPoint = Point.BOTTOM_LEFT;
            _this.popoverPoint = Point.LEFT_TOP;
        }
        else {
            // Default positioning for nested dropdown is right-top
            _this.anchorPoint = Point.RIGHT_TOP;
            _this.popoverPoint = Point.LEFT_TOP;
        }
        _this.popoverOptions.allowMultipleOpen = true;
        _this.closeOnOutsideClick = true;
        _this.focusHandler = focusHandler;
        return _this;
    }
    Object.defineProperty(ClrDropdownMenu.prototype, "position", {
        set: /**
         * @param {?} position
         * @return {?}
         */
        function (position) {
            // set the popover values based on menu position
            switch (position) {
                case 'top-right':
                    this.anchorPoint = Point.TOP_RIGHT;
                    this.popoverPoint = Point.RIGHT_BOTTOM;
                    break;
                case 'top-left':
                    this.anchorPoint = Point.TOP_LEFT;
                    this.popoverPoint = Point.LEFT_BOTTOM;
                    break;
                case 'bottom-right':
                    this.anchorPoint = Point.BOTTOM_RIGHT;
                    this.popoverPoint = Point.RIGHT_TOP;
                    break;
                case 'bottom-left':
                    this.anchorPoint = Point.BOTTOM_LEFT;
                    this.popoverPoint = Point.LEFT_TOP;
                    break;
                case 'right-top':
                    this.anchorPoint = Point.RIGHT_TOP;
                    this.popoverPoint = Point.LEFT_TOP;
                    break;
                case 'right-bottom':
                    this.anchorPoint = Point.RIGHT_BOTTOM;
                    this.popoverPoint = Point.LEFT_BOTTOM;
                    break;
                case 'left-top':
                    this.anchorPoint = Point.LEFT_TOP;
                    this.popoverPoint = Point.RIGHT_TOP;
                    break;
                case 'left-bottom':
                    this.anchorPoint = Point.LEFT_BOTTOM;
                    this.popoverPoint = Point.RIGHT_BOTTOM;
                    break;
                default:
                    this.anchorPoint = Point.BOTTOM_LEFT;
                    this.popoverPoint = Point.LEFT_TOP;
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrDropdownMenu.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.focusHandler.container = this.el.nativeElement;
        this.items.changes.subscribe((/**
         * @return {?}
         */
        function () { return _this.focusHandler.addChildren(_this.items.toArray()); }));
        // I saw this on GitHub as a solution to avoid code duplication because of missed QueryList changes
        this.items.notifyOnChanges();
    };
    /**
     * @return {?}
     */
    ClrDropdownMenu.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this.focusHandler.resetChildren();
    };
    ClrDropdownMenu.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dropdown-menu',
                    template: "\n        <ng-content></ng-content>\n    ",
                    host: {
                        '[class.dropdown-menu]': 'true',
                        '[attr.role]': '"menu"',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrDropdownMenu.ctorParameters = function () { return [
        { type: Injector },
        { type: ElementRef, decorators: [{ type: Optional }, { type: Inject, args: [POPOVER_HOST_ANCHOR,] }] },
        { type: ClrDropdownMenu, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: DropdownFocusHandler }
    ]; };
    ClrDropdownMenu.propDecorators = {
        position: [{ type: Input, args: ['clrPosition',] }],
        items: [{ type: ContentChildren, args: [FocusableItem,] }]
    };
    return ClrDropdownMenu;
}(AbstractPopover));
export { ClrDropdownMenu };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrDropdownMenu.prototype.focusHandler;
    /** @type {?} */
    ClrDropdownMenu.prototype.items;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tbWVudS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvZHJvcGRvd24vZHJvcGRvd24tbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUVMLFFBQVEsRUFDUixTQUFTLEVBQ1QsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBRWhGO0lBVXFDLDJDQUFlO0lBQ2xELHlCQUNFLFFBQWtCLEVBR2xCLFVBQW1DLEVBR25DLE1BQXVCLEVBQ3ZCLFlBQWtDO1FBUnBDLGlCQTBCQztRQWhCQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDO1NBQ25GO1FBQ0QsUUFBQSxrQkFBTSxRQUFRLEVBQUUsVUFBVSxDQUFDLFNBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLHlEQUF5RDtZQUN6RCxLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDckMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1NBQ3BDO2FBQU07WUFDTCx1REFBdUQ7WUFDdkQsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQ25DLEtB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bUI7b0JBQzdCLFFBQVEsRUFBRSwyQ0FFUDtvQkFDSCxJQUFJLEVBQUU7d0JBQ0osdUJBQXVCLEVBQUUsTUFBTTt3QkFDL0IsYUFBYSxFQUFFLFFBQVE7cUJBQ3hCO2lCQUNGOzs7O2dCQXRCQyxRQUFRO2dCQUZSLFVBQVUsdUJBNEJQLFFBQVEsWUFDUixNQUFNLFNBQUMsbUJBQW1CO2dCQUluQixlQUFlLHVCQUZ0QixRQUFRLFlBQ1IsUUFBUTtnQkFwQkosb0JBQW9COzs7MkJBMEMxQixLQUFLLFNBQUMsYUFBYTt3QkE0Q25CLGVBQWUsU0FBQyxhQUFhOztJQWFoQyxzQkFBQztDQUFBLEFBaEdELENBVXFDLGVBQWUsR0FzRm5EO1NBdEZZLGVBQWU7Ozs7OztJQXdFMUIsdUNBQTJDOztJQUMzQyxnQ0FBZ0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFF1ZXJ5TGlzdCxcbiAgU2tpcFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RQb3BvdmVyIH0gZnJvbSAnLi4vY29tbW9uL2Fic3RyYWN0LXBvcG92ZXInO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi9jb21tb24vcG9wb3Zlcic7XG5pbXBvcnQgeyBQT1BPVkVSX0hPU1RfQU5DSE9SIH0gZnJvbSAnLi4vY29tbW9uL3BvcG92ZXItaG9zdC1hbmNob3IudG9rZW4nO1xuaW1wb3J0IHsgRHJvcGRvd25Gb2N1c0hhbmRsZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9kcm9wZG93bi1mb2N1cy1oYW5kbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9jdXNhYmxlSXRlbSB9IGZyb20gJy4uLy4uL3V0aWxzL2ZvY3VzL2ZvY3VzYWJsZS1pdGVtL2ZvY3VzYWJsZS1pdGVtJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRyb3Bkb3duLW1lbnUnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZHJvcGRvd24tbWVudV0nOiAndHJ1ZScsXG4gICAgJ1thdHRyLnJvbGVdJzogJ1wibWVudVwiJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRHJvcGRvd25NZW51IGV4dGVuZHMgQWJzdHJhY3RQb3BvdmVyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChQT1BPVkVSX0hPU1RfQU5DSE9SKVxuICAgIHBhcmVudEhvc3Q6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIEBPcHRpb25hbCgpXG4gICAgQFNraXBTZWxmKClcbiAgICBuZXN0ZWQ6IENsckRyb3Bkb3duTWVudSxcbiAgICBmb2N1c0hhbmRsZXI6IERyb3Bkb3duRm9jdXNIYW5kbGVyXG4gICkge1xuICAgIGlmICghcGFyZW50SG9zdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbHItZHJvcGRvd24tbWVudSBzaG91bGQgb25seSBiZSB1c2VkIGluc2lkZSBvZiBhIGNsci1kcm9wZG93bicpO1xuICAgIH1cbiAgICBzdXBlcihpbmplY3RvciwgcGFyZW50SG9zdCk7XG4gICAgaWYgKCFuZXN0ZWQpIHtcbiAgICAgIC8vIERlZmF1bHQgcG9zaXRpb25pbmcgZm9yIG5vcm1hbCBkcm9wZG93biBpcyBib3R0b20tbGVmdFxuICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LkJPVFRPTV9MRUZUO1xuICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5MRUZUX1RPUDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRGVmYXVsdCBwb3NpdGlvbmluZyBmb3IgbmVzdGVkIGRyb3Bkb3duIGlzIHJpZ2h0LXRvcFxuICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LlJJR0hUX1RPUDtcbiAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuTEVGVF9UT1A7XG4gICAgfVxuICAgIHRoaXMucG9wb3Zlck9wdGlvbnMuYWxsb3dNdWx0aXBsZU9wZW4gPSB0cnVlO1xuICAgIHRoaXMuY2xvc2VPbk91dHNpZGVDbGljayA9IHRydWU7XG4gICAgdGhpcy5mb2N1c0hhbmRsZXIgPSBmb2N1c0hhbmRsZXI7XG4gIH1cblxuICBASW5wdXQoJ2NsclBvc2l0aW9uJylcbiAgc2V0IHBvc2l0aW9uKHBvc2l0aW9uOiBzdHJpbmcpIHtcbiAgICAvLyBzZXQgdGhlIHBvcG92ZXIgdmFsdWVzIGJhc2VkIG9uIG1lbnUgcG9zaXRpb25cbiAgICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgICBjYXNlICd0b3AtcmlnaHQnOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuVE9QX1JJR0hUO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LlJJR0hUX0JPVFRPTTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b3AtbGVmdCc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5UT1BfTEVGVDtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5MRUZUX0JPVFRPTTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20tcmlnaHQnOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuQk9UVE9NX1JJR0hUO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LlJJR0hUX1RPUDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20tbGVmdCc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5CT1RUT01fTEVGVDtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5MRUZUX1RPUDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodC10b3AnOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuUklHSFRfVE9QO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LkxFRlRfVE9QO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0LWJvdHRvbSc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5SSUdIVF9CT1RUT007XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuTEVGVF9CT1RUT007XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdC10b3AnOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuTEVGVF9UT1A7XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuUklHSFRfVE9QO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQtYm90dG9tJzpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LkxFRlRfQk9UVE9NO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LlJJR0hUX0JPVFRPTTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuQk9UVE9NX0xFRlQ7XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuTEVGVF9UT1A7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZm9jdXNIYW5kbGVyOiBEcm9wZG93bkZvY3VzSGFuZGxlcjtcbiAgQENvbnRlbnRDaGlsZHJlbihGb2N1c2FibGVJdGVtKSBpdGVtczogUXVlcnlMaXN0PEZvY3VzYWJsZUl0ZW0+O1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLmZvY3VzSGFuZGxlci5jb250YWluZXIgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5pdGVtcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLmZvY3VzSGFuZGxlci5hZGRDaGlsZHJlbih0aGlzLml0ZW1zLnRvQXJyYXkoKSkpO1xuICAgIC8vIEkgc2F3IHRoaXMgb24gR2l0SHViIGFzIGEgc29sdXRpb24gdG8gYXZvaWQgY29kZSBkdXBsaWNhdGlvbiBiZWNhdXNlIG9mIG1pc3NlZCBRdWVyeUxpc3QgY2hhbmdlc1xuICAgIHRoaXMuaXRlbXMubm90aWZ5T25DaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuZm9jdXNIYW5kbGVyLnJlc2V0Q2hpbGRyZW4oKTtcbiAgfVxufVxuIl19