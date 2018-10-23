/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { ALERT_TYPES } from '../utils/alert-types';
import { ClrCommonStrings } from '../../../utils/i18n/common-strings.interface';
var AlertIconAndTypesService = /** @class */ (function () {
    function AlertIconAndTypesService(commonStrings) {
        this.commonStrings = commonStrings;
        this.defaultIconShape = 'info-circle';
        this._alertIconShape = '';
        this._alertType = 'info';
    }
    Object.defineProperty(AlertIconAndTypesService.prototype, "alertType", {
        get: /**
         * @return {?}
         */
        function () {
            return this._alertType;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (ALERT_TYPES.indexOf(val) > -1) {
                this._alertType = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertIconAndTypesService.prototype, "alertIconShape", {
        get: /**
         * @return {?}
         */
        function () {
            if ('' === this._alertIconShape) {
                return this.iconInfoFromType(this._alertType).shape;
            }
            return this._alertIconShape;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (!val) {
                this._alertIconShape = '';
            }
            else if (val !== this._alertIconShape) {
                this._alertIconShape = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertIconAndTypesService.prototype, "alertIconTitle", {
        get: /**
         * @return {?}
         */
        function () {
            return this.iconInfoFromType(this._alertType).title;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} type
     * @param {?=} classOrShape
     * @return {?}
     */
    AlertIconAndTypesService.prototype.iconInfoFromType = /**
     * @param {?} type
     * @param {?=} classOrShape
     * @return {?}
     */
    function (type, classOrShape) {
        if (classOrShape === void 0) { classOrShape = 'shape'; }
        /** @type {?} */
        var returnObj = { shape: '', cssClass: '', title: '' };
        switch (type) {
            case 'warning':
            case 'alert-warning':
                returnObj.shape = 'exclamation-triangle';
                returnObj.cssClass = 'alert-warning';
                returnObj.title = this.commonStrings.warning;
                break;
            case 'danger':
            case 'alert-danger':
                returnObj.shape = 'exclamation-circle';
                returnObj.cssClass = 'alert-danger';
                returnObj.title = this.commonStrings.danger;
                break;
            case 'success':
            case 'alert-success':
                returnObj.shape = 'check-circle';
                returnObj.cssClass = 'alert-success';
                returnObj.title = this.commonStrings.success;
                break;
            default:
                returnObj.shape = this.defaultIconShape;
                returnObj.cssClass = 'alert-info';
                returnObj.title = this.commonStrings.info;
                break;
        }
        return returnObj;
    };
    AlertIconAndTypesService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AlertIconAndTypesService.ctorParameters = function () { return [
        { type: ClrCommonStrings }
    ]; };
    return AlertIconAndTypesService;
}());
export { AlertIconAndTypesService };
if (false) {
    /** @type {?} */
    AlertIconAndTypesService.prototype.defaultIconShape;
    /** @type {?} */
    AlertIconAndTypesService.prototype._alertIconShape;
    /** @type {?} */
    AlertIconAndTypesService.prototype._alertType;
    /** @type {?} */
    AlertIconAndTypesService.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1hbmQtdHlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImVtcGhhc2lzL2FsZXJ0L3Byb3ZpZGVycy9pY29uLWFuZC10eXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRWhGO0lBRUUsa0NBQW9CLGFBQStCO1FBQS9CLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUUzQyxxQkFBZ0IsR0FBRyxhQUFhLENBQUM7UUFDakMsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFDckIsZUFBVSxHQUFHLE1BQU0sQ0FBQztJQUowQixDQUFDO0lBTXZELHNCQUFJLCtDQUFTOzs7O1FBQWI7WUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzs7Ozs7UUFDRCxVQUFjLEdBQVc7WUFDdkIsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQzthQUN2QjtRQUNILENBQUM7OztPQUxBO0lBT0Qsc0JBQUksb0RBQWM7Ozs7UUFBbEI7WUFDRSxJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUMvQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ3JEO1lBQ0QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzlCLENBQUM7Ozs7O1FBQ0QsVUFBbUIsR0FBVztZQUM1QixJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNSLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO2FBQzNCO2lCQUFNLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDO2FBQzVCO1FBQ0gsQ0FBQzs7O09BUEE7SUFTRCxzQkFBSSxvREFBYzs7OztRQUFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdEQsQ0FBQzs7O09BQUE7Ozs7OztJQUVNLG1EQUFnQjs7Ozs7SUFBdkIsVUFBd0IsSUFBWSxFQUFFLFlBQThCO1FBQTlCLDZCQUFBLEVBQUEsc0JBQThCOztZQUM1RCxTQUFTLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtRQUV4RCxRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssU0FBUyxDQUFDO1lBQ2YsS0FBSyxlQUFlO2dCQUNsQixTQUFTLENBQUMsS0FBSyxHQUFHLHNCQUFzQixDQUFDO2dCQUN6QyxTQUFTLENBQUMsUUFBUSxHQUFHLGVBQWUsQ0FBQztnQkFDckMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztnQkFDN0MsTUFBTTtZQUNSLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxjQUFjO2dCQUNqQixTQUFTLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDO2dCQUN2QyxTQUFTLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQztnQkFDcEMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztnQkFDNUMsTUFBTTtZQUNSLEtBQUssU0FBUyxDQUFDO1lBQ2YsS0FBSyxlQUFlO2dCQUNsQixTQUFTLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQztnQkFDakMsU0FBUyxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUM7Z0JBQ3JDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7Z0JBQzdDLE1BQU07WUFDUjtnQkFDRSxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDeEMsU0FBUyxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7Z0JBQ2xDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7Z0JBQzFDLE1BQU07U0FDVDtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7O2dCQWpFRixVQUFVOzs7O2dCQUZGLGdCQUFnQjs7SUFvRXpCLCtCQUFDO0NBQUEsQUFsRUQsSUFrRUM7U0FqRVksd0JBQXdCOzs7SUFHbkMsb0RBQXlDOztJQUN6QyxtREFBNkI7O0lBQzdCLDhDQUE0Qjs7SUFKaEIsaURBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFsZXJ0SW5mb09iamVjdCB9IGZyb20gJy4uL3V0aWxzL2FsZXJ0LWluZm8tb2JqZWN0JztcbmltcG9ydCB7IEFMRVJUX1RZUEVTIH0gZnJvbSAnLi4vdXRpbHMvYWxlcnQtdHlwZXMnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFsZXJ0SWNvbkFuZFR5cGVzU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5ncykge31cblxuICBwcml2YXRlIGRlZmF1bHRJY29uU2hhcGUgPSAnaW5mby1jaXJjbGUnO1xuICBwcml2YXRlIF9hbGVydEljb25TaGFwZSA9ICcnO1xuICBwcml2YXRlIF9hbGVydFR5cGUgPSAnaW5mbyc7XG5cbiAgZ2V0IGFsZXJ0VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9hbGVydFR5cGU7XG4gIH1cbiAgc2V0IGFsZXJ0VHlwZSh2YWw6IHN0cmluZykge1xuICAgIGlmIChBTEVSVF9UWVBFUy5pbmRleE9mKHZhbCkgPiAtMSkge1xuICAgICAgdGhpcy5fYWxlcnRUeXBlID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhbGVydEljb25TaGFwZSgpOiBzdHJpbmcge1xuICAgIGlmICgnJyA9PT0gdGhpcy5fYWxlcnRJY29uU2hhcGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmljb25JbmZvRnJvbVR5cGUodGhpcy5fYWxlcnRUeXBlKS5zaGFwZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2FsZXJ0SWNvblNoYXBlO1xuICB9XG4gIHNldCBhbGVydEljb25TaGFwZSh2YWw6IHN0cmluZykge1xuICAgIGlmICghdmFsKSB7XG4gICAgICB0aGlzLl9hbGVydEljb25TaGFwZSA9ICcnO1xuICAgIH0gZWxzZSBpZiAodmFsICE9PSB0aGlzLl9hbGVydEljb25TaGFwZSkge1xuICAgICAgdGhpcy5fYWxlcnRJY29uU2hhcGUgPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFsZXJ0SWNvblRpdGxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaWNvbkluZm9Gcm9tVHlwZSh0aGlzLl9hbGVydFR5cGUpLnRpdGxlO1xuICB9XG5cbiAgcHVibGljIGljb25JbmZvRnJvbVR5cGUodHlwZTogc3RyaW5nLCBjbGFzc09yU2hhcGU6IHN0cmluZyA9ICdzaGFwZScpOiBBbGVydEluZm9PYmplY3Qge1xuICAgIGNvbnN0IHJldHVybk9iaiA9IHsgc2hhcGU6ICcnLCBjc3NDbGFzczogJycsIHRpdGxlOiAnJyB9O1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgIGNhc2UgJ2FsZXJ0LXdhcm5pbmcnOlxuICAgICAgICByZXR1cm5PYmouc2hhcGUgPSAnZXhjbGFtYXRpb24tdHJpYW5nbGUnO1xuICAgICAgICByZXR1cm5PYmouY3NzQ2xhc3MgPSAnYWxlcnQtd2FybmluZyc7XG4gICAgICAgIHJldHVybk9iai50aXRsZSA9IHRoaXMuY29tbW9uU3RyaW5ncy53YXJuaW5nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Rhbmdlcic6XG4gICAgICBjYXNlICdhbGVydC1kYW5nZXInOlxuICAgICAgICByZXR1cm5PYmouc2hhcGUgPSAnZXhjbGFtYXRpb24tY2lyY2xlJztcbiAgICAgICAgcmV0dXJuT2JqLmNzc0NsYXNzID0gJ2FsZXJ0LWRhbmdlcic7XG4gICAgICAgIHJldHVybk9iai50aXRsZSA9IHRoaXMuY29tbW9uU3RyaW5ncy5kYW5nZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICBjYXNlICdhbGVydC1zdWNjZXNzJzpcbiAgICAgICAgcmV0dXJuT2JqLnNoYXBlID0gJ2NoZWNrLWNpcmNsZSc7XG4gICAgICAgIHJldHVybk9iai5jc3NDbGFzcyA9ICdhbGVydC1zdWNjZXNzJztcbiAgICAgICAgcmV0dXJuT2JqLnRpdGxlID0gdGhpcy5jb21tb25TdHJpbmdzLnN1Y2Nlc3M7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuT2JqLnNoYXBlID0gdGhpcy5kZWZhdWx0SWNvblNoYXBlO1xuICAgICAgICByZXR1cm5PYmouY3NzQ2xhc3MgPSAnYWxlcnQtaW5mbyc7XG4gICAgICAgIHJldHVybk9iai50aXRsZSA9IHRoaXMuY29tbW9uU3RyaW5ncy5pbmZvO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0dXJuT2JqO1xuICB9XG59XG4iXX0=