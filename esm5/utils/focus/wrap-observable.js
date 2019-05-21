/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Observable } from 'rxjs';
/**
 * @template T
 * @param {?} observable
 * @param {?=} onSubscribe
 * @param {?=} onUnsubscribe
 * @return {?}
 */
export function wrapObservable(observable, onSubscribe, onUnsubscribe) {
    return Observable.create((/**
     * @param {?} observer
     * @return {?}
     */
    function (observer) {
        onSubscribe(observer);
        /** @type {?} */
        var subscription = observable.subscribe(observer);
        return (/**
         * @return {?}
         */
        function () {
            subscription.unsubscribe();
            if (onUnsubscribe) {
                onUnsubscribe(observer);
            }
        });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcC1vYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZm9jdXMvd3JhcC1vYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7Ozs7Ozs7O0FBRTVDLE1BQU0sVUFBVSxjQUFjLENBQzVCLFVBQXlCLEVBQ3pCLFdBQTZDLEVBQzdDLGFBQStDO0lBRS9DLE9BQU8sVUFBVSxDQUFDLE1BQU07Ozs7SUFBQyxVQUFDLFFBQXFCO1FBQzdDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7WUFDaEIsWUFBWSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ25EOzs7UUFBTztZQUNMLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMzQixJQUFJLGFBQWEsRUFBRTtnQkFDakIsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxFQUFDO0lBQ0osQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgZnVuY3Rpb24gd3JhcE9ic2VydmFibGU8VD4oXG4gIG9ic2VydmFibGU6IE9ic2VydmFibGU8VD4sXG4gIG9uU3Vic2NyaWJlPzogKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4gdm9pZCxcbiAgb25VbnN1YnNjcmliZT86IChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHZvaWRcbik6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xuICAgIG9uU3Vic2NyaWJlKG9ic2VydmVyKTtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBvYnNlcnZhYmxlLnN1YnNjcmliZShvYnNlcnZlcik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgaWYgKG9uVW5zdWJzY3JpYmUpIHtcbiAgICAgICAgb25VbnN1YnNjcmliZShvYnNlcnZlcik7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG4iXX0=