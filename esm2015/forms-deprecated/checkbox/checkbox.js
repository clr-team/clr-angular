/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * Private counter to generate unique IDs for the checkboxes, to bind the labels to them.
 * @type {?}
 */
let latestId = 0;
/**
 * @deprecated ClrCheckbox will be renamed to ClrCheckboxDeprecated in 0.12, and will be replaced with a new
 * implementation in 0.13, so if you import it you will need to update your references.
 */
export class ClrCheckboxDeprecated {
    constructor() {
        // If our host has an ID attribute, we use this instead of our index.
        this._id = (latestId++).toString();
        // If host provides an clrAriaLabeledBy input, we apply it to the checkbox
        this.clrAriaLabeledBy = null;
        // If our host has a name attribute, we apply it to the checkbox.
        this.name = null;
        // If the host is disabled we apply it to the checkbox
        this.disabled = false;
        // Support for inline checkboxes, adds the necessary class to the host
        this.inline = false;
        this._checked = false;
        this._indeterminate = false;
        this.indeterminateChange = new EventEmitter(false);
        this.change = new EventEmitter(false);
        /*
             * These callbacks will be given to us through the ControlValueAccessor interface,
             * and we need to call them when the user interacts with the checkbox.
             */
        this.onChangeCallback = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.onTouchedCallback = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @return {?}
     */
    get id() {
        return `clr-checkbox-${this._id}`;
    }
    /**
     * @return {?}
     */
    get checked() {
        return this._checked;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set checked(value) {
        if (value !== this._checked) {
            if (this._indeterminate) {
                this.setIndeterminate(false);
            }
            this.setChecked(value);
        }
    }
    /**
     * @return {?}
     */
    get indeterminate() {
        return this._indeterminate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set indeterminate(value) {
        if (this._indeterminate !== value) {
            if (this._checked) {
                this.setChecked(false);
            }
            this.setIndeterminate(value);
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    setIndeterminate(value) {
        this._indeterminate = value;
        this.indeterminateChange.emit(this._indeterminate);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    setChecked(value) {
        this._checked = value;
        this.change.emit(this._checked);
    }
    /**
     * @return {?}
     */
    toggle() {
        this.checked = !this.checked;
        this.onChangeCallback(this.checked);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value === null) {
            value = false;
        }
        if (value !== this.checked) {
            this.checked = value;
        }
    }
    /**
     * @param {?} onChange
     * @return {?}
     */
    registerOnChange(onChange) {
        this.onChangeCallback = onChange;
    }
    /**
     * @param {?} onTouched
     * @return {?}
     */
    registerOnTouched(onTouched) {
        this.onTouchedCallback = onTouched;
    }
    /**
     * @return {?}
     */
    touch() {
        this.onTouchedCallback();
    }
    /**
     * @return {?}
     */
    checkIndeterminateState() {
        if (!this.disabled) {
            this.toggle();
        }
    }
}
ClrCheckboxDeprecated.decorators = [
    { type: Component, args: [{
                selector: 'clr-checkbox',
                template: `
        <!--
            FIXME: We are not subscribed to the change event but the click event here.
            The reason for that is because checkboxes behave differently on IE & Edge.
            https://stackoverflow.com/a/19447939
            
            To fix that, we listen to every click event and then toggle the checkbox manually
            to make it behave the same way across the browsers we support.
            
            This works for cases when users toggle the checkbox using the keyboard too:
            https://stackoverflow.com/questions/27878940/spacebar-triggering-click-event-on-checkbox
        -->
        <input type="checkbox" [attr.aria-labelledby]="clrAriaLabeledBy"
               [id]="id" [name]="name" [checked]="checked"
               [indeterminate]="indeterminate" [disabled]="disabled"
               (blur)="touch()" (click)="checkIndeterminateState()">
        <label [attr.for]="id">
            <ng-content></ng-content>
        </label>
    `,
                host: { '[class.checkbox]': '!inline', '[class.checkbox-inline]': 'inline', '[class.disabled]': 'disabled' },
                /*
                     * This provider lets us declare our checkbox as a ControlValueAccessor,
                     * which allows us to use [(ngModel)] directly on our component,
                     * with all the automatic features wiring that come with it.
                     */
                providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => ClrCheckboxDeprecated)), multi: true }]
            }] }
];
ClrCheckboxDeprecated.propDecorators = {
    _id: [{ type: Input, args: ['id',] }],
    clrAriaLabeledBy: [{ type: Input, args: ['clrAriaLabeledBy',] }],
    name: [{ type: Input, args: ['name',] }],
    disabled: [{ type: Input, args: ['clrDisabled',] }],
    inline: [{ type: Input, args: ['clrInline',] }],
    checked: [{ type: Input, args: ['clrChecked',] }],
    indeterminate: [{ type: Input, args: ['clrIndeterminate',] }],
    indeterminateChange: [{ type: Output, args: ['clrIndeterminateChange',] }],
    change: [{ type: Output, args: ['clrCheckedChange',] }]
};
if (false) {
    /** @type {?} */
    ClrCheckboxDeprecated.prototype._id;
    /** @type {?} */
    ClrCheckboxDeprecated.prototype.clrAriaLabeledBy;
    /** @type {?} */
    ClrCheckboxDeprecated.prototype.name;
    /** @type {?} */
    ClrCheckboxDeprecated.prototype.disabled;
    /** @type {?} */
    ClrCheckboxDeprecated.prototype.inline;
    /**
     * @type {?}
     * @private
     */
    ClrCheckboxDeprecated.prototype._checked;
    /**
     * @type {?}
     * @private
     */
    ClrCheckboxDeprecated.prototype._indeterminate;
    /** @type {?} */
    ClrCheckboxDeprecated.prototype.indeterminateChange;
    /** @type {?} */
    ClrCheckboxDeprecated.prototype.change;
    /**
     * @type {?}
     * @private
     */
    ClrCheckboxDeprecated.prototype.onChangeCallback;
    /**
     * @type {?}
     * @private
     */
    ClrCheckboxDeprecated.prototype.onTouchedCallback;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy1kZXByZWNhdGVkL2NoZWNrYm94L2NoZWNrYm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7SUFLckUsUUFBUSxHQUFHLENBQUM7Ozs7O0FBb0NoQixNQUFNLE9BQU8scUJBQXFCO0lBOUJsQzs7UUFnQ2UsUUFBRyxHQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFPakIscUJBQWdCLEdBQVcsSUFBSSxDQUFDOztRQUc1QyxTQUFJLEdBQVcsSUFBSSxDQUFDOztRQUdiLGFBQVEsR0FBWSxLQUFLLENBQUM7O1FBRzVCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFbEMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQWdCakIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFpQmpDLHdCQUFtQixHQUEwQixJQUFJLFlBQVksQ0FBVSxLQUFLLENBQUMsQ0FBQztRQVlsRCxXQUFNLEdBQUcsSUFBSSxZQUFZLENBQVUsS0FBSyxDQUFDLENBQUM7Ozs7O1FBb0JyRSxxQkFBZ0I7Ozs7UUFBRyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUUsQ0FBQyxFQUFDO1FBTWxDLHNCQUFpQjs7O1FBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFDO0lBZXZDLENBQUM7Ozs7SUF0R0MsSUFBVyxFQUFFO1FBQ1gsT0FBTyxnQkFBZ0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFnQkQsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixD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QmxCLEtBQUssU0FBQyxrQkFBa0I7a0NBVXhCLE1BQU0sU0FBQyx3QkFBd0I7cUJBYS9CLE1BQU0sU0FBQyxrQkFBa0I7Ozs7SUEvRDFCLG9DQUFtRDs7SUFPbkQsaURBQWtFOztJQUdsRSxxQ0FBMEM7O0lBRzFDLHlDQUF1RDs7SUFHdkQsdUNBQTBDOzs7OztJQUUxQyx5Q0FBeUI7Ozs7O0lBZ0J6QiwrQ0FBd0M7O0lBZ0J4QyxvREFDcUY7O0lBWXJGLHVDQUE2RTs7Ozs7SUFvQjdFLGlEQUEwQzs7Ozs7SUFNMUMsa0RBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLyoqXG4gKiBQcml2YXRlIGNvdW50ZXIgdG8gZ2VuZXJhdGUgdW5pcXVlIElEcyBmb3IgdGhlIGNoZWNrYm94ZXMsIHRvIGJpbmQgdGhlIGxhYmVscyB0byB0aGVtLlxuICovXG5sZXQgbGF0ZXN0SWQgPSAwO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIENsckNoZWNrYm94IHdpbGwgYmUgcmVuYW1lZCB0byBDbHJDaGVja2JveERlcHJlY2F0ZWQgaW4gMC4xMiwgYW5kIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCBhIG5ld1xuICogaW1wbGVtZW50YXRpb24gaW4gMC4xMywgc28gaWYgeW91IGltcG9ydCBpdCB5b3Ugd2lsbCBuZWVkIHRvIHVwZGF0ZSB5b3VyIHJlZmVyZW5jZXMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1jaGVja2JveCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDwhLS1cbiAgICAgICAgICAgIEZJWE1FOiBXZSBhcmUgbm90IHN1YnNjcmliZWQgdG8gdGhlIGNoYW5nZSBldmVudCBidXQgdGhlIGNsaWNrIGV2ZW50IGhlcmUuXG4gICAgICAgICAgICBUaGUgcmVhc29uIGZvciB0aGF0IGlzIGJlY2F1c2UgY2hlY2tib3hlcyBiZWhhdmUgZGlmZmVyZW50bHkgb24gSUUgJiBFZGdlLlxuICAgICAgICAgICAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE5NDQ3OTM5XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFRvIGZpeCB0aGF0LCB3ZSBsaXN0ZW4gdG8gZXZlcnkgY2xpY2sgZXZlbnQgYW5kIHRoZW4gdG9nZ2xlIHRoZSBjaGVja2JveCBtYW51YWxseVxuICAgICAgICAgICAgdG8gbWFrZSBpdCBiZWhhdmUgdGhlIHNhbWUgd2F5IGFjcm9zcyB0aGUgYnJvd3NlcnMgd2Ugc3VwcG9ydC5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgVGhpcyB3b3JrcyBmb3IgY2FzZXMgd2hlbiB1c2VycyB0b2dnbGUgdGhlIGNoZWNrYm94IHVzaW5nIHRoZSBrZXlib2FyZCB0b286XG4gICAgICAgICAgICBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNzg3ODk0MC9zcGFjZWJhci10cmlnZ2VyaW5nLWNsaWNrLWV2ZW50LW9uLWNoZWNrYm94XG4gICAgICAgIC0tPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImNsckFyaWFMYWJlbGVkQnlcIlxuICAgICAgICAgICAgICAgW2lkXT1cImlkXCIgW25hbWVdPVwibmFtZVwiIFtjaGVja2VkXT1cImNoZWNrZWRcIlxuICAgICAgICAgICAgICAgW2luZGV0ZXJtaW5hdGVdPVwiaW5kZXRlcm1pbmF0ZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAoYmx1cik9XCJ0b3VjaCgpXCIgKGNsaWNrKT1cImNoZWNrSW5kZXRlcm1pbmF0ZVN0YXRlKClcIj5cbiAgICAgICAgPGxhYmVsIFthdHRyLmZvcl09XCJpZFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2xhYmVsPlxuICAgIGAsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5jaGVja2JveF0nOiAnIWlubGluZScsICdbY2xhc3MuY2hlY2tib3gtaW5saW5lXSc6ICdpbmxpbmUnLCAnW2NsYXNzLmRpc2FibGVkXSc6ICdkaXNhYmxlZCcgfSxcbiAgLypcbiAgICAgKiBUaGlzIHByb3ZpZGVyIGxldHMgdXMgZGVjbGFyZSBvdXIgY2hlY2tib3ggYXMgYSBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICAgKiB3aGljaCBhbGxvd3MgdXMgdG8gdXNlIFsobmdNb2RlbCldIGRpcmVjdGx5IG9uIG91ciBjb21wb25lbnQsXG4gICAgICogd2l0aCBhbGwgdGhlIGF1dG9tYXRpYyBmZWF0dXJlcyB3aXJpbmcgdGhhdCBjb21lIHdpdGggaXQuXG4gICAgICovXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENsckNoZWNrYm94RGVwcmVjYXRlZCksIG11bHRpOiB0cnVlIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJDaGVja2JveERlcHJlY2F0ZWQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8vIElmIG91ciBob3N0IGhhcyBhbiBJRCBhdHRyaWJ1dGUsIHdlIHVzZSB0aGlzIGluc3RlYWQgb2Ygb3VyIGluZGV4LlxuICBASW5wdXQoJ2lkJykgX2lkOiBzdHJpbmcgPSAobGF0ZXN0SWQrKykudG9TdHJpbmcoKTtcblxuICBwdWJsaWMgZ2V0IGlkKCkge1xuICAgIHJldHVybiBgY2xyLWNoZWNrYm94LSR7dGhpcy5faWR9YDtcbiAgfVxuXG4gIC8vIElmIGhvc3QgcHJvdmlkZXMgYW4gY2xyQXJpYUxhYmVsZWRCeSBpbnB1dCwgd2UgYXBwbHkgaXQgdG8gdGhlIGNoZWNrYm94XG4gIEBJbnB1dCgnY2xyQXJpYUxhYmVsZWRCeScpIHB1YmxpYyBjbHJBcmlhTGFiZWxlZEJ5OiBzdHJpbmcgPSBudWxsO1xuXG4gIC8vIElmIG91ciBob3N0IGhhcyBhIG5hbWUgYXR0cmlidXRlLCB3ZSBhcHBseSBpdCB0byB0aGUgY2hlY2tib3guXG4gIEBJbnB1dCgnbmFtZScpIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBudWxsO1xuXG4gIC8vIElmIHRoZSBob3N0IGlzIGRpc2FibGVkIHdlIGFwcGx5IGl0IHRvIHRoZSBjaGVja2JveFxuICBASW5wdXQoJ2NsckRpc2FibGVkJykgcHVibGljIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy8gU3VwcG9ydCBmb3IgaW5saW5lIGNoZWNrYm94ZXMsIGFkZHMgdGhlIG5lY2Vzc2FyeSBjbGFzcyB0byB0aGUgaG9zdFxuICBASW5wdXQoJ2NscklubGluZScpIHB1YmxpYyBpbmxpbmUgPSBmYWxzZTtcblxuICBwcml2YXRlIF9jaGVja2VkID0gZmFsc2U7XG5cbiAgcHVibGljIGdldCBjaGVja2VkKCkge1xuICAgIHJldHVybiB0aGlzLl9jaGVja2VkO1xuICB9XG5cbiAgQElucHV0KCdjbHJDaGVja2VkJylcbiAgcHVibGljIHNldCBjaGVja2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9jaGVja2VkKSB7XG4gICAgICBpZiAodGhpcy5faW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICB0aGlzLnNldEluZGV0ZXJtaW5hdGUoZmFsc2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRDaGVja2VkKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbmRldGVybWluYXRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHVibGljIGdldCBpbmRldGVybWluYXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9pbmRldGVybWluYXRlO1xuICB9XG5cbiAgQElucHV0KCdjbHJJbmRldGVybWluYXRlJylcbiAgcHVibGljIHNldCBpbmRldGVybWluYXRlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX2luZGV0ZXJtaW5hdGUgIT09IHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5fY2hlY2tlZCkge1xuICAgICAgICB0aGlzLnNldENoZWNrZWQoZmFsc2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRJbmRldGVybWluYXRlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJJbmRldGVybWluYXRlQ2hhbmdlJylcbiAgcHVibGljIGluZGV0ZXJtaW5hdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIHByaXZhdGUgc2V0SW5kZXRlcm1pbmF0ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2luZGV0ZXJtaW5hdGUgPSB2YWx1ZTtcbiAgICB0aGlzLmluZGV0ZXJtaW5hdGVDaGFuZ2UuZW1pdCh0aGlzLl9pbmRldGVybWluYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2hlY2tlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2NoZWNrZWQgPSB2YWx1ZTtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuX2NoZWNrZWQpO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyQ2hlY2tlZENoYW5nZScpIHB1YmxpYyBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBwdWJsaWMgdG9nZ2xlKCkge1xuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuY2hlY2tlZCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHZhbHVlID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5jaGVja2VkKSB7XG4gICAgICB0aGlzLmNoZWNrZWQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgICAqIFRoZXNlIGNhbGxiYWNrcyB3aWxsIGJlIGdpdmVuIHRvIHVzIHRocm91Z2ggdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZSxcbiAgICAgKiBhbmQgd2UgbmVlZCB0byBjYWxsIHRoZW0gd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCB0aGUgY2hlY2tib3guXG4gICAgICovXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjayA9IChfOiBhbnkpID0+IHt9O1xuXG4gIHJlZ2lzdGVyT25DaGFuZ2Uob25DaGFuZ2U6IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IG9uQ2hhbmdlO1xuICB9XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IHt9O1xuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKG9uVG91Y2hlZDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IG9uVG91Y2hlZDtcbiAgfVxuXG4gIHB1YmxpYyB0b3VjaCgpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gIH1cblxuICBjaGVja0luZGV0ZXJtaW5hdGVTdGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=