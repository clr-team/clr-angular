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
export class AlertIconAndTypesService {
    /**
     * @param {?} commonStrings
     */
    constructor(commonStrings) {
        this.commonStrings = commonStrings;
        this.defaultIconShape = 'info-circle';
        this._alertIconShape = '';
        this._alertType = 'info';
    }
    /**
     * @return {?}
     */
    get alertType() {
        return this._alertType;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set alertType(val) {
        if (ALERT_TYPES.indexOf(val) > -1) {
            this._alertType = val;
        }
    }
    /**
     * @return {?}
     */
    get alertIconShape() {
        if ('' === this._alertIconShape) {
            return this.iconInfoFromType(this._alertType).shape;
        }
        return this._alertIconShape;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set alertIconShape(val) {
        if (!val) {
            this._alertIconShape = '';
        }
        else if (val !== this._alertIconShape) {
            this._alertIconShape = val;
        }
    }
    /**
     * @return {?}
     */
    get alertIconTitle() {
        return this.iconInfoFromType(this._alertType).title;
    }
    /**
     * @param {?} type
     * @param {?=} classOrShape
     * @return {?}
     */
    iconInfoFromType(type, classOrShape = 'shape') {
        /** @type {?} */
        const returnObj = { shape: '', cssClass: '', title: '' };
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
    }
}
AlertIconAndTypesService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AlertIconAndTypesService.ctorParameters = () => [
    { type: ClrCommonStrings }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1hbmQtdHlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImVtcGhhc2lzL2FsZXJ0L3Byb3ZpZGVycy9pY29uLWFuZC10eXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBR2hGLE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFDbkMsWUFBb0IsYUFBK0I7UUFBL0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBRTNDLHFCQUFnQixHQUFHLGFBQWEsQ0FBQztRQUNqQyxvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyQixlQUFVLEdBQUcsTUFBTSxDQUFDO0lBSjBCLENBQUM7Ozs7SUFNdkQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBQ0QsSUFBSSxTQUFTLENBQUMsR0FBVztRQUN2QixJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7O0lBRUQsSUFBSSxjQUFjO1FBQ2hCLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUNyRDtRQUNELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDOzs7OztJQUNELElBQUksY0FBYyxDQUFDLEdBQVc7UUFDNUIsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1NBQzNCO2FBQU0sSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN2QyxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQztTQUM1QjtJQUNILENBQUM7Ozs7SUFFRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUN0RCxDQUFDOzs7Ozs7SUFFTSxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsZUFBdUIsT0FBTzs7Y0FDNUQsU0FBUyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7UUFFeEQsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLFNBQVMsQ0FBQztZQUNmLEtBQUssZUFBZTtnQkFDbEIsU0FBUyxDQUFDLEtBQUssR0FBRyxzQkFBc0IsQ0FBQztnQkFDekMsU0FBUyxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUM7Z0JBQ3JDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7Z0JBQzdDLE1BQU07WUFDUixLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssY0FBYztnQkFDakIsU0FBUyxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQztnQkFDdkMsU0FBUyxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUM7Z0JBQ3BDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7Z0JBQzVDLE1BQU07WUFDUixLQUFLLFNBQVMsQ0FBQztZQUNmLEtBQUssZUFBZTtnQkFDbEIsU0FBUyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7Z0JBQ2pDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDO2dCQUNyQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO2dCQUM3QyxNQUFNO1lBQ1I7Z0JBQ0UsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3hDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO2dCQUNsQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO2dCQUMxQyxNQUFNO1NBQ1Q7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDOzs7WUFqRUYsVUFBVTs7OztZQUZGLGdCQUFnQjs7OztJQU12QixvREFBeUM7O0lBQ3pDLG1EQUE2Qjs7SUFDN0IsOENBQTRCOztJQUpoQixpREFBdUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWxlcnRJbmZvT2JqZWN0IH0gZnJvbSAnLi4vdXRpbHMvYWxlcnQtaW5mby1vYmplY3QnO1xuaW1wb3J0IHsgQUxFUlRfVFlQRVMgfSBmcm9tICcuLi91dGlscy9hbGVydC10eXBlcyc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWxlcnRJY29uQW5kVHlwZXNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzKSB7fVxuXG4gIHByaXZhdGUgZGVmYXVsdEljb25TaGFwZSA9ICdpbmZvLWNpcmNsZSc7XG4gIHByaXZhdGUgX2FsZXJ0SWNvblNoYXBlID0gJyc7XG4gIHByaXZhdGUgX2FsZXJ0VHlwZSA9ICdpbmZvJztcblxuICBnZXQgYWxlcnRUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2FsZXJ0VHlwZTtcbiAgfVxuICBzZXQgYWxlcnRUeXBlKHZhbDogc3RyaW5nKSB7XG4gICAgaWYgKEFMRVJUX1RZUEVTLmluZGV4T2YodmFsKSA+IC0xKSB7XG4gICAgICB0aGlzLl9hbGVydFR5cGUgPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFsZXJ0SWNvblNoYXBlKCk6IHN0cmluZyB7XG4gICAgaWYgKCcnID09PSB0aGlzLl9hbGVydEljb25TaGFwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaWNvbkluZm9Gcm9tVHlwZSh0aGlzLl9hbGVydFR5cGUpLnNoYXBlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYWxlcnRJY29uU2hhcGU7XG4gIH1cbiAgc2V0IGFsZXJ0SWNvblNoYXBlKHZhbDogc3RyaW5nKSB7XG4gICAgaWYgKCF2YWwpIHtcbiAgICAgIHRoaXMuX2FsZXJ0SWNvblNoYXBlID0gJyc7XG4gICAgfSBlbHNlIGlmICh2YWwgIT09IHRoaXMuX2FsZXJ0SWNvblNoYXBlKSB7XG4gICAgICB0aGlzLl9hbGVydEljb25TaGFwZSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBnZXQgYWxlcnRJY29uVGl0bGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pY29uSW5mb0Zyb21UeXBlKHRoaXMuX2FsZXJ0VHlwZSkudGl0bGU7XG4gIH1cblxuICBwdWJsaWMgaWNvbkluZm9Gcm9tVHlwZSh0eXBlOiBzdHJpbmcsIGNsYXNzT3JTaGFwZTogc3RyaW5nID0gJ3NoYXBlJyk6IEFsZXJ0SW5mb09iamVjdCB7XG4gICAgY29uc3QgcmV0dXJuT2JqID0geyBzaGFwZTogJycsIGNzc0NsYXNzOiAnJywgdGl0bGU6ICcnIH07XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgY2FzZSAnYWxlcnQtd2FybmluZyc6XG4gICAgICAgIHJldHVybk9iai5zaGFwZSA9ICdleGNsYW1hdGlvbi10cmlhbmdsZSc7XG4gICAgICAgIHJldHVybk9iai5jc3NDbGFzcyA9ICdhbGVydC13YXJuaW5nJztcbiAgICAgICAgcmV0dXJuT2JqLnRpdGxlID0gdGhpcy5jb21tb25TdHJpbmdzLndhcm5pbmc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGFuZ2VyJzpcbiAgICAgIGNhc2UgJ2FsZXJ0LWRhbmdlcic6XG4gICAgICAgIHJldHVybk9iai5zaGFwZSA9ICdleGNsYW1hdGlvbi1jaXJjbGUnO1xuICAgICAgICByZXR1cm5PYmouY3NzQ2xhc3MgPSAnYWxlcnQtZGFuZ2VyJztcbiAgICAgICAgcmV0dXJuT2JqLnRpdGxlID0gdGhpcy5jb21tb25TdHJpbmdzLmRhbmdlcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgIGNhc2UgJ2FsZXJ0LXN1Y2Nlc3MnOlxuICAgICAgICByZXR1cm5PYmouc2hhcGUgPSAnY2hlY2stY2lyY2xlJztcbiAgICAgICAgcmV0dXJuT2JqLmNzc0NsYXNzID0gJ2FsZXJ0LXN1Y2Nlc3MnO1xuICAgICAgICByZXR1cm5PYmoudGl0bGUgPSB0aGlzLmNvbW1vblN0cmluZ3Muc3VjY2VzcztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm5PYmouc2hhcGUgPSB0aGlzLmRlZmF1bHRJY29uU2hhcGU7XG4gICAgICAgIHJldHVybk9iai5jc3NDbGFzcyA9ICdhbGVydC1pbmZvJztcbiAgICAgICAgcmV0dXJuT2JqLnRpdGxlID0gdGhpcy5jb21tb25TdHJpbmdzLmluZm87XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiByZXR1cm5PYmo7XG4gIH1cbn1cbiJdfQ==