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
    (observer) => {
        onSubscribe(observer);
        /** @type {?} */
        const subscription = observable.subscribe(observer);
        return (/**
         * @return {?}
         */
        () => {
            subscription.unsubscribe();
            if (onUnsubscribe) {
                onUnsubscribe(observer);
            }
        });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcC1vYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZm9jdXMvd3JhcC1vYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7Ozs7Ozs7O0FBRTVDLE1BQU0sVUFBVSxjQUFjLENBQzVCLFVBQXlCLEVBQ3pCLFdBQTZDLEVBQzdDLGFBQStDO0lBRS9DLE9BQU8sVUFBVSxDQUFDLE1BQU07Ozs7SUFBQyxDQUFDLFFBQXFCLEVBQUUsRUFBRTtRQUNqRCxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7O2NBQ2hCLFlBQVksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUNuRDs7O1FBQU8sR0FBRyxFQUFFO1lBQ1YsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzNCLElBQUksYUFBYSxFQUFFO2dCQUNqQixhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDekI7UUFDSCxDQUFDLEVBQUM7SUFDSixDQUFDLEVBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwT2JzZXJ2YWJsZTxUPihcbiAgb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxUPixcbiAgb25TdWJzY3JpYmU/OiAob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB2b2lkLFxuICBvblVuc3Vic2NyaWJlPzogKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4gdm9pZFxuKTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XG4gICAgb25TdWJzY3JpYmUob2JzZXJ2ZXIpO1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IG9ic2VydmFibGUuc3Vic2NyaWJlKG9ic2VydmVyKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICBpZiAob25VbnN1YnNjcmliZSkge1xuICAgICAgICBvblVuc3Vic2NyaWJlKG9ic2VydmVyKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn1cbiJdfQ==