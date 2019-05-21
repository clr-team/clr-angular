/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectorRef, Component, ElementRef, Input, Optional, SkipSelf } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';
import { DROPDOWN_FOCUS_HANDLER_PROVIDER } from './providers/dropdown-focus-handler.service';
import { FOCUS_SERVICE_PROVIDER } from '../../utils/focus/focus.service';
import { ROOT_DROPDOWN_PROVIDER, RootDropdownService } from './providers/dropdown.service';
var ClrDropdown = /** @class */ (function () {
    function ClrDropdown(parent, ifOpenService, cdr, dropdownService) {
        var _this = this;
        this.parent = parent;
        this.ifOpenService = ifOpenService;
        this.cdr = cdr;
        this.subscriptions = [];
        this.isMenuClosable = true;
        this.subscriptions.push(dropdownService.changes.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return (_this.ifOpenService.open = value); })));
        this.subscriptions.push(ifOpenService.openChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.cdr.markForCheck(); })));
    }
    /**
     * @return {?}
     */
    ClrDropdown.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrDropdown.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dropdown',
                    template: '<ng-content></ng-content>',
                    host: {
                        '[class.dropdown]': 'true',
                        // the open class, also used in static version, is always present in the Angular version
                        // Angular takes care of hiding it, regardless of whether you use *clrIfOpen or not
                        '[class.open]': 'true',
                    },
                    providers: [
                        IfOpenService,
                        ROOT_DROPDOWN_PROVIDER,
                        { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef },
                        FOCUS_SERVICE_PROVIDER,
                        DROPDOWN_FOCUS_HANDLER_PROVIDER,
                    ]
                }] }
    ];
    /** @nocollapse */
    ClrDropdown.ctorParameters = function () { return [
        { type: ClrDropdown, decorators: [{ type: SkipSelf }, { type: Optional }] },
        { type: IfOpenService },
        { type: ChangeDetectorRef },
        { type: RootDropdownService }
    ]; };
    ClrDropdown.propDecorators = {
        isMenuClosable: [{ type: Input, args: ['clrCloseMenuOnItemClick',] }]
    };
    return ClrDropdown;
}());
export { ClrDropdown };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrDropdown.prototype.subscriptions;
    /** @type {?} */
    ClrDropdown.prototype.isMenuClosable;
    /** @type {?} */
    ClrDropdown.prototype.parent;
    /** @type {?} */
    ClrDropdown.prototype.ifOpenService;
    /**
     * @type {?}
     * @private
     */
    ClrDropdown.prototype.cdr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJwb3BvdmVyL2Ryb3Bkb3duL2Ryb3Bkb3duLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRy9HLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM3RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUUzRjtJQW9CRSxxQkFHUyxNQUFtQixFQUNuQixhQUE0QixFQUMzQixHQUFzQixFQUM5QixlQUFvQztRQU50QyxpQkFVQztRQVBRLFdBQU0sR0FBTixNQUFNLENBQWE7UUFDbkIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDM0IsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFQeEIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBY1QsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFKL0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFqQyxDQUFpQyxFQUFDLENBQUMsQ0FBQztRQUN2RyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEVBQXZCLENBQXVCLEVBQUMsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7Ozs7SUFJRCxpQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsRUFBQyxDQUFDO0lBQ3ZELENBQUM7O2dCQXBDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLElBQUksRUFBRTt3QkFDSixrQkFBa0IsRUFBRSxNQUFNOzs7d0JBRzFCLGNBQWMsRUFBRSxNQUFNO3FCQUN2QjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsYUFBYTt3QkFDYixzQkFBc0I7d0JBQ3RCLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUU7d0JBQ3pELHNCQUFzQjt3QkFDdEIsK0JBQStCO3FCQUNoQztpQkFDRjs7OztnQkFPa0IsV0FBVyx1QkFGekIsUUFBUSxZQUNSLFFBQVE7Z0JBN0JKLGFBQWE7Z0JBSGIsaUJBQWlCO2dCQVFPLG1CQUFtQjs7O2lDQWtDakQsS0FBSyxTQUFDLHlCQUF5Qjs7SUFLbEMsa0JBQUM7Q0FBQSxBQXJDRCxJQXFDQztTQXBCWSxXQUFXOzs7Ozs7SUFDdEIsb0NBQTJDOztJQWMzQyxxQ0FBaUU7O0lBWC9ELDZCQUUwQjs7SUFDMUIsb0NBQW1DOzs7OztJQUNuQywwQkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJZk9wZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtb3Blbi5zZXJ2aWNlJztcbmltcG9ydCB7IFBPUE9WRVJfSE9TVF9BTkNIT1IgfSBmcm9tICcuLi9jb21tb24vcG9wb3Zlci1ob3N0LWFuY2hvci50b2tlbic7XG5pbXBvcnQgeyBEUk9QRE9XTl9GT0NVU19IQU5ETEVSX1BST1ZJREVSIH0gZnJvbSAnLi9wcm92aWRlcnMvZHJvcGRvd24tZm9jdXMtaGFuZGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEZPQ1VTX1NFUlZJQ0VfUFJPVklERVIgfSBmcm9tICcuLi8uLi91dGlscy9mb2N1cy9mb2N1cy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgUk9PVF9EUk9QRE9XTl9QUk9WSURFUiwgUm9vdERyb3Bkb3duU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2Ryb3Bkb3duLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZHJvcGRvd24nLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kcm9wZG93bl0nOiAndHJ1ZScsXG4gICAgLy8gdGhlIG9wZW4gY2xhc3MsIGFsc28gdXNlZCBpbiBzdGF0aWMgdmVyc2lvbiwgaXMgYWx3YXlzIHByZXNlbnQgaW4gdGhlIEFuZ3VsYXIgdmVyc2lvblxuICAgIC8vIEFuZ3VsYXIgdGFrZXMgY2FyZSBvZiBoaWRpbmcgaXQsIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB5b3UgdXNlICpjbHJJZk9wZW4gb3Igbm90XG4gICAgJ1tjbGFzcy5vcGVuXSc6ICd0cnVlJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgSWZPcGVuU2VydmljZSxcbiAgICBST09UX0RST1BET1dOX1BST1ZJREVSLFxuICAgIHsgcHJvdmlkZTogUE9QT1ZFUl9IT1NUX0FOQ0hPUiwgdXNlRXhpc3Rpbmc6IEVsZW1lbnRSZWYgfSxcbiAgICBGT0NVU19TRVJWSUNFX1BST1ZJREVSLFxuICAgIERST1BET1dOX0ZPQ1VTX0hBTkRMRVJfUFJPVklERVIsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRyb3Bkb3duIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBTa2lwU2VsZigpXG4gICAgQE9wdGlvbmFsKClcbiAgICBwdWJsaWMgcGFyZW50OiBDbHJEcm9wZG93bixcbiAgICBwdWJsaWMgaWZPcGVuU2VydmljZTogSWZPcGVuU2VydmljZSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgZHJvcGRvd25TZXJ2aWNlOiBSb290RHJvcGRvd25TZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGRyb3Bkb3duU2VydmljZS5jaGFuZ2VzLnN1YnNjcmliZSh2YWx1ZSA9PiAodGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPSB2YWx1ZSkpKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChpZk9wZW5TZXJ2aWNlLm9wZW5DaGFuZ2Uuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpKSk7XG4gIH1cblxuICBASW5wdXQoJ2NsckNsb3NlTWVudU9uSXRlbUNsaWNrJykgaXNNZW51Q2xvc2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==