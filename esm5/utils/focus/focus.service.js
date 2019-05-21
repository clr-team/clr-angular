/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, Optional, Renderer2, SkipSelf } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { ArrowKeyDirection } from './arrow-key-direction.enum';
var FocusService = /** @class */ (function () {
    function FocusService(renderer) {
        this.renderer = renderer;
    }
    Object.defineProperty(FocusService.prototype, "current", {
        get: /**
         * @return {?}
         */
        function () {
            return this._current;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} first
     * @return {?}
     */
    FocusService.prototype.reset = /**
     * @param {?} first
     * @return {?}
     */
    function (first) {
        this._current = first;
    };
    /**
     * @param {?} el
     * @return {?}
     */
    FocusService.prototype.listenToArrowKeys = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        var _this = this;
        // The following listeners return false when there was an action to take for the key pressed,
        // in order to prevent the default behavior of that key.
        this.renderer.listen(el, 'keydown.arrowup', (/**
         * @return {?}
         */
        function () { return !_this.move(ArrowKeyDirection.UP); }));
        this.renderer.listen(el, 'keydown.arrowdown', (/**
         * @return {?}
         */
        function () { return !_this.move(ArrowKeyDirection.DOWN); }));
        this.renderer.listen(el, 'keydown.arrowleft', (/**
         * @return {?}
         */
        function () { return !_this.move(ArrowKeyDirection.LEFT); }));
        this.renderer.listen(el, 'keydown.arrowright', (/**
         * @return {?}
         */
        function () { return !_this.move(ArrowKeyDirection.RIGHT); }));
    };
    /**
     * @param {?} el
     * @return {?}
     */
    FocusService.prototype.registerContainer = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        var _this = this;
        this.container = el;
        this.renderer.setAttribute(el, 'tabindex', '0');
        this.listenToArrowKeys(el);
        // The following listeners return false when there was an action to take for the key pressed,
        // in order to prevent the default behavior of that key.
        this.renderer.listen(el, 'keydown.space', (/**
         * @return {?}
         */
        function () { return !_this.activateCurrent(); }));
        this.renderer.listen(el, 'keydown.enter', (/**
         * @return {?}
         */
        function () { return !_this.activateCurrent(); }));
    };
    /**
     * @param {?} item
     * @return {?}
     */
    FocusService.prototype.moveTo = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.renderer.setAttribute(this.container, 'aria-activedescendant', item.id);
        if (this.current) {
            this.current.blur();
        }
        item.focus();
        this._current = item;
    };
    /**
     * The second parameter, optional, is here to allow recursion to skip disabled items.
     */
    /**
     * The second parameter, optional, is here to allow recursion to skip disabled items.
     * @param {?} direction
     * @param {?=} current
     * @return {?}
     */
    FocusService.prototype.move = /**
     * The second parameter, optional, is here to allow recursion to skip disabled items.
     * @param {?} direction
     * @param {?=} current
     * @return {?}
     */
    function (direction, current) {
        var _this = this;
        if (current === void 0) { current = this.current; }
        /** @type {?} */
        var next = current[direction];
        if (next) {
            // Turning the value into an Observable isn't great, but it's the fastest way to avoid code duplication.
            // If performance ever matters for this, we can refactor using additional private methods.
            /** @type {?} */
            var nextObs = isObservable(next) ? next : of(next);
            nextObs.subscribe((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (item.disabled) {
                    return _this.move(direction, item);
                }
                else {
                    _this.moveTo(item);
                    return true;
                }
            }));
        }
        return false;
    };
    /**
     * @return {?}
     */
    FocusService.prototype.activateCurrent = /**
     * @return {?}
     */
    function () {
        if (this.current && this.current.activate) {
            this.current.activate();
            return true;
        }
        return false;
    };
    FocusService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FocusService.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    return FocusService;
}());
export { FocusService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FocusService.prototype.container;
    /**
     * @type {?}
     * @private
     */
    FocusService.prototype._current;
    /**
     * @type {?}
     * @private
     */
    FocusService.prototype.renderer;
}
/**
 * @param {?} existing
 * @param {?} renderer
 * @return {?}
 */
