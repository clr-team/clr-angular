/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export class MarkControlService {
    constructor() {
        this._touched = new Subject();
    }
    /**
     * @return {?}
     */
    get touchedChange() {
        return this._touched.asObservable();
    }
    /**
     * @return {?}
     */
    markAsTouched() {
        this._touched.next();
    }
}
MarkControlService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    MarkControlService.prototype._touched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyay1jb250cm9sLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vcHJvdmlkZXJzL21hcmstY29udHJvbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUczQyxNQUFNLE9BQU8sa0JBQWtCO0lBRC9CO1FBRVUsYUFBUSxHQUFrQixJQUFJLE9BQU8sRUFBRSxDQUFDO0lBU2xELENBQUM7Ozs7SUFQQyxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7OztZQVZGLFVBQVU7Ozs7Ozs7SUFFVCxzQ0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcmtDb250cm9sU2VydmljZSB7XG4gIHByaXZhdGUgX3RvdWNoZWQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIGdldCB0b3VjaGVkQ2hhbmdlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl90b3VjaGVkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgbWFya0FzVG91Y2hlZCgpIHtcbiAgICB0aGlzLl90b3VjaGVkLm5leHQoKTtcbiAgfVxufVxuIl19