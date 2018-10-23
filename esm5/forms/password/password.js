/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, HostListener, Optional, ViewContainerRef, Renderer2, Inject, ElementRef, } from '@angular/core';
import { NgControl } from '@angular/forms';
import { IfErrorService } from '../common/if-error/if-error.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { ClrPasswordContainer, ToggleService } from './password-container';
import { WrappedFormControl } from '../common/wrapped-control';
import { FocusService } from '../common/providers/focus.service';
import { BehaviorSubject } from 'rxjs';
import { ControlClassService } from '../common/providers/control-class.service';
var ClrPassword = /** @class */ (function (_super) {
    tslib_1.__extends(ClrPassword, _super);
    function ClrPassword(vcr, ngControlService, ifErrorService, control, focusService, controlClassService, renderer, el, toggleService) {
        var _this = _super.call(this, ClrPasswordContainer, vcr, 1) || this;
        _this.ngControlService = ngControlService;
        _this.ifErrorService = ifErrorService;
        _this.control = control;
        _this.focusService = focusService;
        _this.toggleService = toggleService;
        if (!_this.control) {
            throw new Error('clrPassword can only be used within an Angular form control, add ngModel or formControl to the input');
        }
        if (!_this.focusService) {
            throw new Error('clrPassword requires being wrapped in <clr-password-container>');
        }
        if (controlClassService) {
            controlClassService.initControlClass(renderer, el.nativeElement);
        }
        _this.subscription = _this.toggleService.subscribe(function (toggle) {
            renderer.setProperty(el.nativeElement, 'type', toggle ? 'text' : 'password');
        });
        return _this;
    }
    /**
     * @return {?}
     */
    ClrPassword.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (this.ngControlService) {
            this.ngControlService.setControl(this.control);
        }
    };
    /**
     * @return {?}
     */
    ClrPassword.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    ClrPassword.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        if (this.focusService) {
            this.focusService.focused = true;
        }
    };
    /**
     * @return {?}
     */
    ClrPassword.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
        if (this.focusService) {
            this.focusService.focused = false;
        }
    };
    ClrPassword.decorators = [
        { type: Directive, args: [{ selector: '[clrPassword]', host: { '[class.clr-input]': 'true' } },] }
    ];
    /** @nocollapse */
    ClrPassword.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: NgControlService, decorators: [{ type: Optional }] },
        { type: IfErrorService, decorators: [{ type: Optional }] },
        { type: NgControl, decorators: [{ type: Optional }] },
        { type: FocusService, decorators: [{ type: Optional }] },
        { type: ControlClassService },
        { type: Renderer2 },
        { type: ElementRef },
        { type: BehaviorSubject, decorators: [{ type: Inject, args: [ToggleService,] }] }
    ]; };
    ClrPassword.propDecorators = {
        onFocus: [{ type: HostListener, args: ['focus',] }],
        onBlur: [{ type: HostListener, args: ['blur',] }]
    };
    return ClrPassword;
}(WrappedFormControl));
export { ClrPassword };
if (false) {
    /** @type {?} */
    ClrPassword.prototype.subscription;
    /** @type {?} */
    ClrPassword.prototype.ngControlService;
    /** @type {?} */
    ClrPassword.prototype.ifErrorService;
    /** @type {?} */
    ClrPassword.prototype.control;
    /** @type {?} */
    ClrPassword.prototype.focusService;
    /** @type {?} */
    ClrPassword.prototype.toggleService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9wYXNzd29yZC9wYXNzd29yZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxZQUFZLEVBQ1osUUFBUSxFQUNSLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsTUFBTSxFQUNOLFVBQVUsR0FFWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFaEY7SUFDaUMsdUNBQXdDO0lBR3ZFLHFCQUNFLEdBQXFCLEVBQ0QsZ0JBQWtDLEVBQ2xDLGNBQThCLEVBQzlCLE9BQWtCLEVBQ2xCLFlBQTBCLEVBQzlDLG1CQUF3QyxFQUN4QyxRQUFtQixFQUNuQixFQUFjLEVBQ2lCLGFBQXVDO1FBVHhFLFlBV0Usa0JBQU0sb0JBQW9CLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQWVwQztRQXhCcUIsc0JBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsYUFBTyxHQUFQLE9BQU8sQ0FBVztRQUNsQixrQkFBWSxHQUFaLFlBQVksQ0FBYztRQUlmLG1CQUFhLEdBQWIsYUFBYSxDQUEwQjtRQUd0RSxJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixNQUFNLElBQUksS0FBSyxDQUNiLHNHQUFzRyxDQUN2RyxDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7U0FDbkY7UUFDRCxJQUFJLG1CQUFtQixFQUFFO1lBQ3ZCLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbEU7UUFDRCxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNyRCxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRSxDQUFDLENBQUMsQ0FBQzs7SUFDTCxDQUFDOzs7O0lBRUQsOEJBQVE7OztJQUFSO1FBQ0UsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDOzs7O0lBRUQsaUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7O0lBR0QsNkJBQU87OztJQURQO1FBRUUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNsQztJQUNILENBQUM7Ozs7SUFHRCw0QkFBTTs7O0lBRE47UUFFRSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUNuQztJQUNILENBQUM7O2dCQTFERixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sRUFBRSxFQUFFOzs7O2dCQWhCN0UsZ0JBQWdCO2dCQVNULGdCQUFnQix1QkFhcEIsUUFBUTtnQkFkSixjQUFjLHVCQWVsQixRQUFRO2dCQWpCSixTQUFTLHVCQWtCYixRQUFRO2dCQVpKLFlBQVksdUJBYWhCLFFBQVE7Z0JBWEosbUJBQW1CO2dCQWIxQixTQUFTO2dCQUVULFVBQVU7Z0JBVUgsZUFBZSx1QkFnQm5CLE1BQU0sU0FBQyxhQUFhOzs7MEJBOEJ0QixZQUFZLFNBQUMsT0FBTzt5QkFPcEIsWUFBWSxTQUFDLE1BQU07O0lBU3RCLGtCQUFDO0NBQUEsQUEzREQsQ0FDaUMsa0JBQWtCLEdBMERsRDtTQTFEWSxXQUFXOzs7SUFDdEIsbUNBQTJCOztJQUl6Qix1Q0FBc0Q7O0lBQ3RELHFDQUFrRDs7SUFDbEQsOEJBQXNDOztJQUN0QyxtQ0FBOEM7O0lBSTlDLG9DQUFzRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgT25Jbml0LFxuICBIb3N0TGlzdGVuZXIsXG4gIE9wdGlvbmFsLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBSZW5kZXJlcjIsXG4gIEluamVjdCxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgSWZFcnJvclNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vaWYtZXJyb3IvaWYtZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9uZy1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyUGFzc3dvcmRDb250YWluZXIsIFRvZ2dsZVNlcnZpY2UgfSBmcm9tICcuL3Bhc3N3b3JkLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBXcmFwcGVkRm9ybUNvbnRyb2wgfSBmcm9tICcuLi9jb21tb24vd3JhcHBlZC1jb250cm9sJztcbmltcG9ydCB7IEZvY3VzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29udHJvbENsYXNzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1jbGFzcy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsclBhc3N3b3JkXScsIGhvc3Q6IHsgJ1tjbGFzcy5jbHItaW5wdXRdJzogJ3RydWUnIH0gfSlcbmV4cG9ydCBjbGFzcyBDbHJQYXNzd29yZCBleHRlbmRzIFdyYXBwZWRGb3JtQ29udHJvbDxDbHJQYXNzd29yZENvbnRhaW5lcj4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBpZkVycm9yU2VydmljZTogSWZFcnJvclNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBmb2N1c1NlcnZpY2U6IEZvY3VzU2VydmljZSxcbiAgICBjb250cm9sQ2xhc3NTZXJ2aWNlOiBDb250cm9sQ2xhc3NTZXJ2aWNlLFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgZWw6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChUb2dnbGVTZXJ2aWNlKSBwcml2YXRlIHRvZ2dsZVNlcnZpY2U6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPlxuICApIHtcbiAgICBzdXBlcihDbHJQYXNzd29yZENvbnRhaW5lciwgdmNyLCAxKTtcbiAgICBpZiAoIXRoaXMuY29udHJvbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnY2xyUGFzc3dvcmQgY2FuIG9ubHkgYmUgdXNlZCB3aXRoaW4gYW4gQW5ndWxhciBmb3JtIGNvbnRyb2wsIGFkZCBuZ01vZGVsIG9yIGZvcm1Db250cm9sIHRvIHRoZSBpbnB1dCdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghdGhpcy5mb2N1c1NlcnZpY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xyUGFzc3dvcmQgcmVxdWlyZXMgYmVpbmcgd3JhcHBlZCBpbiA8Y2xyLXBhc3N3b3JkLWNvbnRhaW5lcj4nKTtcbiAgICB9XG4gICAgaWYgKGNvbnRyb2xDbGFzc1NlcnZpY2UpIHtcbiAgICAgIGNvbnRyb2xDbGFzc1NlcnZpY2UuaW5pdENvbnRyb2xDbGFzcyhyZW5kZXJlciwgZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy50b2dnbGVTZXJ2aWNlLnN1YnNjcmliZSh0b2dnbGUgPT4ge1xuICAgICAgcmVuZGVyZXIuc2V0UHJvcGVydHkoZWwubmF0aXZlRWxlbWVudCwgJ3R5cGUnLCB0b2dnbGUgPyAndGV4dCcgOiAncGFzc3dvcmQnKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgaWYgKHRoaXMubmdDb250cm9sU2VydmljZSkge1xuICAgICAgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlLnNldENvbnRyb2wodGhpcy5jb250cm9sKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxuICBvbkZvY3VzKCkge1xuICAgIGlmICh0aGlzLmZvY3VzU2VydmljZSkge1xuICAgICAgdGhpcy5mb2N1c1NlcnZpY2UuZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIG9uQmx1cigpIHtcbiAgICBpZiAodGhpcy5pZkVycm9yU2VydmljZSkge1xuICAgICAgdGhpcy5pZkVycm9yU2VydmljZS50cmlnZ2VyU3RhdHVzQ2hhbmdlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmZvY3VzU2VydmljZSkge1xuICAgICAgdGhpcy5mb2N1c1NlcnZpY2UuZm9jdXNlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIl19