/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Input, Optional, Output, SkipSelf, TemplateRef, ViewChild } from '@angular/core';
import { ClrLoadingState } from '../../utils/loading/loading';
import { LoadingListener } from '../../utils/loading/loading-listener';
import { ButtonInGroupService } from '../providers/button-in-group.service';
export class ClrButton {
    /**
     * @param {?} buttonInGroupService
     */
    constructor(buttonInGroupService) {
        this.buttonInGroupService = buttonInGroupService;
        this._enableService = false;
        this._inMenu = false;
        this._classNames = 'btn';
        this._name = null;
        this._type = null;
        this._id = null;
        this._disabled = null;
        this._click = new EventEmitter(false);
    }
    /**
     * @return {?}
     */
    get inMenu() {
        return this._inMenu;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set inMenu(value) {
        value = !!value;
        if (this._inMenu !== value) {
            this._inMenu = value;
            // We check if the service flag is enabled
            // and if the service exists because the service is optional
            if (this._enableService && this.buttonInGroupService) {
                this.buttonInGroupService.updateButtonGroup(this);
            }
        }
    }
    /**
     * @return {?}
     */
    get classNames() {
        return this._classNames;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set classNames(value) {
        if (typeof value === 'string') {
            /** @type {?} */
            const classNames = value.split(' ');
            if (classNames.indexOf('btn') === -1) {
                classNames.push('btn');
            }
            this._classNames = classNames.join(' ');
        }
    }
    /**
     * @return {?}
     */
    get name() {
        return this._name;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set name(value) {
        if (typeof value === 'string') {
            this._name = value;
        }
    }
    /**
     * @return {?}
     */
    get type() {
        return this._type;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        if (typeof value === 'string') {
            this._type = value;
        }
    }
    /**
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set id(value) {
        if (typeof value === 'string') {
            this._id = value;
        }
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        if (value !== null && value !== false) {
            this._disabled = '';
        }
        else {
            this._disabled = null;
        }
    }
    /**
     * @param {?} state
     * @return {?}
     */
    loadingStateChange(state) {
        this.loading = state === ClrLoadingState.LOADING;
    }
    /**
     * @return {?}
     */
    emitClick() {
        this._click.emit(true);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._enableService = true;
    }
}
ClrButton.decorators = [
    { type: Component, args: [{
                selector: 'clr-button',
                template: `
        <ng-template #buttonProjectedRef>
            <button 
                [class]="classNames" 
                (click)="emitClick()"
                [attr.type]="type"
                [attr.name]="name"
                [attr.disabled]="disabled"
                [id]="id">
                <span class="spinner spinner-inline" *ngIf="loading"></span>
                <ng-content></ng-content>
            </button>
        </ng-template>
    `,
                providers: [{ provide: LoadingListener, useExisting: ClrButton }]
            }] }
];
/** @nocollapse */
ClrButton.ctorParameters = () => [
    { type: ButtonInGroupService, decorators: [{ type: SkipSelf }, { type: Optional }] }
];
ClrButton.propDecorators = {
    templateRef: [{ type: ViewChild, args: ['buttonProjectedRef',] }],
    inMenu: [{ type: Input, args: ['clrInMenu',] }],
    classNames: [{ type: Input, args: ['class',] }],
    name: [{ type: Input, args: ['name',] }],
    type: [{ type: Input, args: ['type',] }],
    id: [{ type: Input, args: ['id',] }],
    disabled: [{ type: Input, args: ['disabled',] }],
    _click: [{ type: Output, args: ['click',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrButton.prototype._enableService;
    /** @type {?} */
    ClrButton.prototype.templateRef;
    /**
     * @type {?}
     * @private
     */
    ClrButton.prototype._inMenu;
    /**
     * @type {?}
     * @private
     */
    ClrButton.prototype._classNames;
    /**
     * @type {?}
     * @private
     */
    ClrButton.prototype._name;
    /**
     * @type {?}
     * @private
     */
    ClrButton.prototype._type;
    /**
     * @type {?}
     * @private
     */
    ClrButton.prototype._id;
    /**
     * @type {?}
     * @private
     */
    ClrButton.prototype._disabled;
    /** @type {?} */
    ClrButton.prototype.loading;
    /** @type {?} */
    ClrButton.prototype._click;
    /** @type {?} */
    ClrButton.prototype.buttonInGroupService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiYnV0dG9uL2J1dHRvbi1ncm91cC9idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQW9CNUUsTUFBTSxPQUFPLFNBQVM7Ozs7SUFLcEIsWUFHUyxvQkFBMEM7UUFBMUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQVAzQyxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQVVoQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBbUJ6QixnQkFBVyxHQUFXLEtBQUssQ0FBQztRQWlCNUIsVUFBSyxHQUFXLElBQUksQ0FBQztRQWFyQixVQUFLLEdBQVcsSUFBSSxDQUFDO1FBYXJCLFFBQUcsR0FBVyxJQUFJLENBQUM7UUFhbkIsY0FBUyxHQUFRLElBQUksQ0FBQztRQXFCYixXQUFNLEdBQTBCLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBbEcvRSxDQUFDOzs7O0lBSUosSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBRUQsSUFDSSxNQUFNLENBQUMsS0FBYztRQUN2QixLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNoQixJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO1lBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxD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LFNBQUMsTUFBTTtpQkFhWixLQUFLLFNBQUMsSUFBSTt1QkFhVixLQUFLLFNBQUMsVUFBVTtxQkFlaEIsTUFBTSxTQUFDLE9BQU87Ozs7Ozs7SUExR2YsbUNBQXdDOztJQUV4QyxnQ0FBcUU7Ozs7O0lBUXJFLDRCQUFpQzs7Ozs7SUFtQmpDLGdDQUFvQzs7Ozs7SUFpQnBDLDBCQUE2Qjs7Ozs7SUFhN0IsMEJBQTZCOzs7OztJQWE3Qix3QkFBMkI7Ozs7O0lBYTNCLDhCQUE4Qjs7SUFlOUIsNEJBQXdCOztJQU14QiwyQkFBa0Y7O0lBckdoRix5Q0FFaUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3B0aW9uYWwsIE91dHB1dCwgU2tpcFNlbGYsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xyTG9hZGluZ1N0YXRlIH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9hZGluZy9sb2FkaW5nJztcbmltcG9ydCB7IExvYWRpbmdMaXN0ZW5lciB9IGZyb20gJy4uLy4uL3V0aWxzL2xvYWRpbmcvbG9hZGluZy1saXN0ZW5lcic7XG5pbXBvcnQgeyBCdXR0b25Jbkdyb3VwU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9idXR0b24taW4tZ3JvdXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1idXR0b24nLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctdGVtcGxhdGUgI2J1dHRvblByb2plY3RlZFJlZj5cbiAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgW2NsYXNzXT1cImNsYXNzTmFtZXNcIiBcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiZW1pdENsaWNrKClcIlxuICAgICAgICAgICAgICAgIFthdHRyLnR5cGVdPVwidHlwZVwiXG4gICAgICAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgW2lkXT1cImlkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzcGlubmVyIHNwaW5uZXItaW5saW5lXCIgKm5nSWY9XCJsb2FkaW5nXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTG9hZGluZ0xpc3RlbmVyLCB1c2VFeGlzdGluZzogQ2xyQnV0dG9uIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJCdXR0b24gaW1wbGVtZW50cyBMb2FkaW5nTGlzdGVuZXIge1xuICBwcml2YXRlIF9lbmFibGVTZXJ2aWNlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQFZpZXdDaGlsZCgnYnV0dG9uUHJvamVjdGVkUmVmJykgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPENsckJ1dHRvbj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQFNraXBTZWxmKClcbiAgICBAT3B0aW9uYWwoKVxuICAgIHB1YmxpYyBidXR0b25Jbkdyb3VwU2VydmljZTogQnV0dG9uSW5Hcm91cFNlcnZpY2VcbiAgKSB7fVxuXG4gIHByaXZhdGUgX2luTWVudTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBpbk1lbnUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2luTWVudTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xySW5NZW51JylcbiAgc2V0IGluTWVudSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICBpZiAodGhpcy5faW5NZW51ICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5faW5NZW51ID0gdmFsdWU7XG4gICAgICAvLyBXZSBjaGVjayBpZiB0aGUgc2VydmljZSBmbGFnIGlzIGVuYWJsZWRcbiAgICAgIC8vIGFuZCBpZiB0aGUgc2VydmljZSBleGlzdHMgYmVjYXVzZSB0aGUgc2VydmljZSBpcyBvcHRpb25hbFxuICAgICAgaWYgKHRoaXMuX2VuYWJsZVNlcnZpY2UgJiYgdGhpcy5idXR0b25Jbkdyb3VwU2VydmljZSkge1xuICAgICAgICB0aGlzLmJ1dHRvbkluR3JvdXBTZXJ2aWNlLnVwZGF0ZUJ1dHRvbkdyb3VwKHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NsYXNzTmFtZXM6IHN0cmluZyA9ICdidG4nO1xuXG4gIGdldCBjbGFzc05hbWVzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NsYXNzTmFtZXM7XG4gIH1cblxuICBASW5wdXQoJ2NsYXNzJylcbiAgc2V0IGNsYXNzTmFtZXModmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBjbGFzc05hbWVzOiBzdHJpbmdbXSA9IHZhbHVlLnNwbGl0KCcgJyk7XG4gICAgICBpZiAoY2xhc3NOYW1lcy5pbmRleE9mKCdidG4nKSA9PT0gLTEpIHtcbiAgICAgICAgY2xhc3NOYW1lcy5wdXNoKCdidG4nKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2NsYXNzTmFtZXMgPSBjbGFzc05hbWVzLmpvaW4oJyAnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9uYW1lOiBzdHJpbmcgPSBudWxsO1xuXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBASW5wdXQoJ25hbWUnKVxuICBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF90eXBlOiBzdHJpbmcgPSBudWxsO1xuXG4gIGdldCB0eXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gIH1cblxuICBASW5wdXQoJ3R5cGUnKVxuICBzZXQgdHlwZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX3R5cGUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pZDogc3RyaW5nID0gbnVsbDtcblxuICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICBASW5wdXQoJ2lkJylcbiAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5faWQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kaXNhYmxlZDogYW55ID0gbnVsbDtcblxuICBnZXQgZGlzYWJsZWQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoJ2Rpc2FibGVkJylcbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLl9kaXNhYmxlZCA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kaXNhYmxlZCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGxvYWRpbmc6IGJvb2xlYW47XG5cbiAgbG9hZGluZ1N0YXRlQ2hhbmdlKHN0YXRlOiBDbHJMb2FkaW5nU3RhdGUpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBzdGF0ZSA9PT0gQ2xyTG9hZGluZ1N0YXRlLkxPQURJTkc7XG4gIH1cblxuICBAT3V0cHV0KCdjbGljaycpIF9jbGljazogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG5cbiAgZW1pdENsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuX2NsaWNrLmVtaXQodHJ1ZSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fZW5hYmxlU2VydmljZSA9IHRydWU7XG4gIH1cbn1cbiJdfQ==