export function clrFocusServiceFactory(existing, renderer) {
    return existing || new FocusService(renderer);
}
/** @type {?} */
export var FOCUS_SERVICE_PROVIDER = {
    provide: FocusService,
    useFactory: clrFocusServiceFactory,
    deps: [[new Optional(), new SkipSelf(), FocusService], Renderer2],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2ZvY3VzL2ZvY3VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV4QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUcvRDtJQUVFLHNCQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO0lBQUcsQ0FBQztJQUszQyxzQkFBVyxpQ0FBTzs7OztRQUFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDOzs7T0FBQTs7Ozs7SUFFRCw0QkFBSzs7OztJQUFMLFVBQU0sS0FBb0I7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCx3Q0FBaUI7Ozs7SUFBakIsVUFBa0IsRUFBZTtRQUFqQyxpQkFPQztRQU5DLDZGQUE2RjtRQUM3Rix3REFBd0Q7UUFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGlCQUFpQjs7O1FBQUUsY0FBTSxPQUFBLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsRUFBaEMsQ0FBZ0MsRUFBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxtQkFBbUI7OztRQUFFLGNBQU0sT0FBQSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQWxDLENBQWtDLEVBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsUUFB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QixpQ0FBK0I7Ozs7O0lBRS9CLGdDQUFnQzs7Ozs7SUFKcEIsZ0NBQTJCOzs7Ozs7O0FBdUV6QyxNQUFNLFVBQVUsc0JBQXNCLENBQUMsUUFBc0IsRUFBRSxRQUFtQjtJQUNoRixPQUFPLFFBQVEsSUFBSSxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxDQUFDOztBQUVELE1BQU0sS0FBTyxzQkFBc0IsR0FBRztJQUNwQyxPQUFPLEVBQUUsWUFBWTtJQUNyQixVQUFVLEVBQUUsc0JBQXNCO0lBQ2xDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFFLFNBQVMsQ0FBQztDQUNsRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFJlbmRlcmVyMiwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQXJyb3dLZXlEaXJlY3Rpb24gfSBmcm9tICcuL2Fycm93LWtleS1kaXJlY3Rpb24uZW51bSc7XG5pbXBvcnQgeyBGb2N1c2FibGVJdGVtIH0gZnJvbSAnLi9mb2N1c2FibGUtaXRlbS9mb2N1c2FibGUtaXRlbSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb2N1c1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgcHJpdmF0ZSBjb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gIHByaXZhdGUgX2N1cnJlbnQ6IEZvY3VzYWJsZUl0ZW07XG4gIHB1YmxpYyBnZXQgY3VycmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgfVxuXG4gIHJlc2V0KGZpcnN0OiBGb2N1c2FibGVJdGVtKSB7XG4gICAgdGhpcy5fY3VycmVudCA9IGZpcnN0O1xuICB9XG5cbiAgbGlzdGVuVG9BcnJvd0tleXMoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgLy8gVGhlIGZvbGxvd2luZyBsaXN0ZW5lcnMgcmV0dXJuIGZhbHNlIHdoZW4gdGhlcmUgd2FzIGFuIGFjdGlvbiB0byB0YWtlIGZvciB0aGUga2V5IHByZXNzZWQsXG4gICAgLy8gaW4gb3JkZXIgdG8gcHJldmVudCB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGF0IGtleS5cbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uYXJyb3d1cCcsICgpID0+ICF0aGlzLm1vdmUoQXJyb3dLZXlEaXJlY3Rpb24uVVApKTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uYXJyb3dkb3duJywgKCkgPT4gIXRoaXMubW92ZShBcnJvd0tleURpcmVjdGlvbi5ET1dOKSk7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdrZXlkb3duLmFycm93bGVmdCcsICgpID0+ICF0aGlzLm1vdmUoQXJyb3dLZXlEaXJlY3Rpb24uTEVGVCkpO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAna2V5ZG93bi5hcnJvd3JpZ2h0JywgKCkgPT4gIXRoaXMubW92ZShBcnJvd0tleURpcmVjdGlvbi5SSUdIVCkpO1xuICB9XG5cbiAgcmVnaXN0ZXJDb250YWluZXIoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBlbDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbCwgJ3RhYmluZGV4JywgJzAnKTtcbiAgICB0aGlzLmxpc3RlblRvQXJyb3dLZXlzKGVsKTtcbiAgICAvLyBUaGUgZm9sbG93aW5nIGxpc3RlbmVycyByZXR1cm4gZmFsc2Ugd2hlbiB0aGVyZSB3YXMgYW4gYWN0aW9uIHRvIHRha2UgZm9yIHRoZSBrZXkgcHJlc3NlZCxcbiAgICAvLyBpbiBvcmRlciB0byBwcmV2ZW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIHRoYXQga2V5LlxuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAna2V5ZG93bi5zcGFjZScsICgpID0+ICF0aGlzLmFjdGl2YXRlQ3VycmVudCgpKTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uZW50ZXInLCAoKSA9PiAhdGhpcy5hY3RpdmF0ZUN1cnJlbnQoKSk7XG4gIH1cblxuICBtb3ZlVG8oaXRlbTogRm9jdXNhYmxlSXRlbSkge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuY29udGFpbmVyLCAnYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgaXRlbS5pZCk7XG4gICAgaWYgKHRoaXMuY3VycmVudCkge1xuICAgICAgdGhpcy5jdXJyZW50LmJsdXIoKTtcbiAgICB9XG4gICAgaXRlbS5mb2N1cygpO1xuICAgIHRoaXMuX2N1cnJlbnQgPSBpdGVtO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBzZWNvbmQgcGFyYW1ldGVyLCBvcHRpb25hbCwgaXMgaGVyZSB0byBhbGxvdyByZWN1cnNpb24gdG8gc2tpcCBkaXNhYmxlZCBpdGVtcy5cbiAgICovXG4gIG1vdmUoZGlyZWN0aW9uOiBBcnJvd0tleURpcmVjdGlvbiwgY3VycmVudCA9IHRoaXMuY3VycmVudCkge1xuICAgIGNvbnN0IG5leHQgPSBjdXJyZW50W2RpcmVjdGlvbl07XG4gICAgaWYgKG5leHQpIHtcbiAgICAgIC8vIFR1cm5pbmcgdGhlIHZhbHVlIGludG8gYW4gT2JzZXJ2YWJsZSBpc24ndCBncmVhdCwgYnV0IGl0J3MgdGhlIGZhc3Rlc3Qgd2F5IHRvIGF2b2lkIGNvZGUgZHVwbGljYXRpb24uXG4gICAgICAvLyBJZiBwZXJmb3JtYW5jZSBldmVyIG1hdHRlcnMgZm9yIHRoaXMsIHdlIGNhbiByZWZhY3RvciB1c2luZyBhZGRpdGlvbmFsIHByaXZhdGUgbWV0aG9kcy5cbiAgICAgIGNvbnN0IG5leHRPYnMgPSBpc09ic2VydmFibGUobmV4dCkgPyBuZXh0IDogb2YobmV4dCk7XG4gICAgICBuZXh0T2JzLnN1YnNjcmliZShpdGVtID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5tb3ZlKGRpcmVjdGlvbiwgaXRlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tb3ZlVG8oaXRlbSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhY3RpdmF0ZUN1cnJlbnQoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCAmJiB0aGlzLmN1cnJlbnQuYWN0aXZhdGUpIHtcbiAgICAgIHRoaXMuY3VycmVudC5hY3RpdmF0ZSgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xyRm9jdXNTZXJ2aWNlRmFjdG9yeShleGlzdGluZzogRm9jdXNTZXJ2aWNlLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gIHJldHVybiBleGlzdGluZyB8fCBuZXcgRm9jdXNTZXJ2aWNlKHJlbmRlcmVyKTtcbn1cblxuZXhwb3J0IGNvbnN0IEZPQ1VTX1NFUlZJQ0VfUFJPVklERVIgPSB7XG4gIHByb3ZpZGU6IEZvY3VzU2VydmljZSxcbiAgdXNlRmFjdG9yeTogY2xyRm9jdXNTZXJ2aWNlRmFjdG9yeSxcbiAgZGVwczogW1tuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCksIEZvY3VzU2VydmljZV0sIFJlbmRlcmVyMl0sXG59O1xuIl19