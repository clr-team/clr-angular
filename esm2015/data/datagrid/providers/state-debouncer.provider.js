/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/*
 * This provider implements some form of synchronous debouncing through a lock pattern
 * to avoid emitting multiple state changes for a single user action.
 */
export class StateDebouncer {
    constructor() {
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this._change = new Subject();
        /*
             * This is the lock, to only emit once all the changes have finished processing
             */
        this.nbChanges = 0;
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * @return {?}
     */
    changeStart() {
        this.nbChanges++;
    }
    /**
     * @return {?}
     */
    changeDone() {
        if (--this.nbChanges === 0) {
            this._change.next();
        }
    }
}
StateDebouncer.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * The Observable that lets other classes subscribe to global state changes
     * @type {?}
     * @private
     */
    StateDebouncer.prototype._change;
    /**
     * @type {?}
     * @private
     */
    StateDebouncer.prototype.nbChanges;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtZGVib3VuY2VyLnByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvc3RhdGUtZGVib3VuY2VyLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFPL0IsTUFBTSxPQUFPLGNBQWM7SUFEM0I7Ozs7UUFLVSxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQzs7OztRQVM5QixjQUFTLEdBQUcsQ0FBQyxDQUFDO0lBV3hCLENBQUM7Ozs7O0lBbEJDLElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDOzs7O0lBT00sV0FBVztRQUNoQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7OztJQUVNLFVBQVU7UUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsS0FBSyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7OztZQXhCRixVQUFVOzs7Ozs7OztJQUtULGlDQUFzQzs7Ozs7SUFTdEMsbUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbi8qXG4gKiBUaGlzIHByb3ZpZGVyIGltcGxlbWVudHMgc29tZSBmb3JtIG9mIHN5bmNocm9ub3VzIGRlYm91bmNpbmcgdGhyb3VnaCBhIGxvY2sgcGF0dGVyblxuICogdG8gYXZvaWQgZW1pdHRpbmcgbXVsdGlwbGUgc3RhdGUgY2hhbmdlcyBmb3IgYSBzaW5nbGUgdXNlciBhY3Rpb24uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdGF0ZURlYm91bmNlciB7XG4gIC8qKlxuICAgKiBUaGUgT2JzZXJ2YWJsZSB0aGF0IGxldHMgb3RoZXIgY2xhc3NlcyBzdWJzY3JpYmUgdG8gZ2xvYmFsIHN0YXRlIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIC8vIFdlIGRvIG5vdCB3YW50IHRvIGV4cG9zZSB0aGUgU3ViamVjdCBpdHNlbGYsIGJ1dCB0aGUgT2JzZXJ2YWJsZSB3aGljaCBpcyByZWFkLW9ubHlcbiAgcHVibGljIGdldCBjaGFuZ2UoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qXG4gICAgICogVGhpcyBpcyB0aGUgbG9jaywgdG8gb25seSBlbWl0IG9uY2UgYWxsIHRoZSBjaGFuZ2VzIGhhdmUgZmluaXNoZWQgcHJvY2Vzc2luZ1xuICAgICAqL1xuICBwcml2YXRlIG5iQ2hhbmdlcyA9IDA7XG5cbiAgcHVibGljIGNoYW5nZVN0YXJ0KCkge1xuICAgIHRoaXMubmJDaGFuZ2VzKys7XG4gIH1cblxuICBwdWJsaWMgY2hhbmdlRG9uZSgpIHtcbiAgICBpZiAoLS10aGlzLm5iQ2hhbmdlcyA9PT0gMCkge1xuICAgICAgdGhpcy5fY2hhbmdlLm5leHQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==