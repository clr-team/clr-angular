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
export class ButtonHubService {
    constructor() {
        this.buttonsReady = false;
        this._previousBtnClicked = new Subject();
        this._nextBtnClicked = new Subject();
        this._dangerBtnClicked = new Subject();
        this._cancelBtnClicked = new Subject();
        this._finishBtnClicked = new Subject();
        this._customBtnClicked = new Subject();
    }
    /**
     * @return {?}
     */
    get previousBtnClicked() {
        return this._previousBtnClicked.asObservable();
    }
    /**
     * @return {?}
     */
    get nextBtnClicked() {
        return this._nextBtnClicked.asObservable();
    }
    /**
     * @return {?}
     */
    get dangerBtnClicked() {
        return this._dangerBtnClicked.asObservable();
    }
    /**
     * @return {?}
     */
    get cancelBtnClicked() {
        return this._cancelBtnClicked.asObservable();
    }
    /**
     * @return {?}
     */
    get finishBtnClicked() {
        return this._finishBtnClicked.asObservable();
    }
    /**
     * @return {?}
     */
    get customBtnClicked() {
        return this._customBtnClicked.asObservable();
    }
    /**
     * @param {?} buttonType
     * @return {?}
     */
    buttonClicked(buttonType) {
        if ('previous' === buttonType) {
            this._previousBtnClicked.next();
        }
        else if ('next' === buttonType) {
            this._nextBtnClicked.next();
        }
        else if ('finish' === buttonType) {
            this._finishBtnClicked.next();
        }
        else if ('danger' === buttonType) {
            this._dangerBtnClicked.next();
        }
        else if ('cancel' === buttonType) {
            this._cancelBtnClicked.next();
        }
        else {
            this._customBtnClicked.next(buttonType);
        }
    }
}
ButtonHubService.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    ButtonHubService.prototype.buttonsReady;
    /**
     * @type {?}
     * @private
     */
    ButtonHubService.prototype._previousBtnClicked;
    /**
     * @type {?}
     * @private
     */
    ButtonHubService.prototype._nextBtnClicked;
    /**
     * @type {?}
     * @private
     */
    ButtonHubService.prototype._dangerBtnClicked;
    /**
     * @type {?}
     * @private
     */
    ButtonHubService.prototype._cancelBtnClicked;
    /**
     * @type {?}
     * @private
     */
    ButtonHubService.prototype._finishBtnClicked;
    /**
     * @type {?}
     * @private
     */
    ButtonHubService.prototype._customBtnClicked;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWh1Yi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsid2l6YXJkL3Byb3ZpZGVycy9idXR0b24taHViLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRy9CLE1BQU0sT0FBTyxnQkFBZ0I7SUFEN0I7UUFFUyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUU3Qix3QkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBS3pDLG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUtyQyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBS3ZDLHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFLdkMsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUt2QyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO0lBb0JqRCxDQUFDOzs7O0lBNUNDLElBQVcsa0JBQWtCO1FBQzNCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2pELENBQUM7Ozs7SUFHRCxJQUFXLGNBQWM7UUFDdkIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzdDLENBQUM7Ozs7SUFHRCxJQUFXLGdCQUFnQjtRQUN6QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMvQyxDQUFDOzs7O0lBR0QsSUFBVyxnQkFBZ0I7UUFDekIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDL0MsQ0FBQzs7OztJQUdELElBQVcsZ0JBQWdCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQy9DLENBQUM7Ozs7SUFHRCxJQUFXLGdCQUFnQjtRQUN6QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMvQyxDQUFDOzs7OztJQUVNLGFBQWEsQ0FBQyxVQUFrQjtRQUNyQyxJQUFJLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2pDO2FBQU0sSUFBSSxNQUFNLEtBQUssVUFBVSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDN0I7YUFBTSxJQUFJLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1NBQy9CO2FBQU0sSUFBSSxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMvQjthQUFNLElBQUksUUFBUSxLQUFLLFVBQVUsRUFBRTtZQUNsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDL0I7YUFBTTtZQUNMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDOzs7WUFoREYsVUFBVTs7OztJQUVULHdDQUFxQzs7Ozs7SUFFckMsK0NBQWlEOzs7OztJQUtqRCwyQ0FBNkM7Ozs7O0lBSzdDLDZDQUErQzs7Ozs7SUFLL0MsNkNBQStDOzs7OztJQUsvQyw2Q0FBK0M7Ozs7O0lBSy9DLDZDQUErQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQnV0dG9uSHViU2VydmljZSB7XG4gIHB1YmxpYyBidXR0b25zUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF9wcmV2aW91c0J0bkNsaWNrZWQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyBnZXQgcHJldmlvdXNCdG5DbGlja2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZXZpb3VzQnRuQ2xpY2tlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX25leHRCdG5DbGlja2VkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwdWJsaWMgZ2V0IG5leHRCdG5DbGlja2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX25leHRCdG5DbGlja2VkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGFuZ2VyQnRuQ2xpY2tlZCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHVibGljIGdldCBkYW5nZXJCdG5DbGlja2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhbmdlckJ0bkNsaWNrZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIF9jYW5jZWxCdG5DbGlja2VkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwdWJsaWMgZ2V0IGNhbmNlbEJ0bkNsaWNrZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fY2FuY2VsQnRuQ2xpY2tlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmlzaEJ0bkNsaWNrZWQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyBnZXQgZmluaXNoQnRuQ2xpY2tlZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9maW5pc2hCdG5DbGlja2VkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VzdG9tQnRuQ2xpY2tlZCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHVibGljIGdldCBjdXN0b21CdG5DbGlja2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1c3RvbUJ0bkNsaWNrZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgYnV0dG9uQ2xpY2tlZChidXR0b25UeXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoJ3ByZXZpb3VzJyA9PT0gYnV0dG9uVHlwZSkge1xuICAgICAgdGhpcy5fcHJldmlvdXNCdG5DbGlja2VkLm5leHQoKTtcbiAgICB9IGVsc2UgaWYgKCduZXh0JyA9PT0gYnV0dG9uVHlwZSkge1xuICAgICAgdGhpcy5fbmV4dEJ0bkNsaWNrZWQubmV4dCgpO1xuICAgIH0gZWxzZSBpZiAoJ2ZpbmlzaCcgPT09IGJ1dHRvblR5cGUpIHtcbiAgICAgIHRoaXMuX2ZpbmlzaEJ0bkNsaWNrZWQubmV4dCgpO1xuICAgIH0gZWxzZSBpZiAoJ2RhbmdlcicgPT09IGJ1dHRvblR5cGUpIHtcbiAgICAgIHRoaXMuX2RhbmdlckJ0bkNsaWNrZWQubmV4dCgpO1xuICAgIH0gZWxzZSBpZiAoJ2NhbmNlbCcgPT09IGJ1dHRvblR5cGUpIHtcbiAgICAgIHRoaXMuX2NhbmNlbEJ0bkNsaWNrZWQubmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jdXN0b21CdG5DbGlja2VkLm5leHQoYnV0dG9uVHlwZSk7XG4gICAgfVxuICB9XG59XG4iXX0=