/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ViewContainerRef } from '@angular/core';
import { WrappedFormControl } from '../common/wrapped-control';
import { ClrCheckboxContainer } from './checkbox-container';
export class ClrCheckboxNext extends WrappedFormControl {
    // Once again, several more elegant solutions were foiled by severity 3+ bugs on Angular that have been opened
    // for 6 months to a year. So that's how we do it. Inheritance and ridiculous constructors. :-(
    /**
     * @param {?} vcr
     */
    constructor(vcr) {
        super(ClrCheckboxContainer, vcr);
    }
}
ClrCheckboxNext.decorators = [
    { type: Directive, args: [{ selector: '[clrCheckbox]' },] }
];
/** @nocollapse */
ClrCheckboxNext.ctorParameters = () => [
    { type: ViewContainerRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jaGVja2JveC9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRzVELE1BQU0sT0FBTyxlQUFnQixTQUFRLGtCQUF3Qzs7Ozs7O0lBRzNFLFlBQVksR0FBcUI7UUFDL0IsS0FBSyxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7OztZQU5GLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7Ozs7WUFOcEIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFdyYXBwZWRGb3JtQ29udHJvbCB9IGZyb20gJy4uL2NvbW1vbi93cmFwcGVkLWNvbnRyb2wnO1xuXG5pbXBvcnQgeyBDbHJDaGVja2JveENvbnRhaW5lciB9IGZyb20gJy4vY2hlY2tib3gtY29udGFpbmVyJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsckNoZWNrYm94XScgfSlcbmV4cG9ydCBjbGFzcyBDbHJDaGVja2JveE5leHQgZXh0ZW5kcyBXcmFwcGVkRm9ybUNvbnRyb2w8Q2xyQ2hlY2tib3hDb250YWluZXI+IHtcbiAgLy8gT25jZSBhZ2Fpbiwgc2V2ZXJhbCBtb3JlIGVsZWdhbnQgc29sdXRpb25zIHdlcmUgZm9pbGVkIGJ5IHNldmVyaXR5IDMrIGJ1Z3Mgb24gQW5ndWxhciB0aGF0IGhhdmUgYmVlbiBvcGVuZWRcbiAgLy8gZm9yIDYgbW9udGhzIHRvIGEgeWVhci4gU28gdGhhdCdzIGhvdyB3ZSBkbyBpdC4gSW5oZXJpdGFuY2UgYW5kIHJpZGljdWxvdXMgY29uc3RydWN0b3JzLiA6LShcbiAgY29uc3RydWN0b3IodmNyOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgc3VwZXIoQ2xyQ2hlY2tib3hDb250YWluZXIsIHZjcik7XG4gIH1cbn1cbiJdfQ==