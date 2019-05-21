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
export class FocusService {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    get current() {
        return this._current;
    }
    /**
     * @param {?} first
     * @return {?}
     */
    reset(first) {
        this._current = first;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    listenToArrowKeys(el) {
        // The following listeners return false when there was an action to take for the key pressed,
        // in order to prevent the default behavior of that key.
        this.renderer.listen(el, 'keydown.arrowup', (/**
         * @return {?}
         */
        () => !this.move(ArrowKeyDirection.UP)));
        this.renderer.listen(el, 'keydown.arrowdown', (/**
         * @return {?}
         */
        () => !this.move(ArrowKeyDirection.DOWN)));
        this.renderer.listen(el, 'keydown.arrowleft', (/**
         * @return {?}
         */
        () => !this.move(ArrowKeyDirection.LEFT)));
        this.renderer.listen(el, 'keydown.arrowright', (/**
         * @return {?}
         */
        () => !this.move(ArrowKeyDirection.RIGHT)));
    }
    /**
     * @param {?} el
     * @return {?}
     */
    registerContainer(el) {
        this.container = el;
        this.renderer.setAttribute(el, 'tabindex', '0');
        this.listenToArrowKeys(el);
        // The following listeners return false when there was an action to take for the key pressed,
        // in order to prevent the default behavior of that key.
        this.renderer.listen(el, 'keydown.space', (/**
         * @return {?}
         */
        () => !this.activateCurrent()));
        this.renderer.listen(el, 'keydown.enter', (/**
         * @return {?}
         */
        () => !this.activateCurrent()));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    moveTo(item) {
        this.renderer.setAttribute(this.container, 'aria-activedescendant', item.id);
        if (this.current) {
            this.current.blur();
        }
        item.focus();
        this._current = item;
    }
    /**
     * The second parameter, optional, is here to allow recursion to skip disabled items.
     * @param {?} direction
     * @param {?=} current
     * @return {?}
     */
    move(direction, current = this.current) {
        /** @type {?} */
        const next = current[direction];
        if (next) {
            // Turning the value into an Observable isn't great, but it's the fastest way to avoid code duplication.
            // If performance ever matters for this, we can refactor using additional private methods.
            /** @type {?} */
            const nextObs = isObservable(next) ? next : of(next);
            nextObs.subscribe((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                if (item.disabled) {
                    return this.move(direction, item);
                }
                else {
                    this.moveTo(item);
                    return true;
                }
            }));
        }
        return false;
    }
    /**
     * @return {?}
     */
    activateCurrent() {
        if (this.current && this.current.activate) {
            this.current.activate();
            return true;
        }
        return false;
    }
}
FocusService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FocusService.ctorParameters = () => [
    { type: Renderer2 }
];
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
export const FOCUS_SERVICE_PROVIDER = {
    provide: FocusService,
    useFactory: clrFocusServiceFactory,
    deps: [[new Optional(), new SkipSelf(), FocusService], Renderer2],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2ZvY3VzL2ZvY3VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV4QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUkvRCxNQUFNLE9BQU8sWUFBWTs7OztJQUN2QixZQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO0lBQUcsQ0FBQzs7OztJQUszQyxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRUQsS0FBSyxDQUFDLEtBQW9CO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRUQsaUJBQWlCLENBQUMsRUFBZTtRQUMvQiw2RkFBNkY7UUFDN0Ysd0RBQXdEO1FBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxpQkFBaUI7OztRQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxtQkFBbUI7OztRQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxtQkFBbUI7OztRQUFF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QUFFLFlBQVk7SUFDckIsVUFBVSxFQUFFLHNCQUFzQjtJQUNsQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBRSxTQUFTLENBQUM7Q0FDbEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBSZW5kZXJlcjIsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc09ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFycm93S2V5RGlyZWN0aW9uIH0gZnJvbSAnLi9hcnJvdy1rZXktZGlyZWN0aW9uLmVudW0nO1xuaW1wb3J0IHsgRm9jdXNhYmxlSXRlbSB9IGZyb20gJy4vZm9jdXNhYmxlLWl0ZW0vZm9jdXNhYmxlLWl0ZW0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9jdXNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcblxuICBwcml2YXRlIF9jdXJyZW50OiBGb2N1c2FibGVJdGVtO1xuICBwdWJsaWMgZ2V0IGN1cnJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gIH1cblxuICByZXNldChmaXJzdDogRm9jdXNhYmxlSXRlbSkge1xuICAgIHRoaXMuX2N1cnJlbnQgPSBmaXJzdDtcbiAgfVxuXG4gIGxpc3RlblRvQXJyb3dLZXlzKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIC8vIFRoZSBmb2xsb3dpbmcgbGlzdGVuZXJzIHJldHVybiBmYWxzZSB3aGVuIHRoZXJlIHdhcyBhbiBhY3Rpb24gdG8gdGFrZSBmb3IgdGhlIGtleSBwcmVzc2VkLFxuICAgIC8vIGluIG9yZGVyIHRvIHByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2YgdGhhdCBrZXkuXG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdrZXlkb3duLmFycm93dXAnLCAoKSA9PiAhdGhpcy5tb3ZlKEFycm93S2V5RGlyZWN0aW9uLlVQKSk7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdrZXlkb3duLmFycm93ZG93bicsICgpID0+ICF0aGlzLm1vdmUoQXJyb3dLZXlEaXJlY3Rpb24uRE9XTikpO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAna2V5ZG93bi5hcnJvd2xlZnQnLCAoKSA9PiAhdGhpcy5tb3ZlKEFycm93S2V5RGlyZWN0aW9uLkxFRlQpKTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uYXJyb3dyaWdodCcsICgpID0+ICF0aGlzLm1vdmUoQXJyb3dLZXlEaXJlY3Rpb24uUklHSFQpKTtcbiAgfVxuXG4gIHJlZ2lzdGVyQ29udGFpbmVyKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gZWw7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWwsICd0YWJpbmRleCcsICcwJyk7XG4gICAgdGhpcy5saXN0ZW5Ub0Fycm93S2V5cyhlbCk7XG4gICAgLy8gVGhlIGZvbGxvd2luZyBsaXN0ZW5lcnMgcmV0dXJuIGZhbHNlIHdoZW4gdGhlcmUgd2FzIGFuIGFjdGlvbiB0byB0YWtlIGZvciB0aGUga2V5IHByZXNzZWQsXG4gICAgLy8gaW4gb3JkZXIgdG8gcHJldmVudCB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGF0IGtleS5cbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uc3BhY2UnLCAoKSA9PiAhdGhpcy5hY3RpdmF0ZUN1cnJlbnQoKSk7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdrZXlkb3duLmVudGVyJywgKCkgPT4gIXRoaXMuYWN0aXZhdGVDdXJyZW50KCkpO1xuICB9XG5cbiAgbW92ZVRvKGl0ZW06IEZvY3VzYWJsZUl0ZW0pIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmNvbnRhaW5lciwgJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsIGl0ZW0uaWQpO1xuICAgIGlmICh0aGlzLmN1cnJlbnQpIHtcbiAgICAgIHRoaXMuY3VycmVudC5ibHVyKCk7XG4gICAgfVxuICAgIGl0ZW0uZm9jdXMoKTtcbiAgICB0aGlzLl9jdXJyZW50ID0gaXRlbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgc2Vjb25kIHBhcmFtZXRlciwgb3B0aW9uYWwsIGlzIGhlcmUgdG8gYWxsb3cgcmVjdXJzaW9uIHRvIHNraXAgZGlzYWJsZWQgaXRlbXMuXG4gICAqL1xuICBtb3ZlKGRpcmVjdGlvbjogQXJyb3dLZXlEaXJlY3Rpb24sIGN1cnJlbnQgPSB0aGlzLmN1cnJlbnQpIHtcbiAgICBjb25zdCBuZXh0ID0gY3VycmVudFtkaXJlY3Rpb25dO1xuICAgIGlmIChuZXh0KSB7XG4gICAgICAvLyBUdXJuaW5nIHRoZSB2YWx1ZSBpbnRvIGFuIE9ic2VydmFibGUgaXNuJ3QgZ3JlYXQsIGJ1dCBpdCdzIHRoZSBmYXN0ZXN0IHdheSB0byBhdm9pZCBjb2RlIGR1cGxpY2F0aW9uLlxuICAgICAgLy8gSWYgcGVyZm9ybWFuY2UgZXZlciBtYXR0ZXJzIGZvciB0aGlzLCB3ZSBjYW4gcmVmYWN0b3IgdXNpbmcgYWRkaXRpb25hbCBwcml2YXRlIG1ldGhvZHMuXG4gICAgICBjb25zdCBuZXh0T2JzID0gaXNPYnNlcnZhYmxlKG5leHQpID8gbmV4dCA6IG9mKG5leHQpO1xuICAgICAgbmV4dE9icy5zdWJzY3JpYmUoaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubW92ZShkaXJlY3Rpb24sIGl0ZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubW92ZVRvKGl0ZW0pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYWN0aXZhdGVDdXJyZW50KCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQgJiYgdGhpcy5jdXJyZW50LmFjdGl2YXRlKSB7XG4gICAgICB0aGlzLmN1cnJlbnQuYWN0aXZhdGUoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsckZvY3VzU2VydmljZUZhY3RvcnkoZXhpc3Rpbmc6IEZvY3VzU2VydmljZSwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICByZXR1cm4gZXhpc3RpbmcgfHwgbmV3IEZvY3VzU2VydmljZShyZW5kZXJlcik7XG59XG5cbmV4cG9ydCBjb25zdCBGT0NVU19TRVJWSUNFX1BST1ZJREVSID0ge1xuICBwcm92aWRlOiBGb2N1c1NlcnZpY2UsXG4gIHVzZUZhY3Rvcnk6IGNsckZvY3VzU2VydmljZUZhY3RvcnksXG4gIGRlcHM6IFtbbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpLCBGb2N1c1NlcnZpY2VdLCBSZW5kZXJlcjJdLFxufTtcbiJdfQ==