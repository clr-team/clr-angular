/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { BIG_ENDIAN, DEFAULT_LOCALE_FORMAT, DELIMITER_REGEX, LITTLE_ENDIAN, LITTLE_ENDIAN_REGEX, MIDDLE_ENDIAN, MIDDLE_ENDIAN_REGEX, RTL_REGEX, USER_INPUT_REGEX, } from '../utils/constants';
import { getNumberOfDaysInTheMonth, parseToFourDigitYear } from '../utils/date-utils';
import { LocaleHelperService } from './locale-helper.service';
var DateIOService = /** @class */ (function () {
    function DateIOService(_localeHelperService) {
        this._localeHelperService = _localeHelperService;
        this.cldrLocaleDateFormat = DEFAULT_LOCALE_FORMAT;
        this.localeDisplayFormat = LITTLE_ENDIAN;
        this.delimiters = ['/', '/'];
        this.cldrLocaleDateFormat = this._localeHelperService.localeDateFormat;
        this.initializeLocaleDisplayFormat();
    }
    /**
     * @return {?}
     */
    DateIOService.prototype.initializeLocaleDisplayFormat = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var format = this.cldrLocaleDateFormat.toLocaleLowerCase();
        if (LITTLE_ENDIAN_REGEX.test(format)) {
            this.localeDisplayFormat = LITTLE_ENDIAN;
        }
        else if (MIDDLE_ENDIAN_REGEX.test(format)) {
            this.localeDisplayFormat = MIDDLE_ENDIAN;
        }
        else {
            // everything else is set to BIG-ENDIAN FORMAT
            this.localeDisplayFormat = BIG_ENDIAN;
        }
        this.extractDelimiters();
    };
    /**
     * @return {?}
     */
    DateIOService.prototype.extractDelimiters = /**
     * @return {?}
     */
    function () {
        if (this.cldrLocaleDateFormat) {
            // Sanitize Date Format. Remove RTL characters.
            // FIXME: When we support RTL, remove this and handle it correctly.
            /** @type {?} */
            var localeFormat = this.cldrLocaleDateFormat.replace(RTL_REGEX, '');
            /** @type {?} */
            var delimiters = localeFormat.split(DELIMITER_REGEX);
            // NOTE: The split from the CLDR date format should always result
            // in an arary with 4 elements. The 1st and the 2nd values are the delimiters
            // we will use in order.
            // Eg: "dd/MM/y".split(/d+|m+|y+/i) results in ["", "/", "/", ""]
            if (delimiters && delimiters.length === 4) {
                this.delimiters = [delimiters[1], delimiters[2]];
            }
            else {
                console.error('Unexpected date format received. Delimiters extracted: ', delimiters);
            }
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateIOService.prototype.toLocaleDisplayFormatString = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date) {
            if (isNaN(date.getTime())) {
                return '';
            }
            /** @type {?} */
            var dateNo = date.getDate();
            /** @type {?} */
            var monthNo = date.getMonth() + 1;
            /** @type {?} */
            var dateStr = dateNo > 9 ? dateNo.toString() : '0' + dateNo;
            /** @type {?} */
            var monthStr = monthNo > 9 ? monthNo.toString() : '0' + monthNo;
            if (this.localeDisplayFormat === LITTLE_ENDIAN) {
                return dateStr + this.delimiters[0] + monthStr + this.delimiters[1] + date.getFullYear();
            }
            else if (this.localeDisplayFormat === MIDDLE_ENDIAN) {
                return monthStr + this.delimiters[0] + dateStr + this.delimiters[1] + date.getFullYear();
            }
            else {
                return date.getFullYear() + this.delimiters[0] + monthStr + this.delimiters[1] + dateStr;
            }
        }
        return '';
    };
    Object.defineProperty(DateIOService.prototype, "placeholderText", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var format = this.localeDisplayFormat.format;
            return format[0] + this.delimiters[0] + format[1] + this.delimiters[1] + format[2];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if the month entered by the user is valid or not.
     * Note: Month is 0 based.
     */
    /**
     * Checks if the month entered by the user is valid or not.
     * Note: Month is 0 based.
     * @param {?} month
     * @return {?}
     */
    DateIOService.prototype.isValidMonth = /**
     * Checks if the month entered by the user is valid or not.
     * Note: Month is 0 based.
     * @param {?} month
     * @return {?}
     */
    function (month) {
        return month > -1 && month < 12;
    };
    /**
     * Checks if the date is valid depending on the year and month provided.
     */
    /**
     * Checks if the date is valid depending on the year and month provided.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    DateIOService.prototype.isValidDate = /**
     * Checks if the date is valid depending on the year and month provided.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    function (year, month, date) {
        return date > 0 && date <= getNumberOfDaysInTheMonth(year, month);
    };
    /**
     * Validates the parameters provided and returns the date.
     * If the parameters are not
     * valid then return null.
     * NOTE: (Month here is 1 based since the user has provided that as an input)
     */
    /**
     * Validates the parameters provided and returns the date.
     * If the parameters are not
     * valid then return null.
     * NOTE: (Month here is 1 based since the user has provided that as an input)
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    DateIOService.prototype.validateAndGetDate = /**
     * Validates the parameters provided and returns the date.
     * If the parameters are not
     * valid then return null.
     * NOTE: (Month here is 1 based since the user has provided that as an input)
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    function (year, month, date) {
        // I don't know whats wrong with the TS compiler. It throws an error if I write
        // the below if statement. The error is:
        // Operator '!==' cannot be applied to types '2' and '4'
        // More info here: https://github.com/Microsoft/TypeScript/issues/12794#issuecomment-270342936
        /*
            if (year.length !== 2 || year.length !== 4) {
                return null;
            }
            */
        // I don't know whats wrong with the TS compiler. It throws an error if I write
        // the below if statement. The error is:
        // Operator '!==' cannot be applied to types '2' and '4'
        // More info here: https://github.com/Microsoft/TypeScript/issues/12794#issuecomment-270342936
        /*
                if (year.length !== 2 || year.length !== 4) {
                    return null;
                }
                */
        // Instead I have to write the logic like this x-(
        /** @type {?} */
        var y = +year;
        /** @type {?} */
        var m = +month - 1;
        // month is 0 based
        /** @type {?} */
        var d = +date;
        if (!this.isValidMonth(m) || !this.isValidDate(y, m, d)) {
            return null;
        }
        /** @type {?} */
        var result = parseToFourDigitYear(y);
        return result !== -1 ? new Date(result, m, d) : null;
    };
    /**
     * Checks if the input provided by the user is valid.
     */
    /**
     * Checks if the input provided by the user is valid.
     * @param {?} date
     * @return {?}
     */
    DateIOService.prototype.isValidInput = /**
     * Checks if the input provided by the user is valid.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!date) {
            return null;
        }
        /** @type {?} */
        var dateParts = date.match(USER_INPUT_REGEX);
        if (!dateParts || dateParts.length !== 3) {
            return null;
        }
        var _a = tslib_1.__read(dateParts, 3), firstPart = _a[0], secondPart = _a[1], thirdPart = _a[2];
        if (this.localeDisplayFormat === LITTLE_ENDIAN) {
            // secondPart is month && firstPart is date
            return this.validateAndGetDate(thirdPart, secondPart, firstPart);
        }
        else if (this.localeDisplayFormat === MIDDLE_ENDIAN) {
            // firstPart is month && secondPart is date
            return this.validateAndGetDate(thirdPart, firstPart, secondPart);
        }
        else {
            // secondPart is month && thirdPart is date
            return this.validateAndGetDate(firstPart, secondPart, thirdPart);
        }
    };
    DateIOService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DateIOService.ctorParameters = function () { return [
        { type: LocaleHelperService }
    ]; };
    return DateIOService;
}());
export { DateIOService };
if (false) {
    /** @type {?} */
    DateIOService.prototype.cldrLocaleDateFormat;
    /** @type {?} */
    DateIOService.prototype.localeDisplayFormat;
    /** @type {?} */
    DateIOService.prototype.delimiters;
    /** @type {?} */
    DateIOService.prototype._localeHelperService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pby5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci9wcm92aWRlcnMvZGF0ZS1pby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxVQUFVLEVBQ1YscUJBQXFCLEVBQ3JCLGVBQWUsRUFFZixhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsU0FBUyxFQUNULGdCQUFnQixHQUNqQixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTlEO0lBTUUsdUJBQW9CLG9CQUF5QztRQUF6Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBSnRELHlCQUFvQixHQUFXLHFCQUFxQixDQUFDO1FBQ3BELHdCQUFtQixHQUEyQixhQUFhLENBQUM7UUFDNUQsZUFBVSxHQUFxQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUdoRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDO1FBQ3ZFLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Ozs7SUFFTyxxREFBNkI7OztJQUFyQzs7WUFDUSxNQUFNLEdBQVcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFO1FBQ3BFLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxhQUFhLENBQUM7U0FDMUM7YUFBTSxJQUFJLG1CQUFtQixDQUFD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QyxJQUFJLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNiOztZQUNLLFNBQVMsR0FBYSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1FBQ3hELElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDeEMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNLLElBQUEsaUNBQThDLEVBQTdDLGlCQUFTLEVBQUUsa0JBQVUsRUFBRSxpQkFBc0I7UUFDcEQsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEtBQUssYUFBYSxFQUFFO1lBQzlDLDJDQUEyQztZQUMzQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ2xFO2FBQU0sSUFBSSxJQUFJLENBQUMsbUJBQW1CLEtBQUssYUFBYSxFQUFFO1lBQ3JELDJDQUEyQztZQUMzQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ2xFO2FBQU07WUFDTCwyQ0FBMkM7WUFDM0MsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7O2dCQXJJRixVQUFVOzs7O2dCQUZGLG1CQUFtQjs7SUF3STVCLG9CQUFDO0NBQUEsQUF0SUQsSUFzSUM7U0FySVksYUFBYTs7O0lBQ3hCLDZDQUE0RDs7SUFDNUQsNENBQW9FOztJQUNwRSxtQ0FBa0Q7O0lBRXRDLDZDQUFpRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBCSUdfRU5ESUFOLFxuICBERUZBVUxUX0xPQ0FMRV9GT1JNQVQsXG4gIERFTElNSVRFUl9SRUdFWCxcbiAgSW5wdXREYXRlRGlzcGxheUZvcm1hdCxcbiAgTElUVExFX0VORElBTixcbiAgTElUVExFX0VORElBTl9SRUdFWCxcbiAgTUlERExFX0VORElBTixcbiAgTUlERExFX0VORElBTl9SRUdFWCxcbiAgUlRMX1JFR0VYLFxuICBVU0VSX0lOUFVUX1JFR0VYLFxufSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0TnVtYmVyT2ZEYXlzSW5UaGVNb250aCwgcGFyc2VUb0ZvdXJEaWdpdFllYXIgfSBmcm9tICcuLi91dGlscy9kYXRlLXV0aWxzJztcblxuaW1wb3J0IHsgTG9jYWxlSGVscGVyU2VydmljZSB9IGZyb20gJy4vbG9jYWxlLWhlbHBlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVJT1NlcnZpY2Uge1xuICBwdWJsaWMgY2xkckxvY2FsZURhdGVGb3JtYXQ6IHN0cmluZyA9IERFRkFVTFRfTE9DQUxFX0ZPUk1BVDtcbiAgcHJpdmF0ZSBsb2NhbGVEaXNwbGF5Rm9ybWF0OiBJbnB1dERhdGVEaXNwbGF5Rm9ybWF0ID0gTElUVExFX0VORElBTjtcbiAgcHJpdmF0ZSBkZWxpbWl0ZXJzOiBbc3RyaW5nLCBzdHJpbmddID0gWycvJywgJy8nXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sb2NhbGVIZWxwZXJTZXJ2aWNlOiBMb2NhbGVIZWxwZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5jbGRyTG9jYWxlRGF0ZUZvcm1hdCA9IHRoaXMuX2xvY2FsZUhlbHBlclNlcnZpY2UubG9jYWxlRGF0ZUZvcm1hdDtcbiAgICB0aGlzLmluaXRpYWxpemVMb2NhbGVEaXNwbGF5Rm9ybWF0KCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVMb2NhbGVEaXNwbGF5Rm9ybWF0KCk6IHZvaWQge1xuICAgIGNvbnN0IGZvcm1hdDogc3RyaW5nID0gdGhpcy5jbGRyTG9jYWxlRGF0ZUZvcm1hdC50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgIGlmIChMSVRUTEVfRU5ESUFOX1JFR0VYLnRlc3QoZm9ybWF0KSkge1xuICAgICAgdGhpcy5sb2NhbGVEaXNwbGF5Rm9ybWF0ID0gTElUVExFX0VORElBTjtcbiAgICB9IGVsc2UgaWYgKE1JRERMRV9FTkRJQU5fUkVHRVgudGVzdChmb3JtYXQpKSB7XG4gICAgICB0aGlzLmxvY2FsZURpc3BsYXlGb3JtYXQgPSBNSURETEVfRU5ESUFOO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBldmVyeXRoaW5nIGVsc2UgaXMgc2V0IHRvIEJJRy1FTkRJQU4gRk9STUFUXG4gICAgICB0aGlzLmxvY2FsZURpc3BsYXlGb3JtYXQgPSBCSUdfRU5ESUFOO1xuICAgIH1cbiAgICB0aGlzLmV4dHJhY3REZWxpbWl0ZXJzKCk7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3REZWxpbWl0ZXJzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNsZHJMb2NhbGVEYXRlRm9ybWF0KSB7XG4gICAgICAvLyBTYW5pdGl6ZSBEYXRlIEZvcm1hdC4gUmVtb3ZlIFJUTCBjaGFyYWN0ZXJzLlxuICAgICAgLy8gRklYTUU6IFdoZW4gd2Ugc3VwcG9ydCBSVEwsIHJlbW92ZSB0aGlzIGFuZCBoYW5kbGUgaXQgY29ycmVjdGx5LlxuICAgICAgY29uc3QgbG9jYWxlRm9ybWF0OiBzdHJpbmcgPSB0aGlzLmNsZHJMb2NhbGVEYXRlRm9ybWF0LnJlcGxhY2UoUlRMX1JFR0VYLCAnJyk7XG4gICAgICBjb25zdCBkZWxpbWl0ZXJzOiBzdHJpbmdbXSA9IGxvY2FsZUZvcm1hdC5zcGxpdChERUxJTUlURVJfUkVHRVgpO1xuXG4gICAgICAvLyBOT1RFOiBUaGUgc3BsaXQgZnJvbSB0aGUgQ0xEUiBkYXRlIGZvcm1hdCBzaG91bGQgYWx3YXlzIHJlc3VsdFxuICAgICAgLy8gaW4gYW4gYXJhcnkgd2l0aCA0IGVsZW1lbnRzLiBUaGUgMXN0IGFuZCB0aGUgMm5kIHZhbHVlcyBhcmUgdGhlIGRlbGltaXRlcnNcbiAgICAgIC8vIHdlIHdpbGwgdXNlIGluIG9yZGVyLlxuICAgICAgLy8gRWc6IFwiZGQvTU0veVwiLnNwbGl0KC9kK3xtK3x5Ky9pKSByZXN1bHRzIGluIFtcIlwiLCBcIi9cIiwgXCIvXCIsIFwiXCJdXG4gICAgICBpZiAoZGVsaW1pdGVycyAmJiBkZWxpbWl0ZXJzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICB0aGlzLmRlbGltaXRlcnMgPSBbZGVsaW1pdGVyc1sxXSwgZGVsaW1pdGVyc1syXV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdVbmV4cGVjdGVkIGRhdGUgZm9ybWF0IHJlY2VpdmVkLiBEZWxpbWl0ZXJzIGV4dHJhY3RlZDogJywgZGVsaW1pdGVycyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdG9Mb2NhbGVEaXNwbGF5Rm9ybWF0U3RyaW5nKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBpZiAoaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRhdGVObzogbnVtYmVyID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICBjb25zdCBtb250aE5vOiBudW1iZXIgPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgY29uc3QgZGF0ZVN0cjogc3RyaW5nID0gZGF0ZU5vID4gOSA/IGRhdGVOby50b1N0cmluZygpIDogJzAnICsgZGF0ZU5vO1xuICAgICAgY29uc3QgbW9udGhTdHI6IHN0cmluZyA9IG1vbnRoTm8gPiA5ID8gbW9udGhOby50b1N0cmluZygpIDogJzAnICsgbW9udGhObztcbiAgICAgIGlmICh0aGlzLmxvY2FsZURpc3BsYXlGb3JtYXQgPT09IExJVFRMRV9FTkRJQU4pIHtcbiAgICAgICAgcmV0dXJuIGRhdGVTdHIgKyB0aGlzLmRlbGltaXRlcnNbMF0gKyBtb250aFN0ciArIHRoaXMuZGVsaW1pdGVyc1sxXSArIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sb2NhbGVEaXNwbGF5Rm9ybWF0ID09PSBNSURETEVfRU5ESUFOKSB7XG4gICAgICAgIHJldHVybiBtb250aFN0ciArIHRoaXMuZGVsaW1pdGVyc1swXSArIGRhdGVTdHIgKyB0aGlzLmRlbGltaXRlcnNbMV0gKyBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpICsgdGhpcy5kZWxpbWl0ZXJzWzBdICsgbW9udGhTdHIgKyB0aGlzLmRlbGltaXRlcnNbMV0gKyBkYXRlU3RyO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBnZXQgcGxhY2Vob2xkZXJUZXh0KCk6IHN0cmluZyB7XG4gICAgY29uc3QgZm9ybWF0OiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZ10gPSB0aGlzLmxvY2FsZURpc3BsYXlGb3JtYXQuZm9ybWF0O1xuICAgIHJldHVybiBmb3JtYXRbMF0gKyB0aGlzLmRlbGltaXRlcnNbMF0gKyBmb3JtYXRbMV0gKyB0aGlzLmRlbGltaXRlcnNbMV0gKyBmb3JtYXRbMl07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBtb250aCBlbnRlcmVkIGJ5IHRoZSB1c2VyIGlzIHZhbGlkIG9yIG5vdC5cbiAgICogTm90ZTogTW9udGggaXMgMCBiYXNlZC5cbiAgICovXG4gIHByaXZhdGUgaXNWYWxpZE1vbnRoKG1vbnRoOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbW9udGggPiAtMSAmJiBtb250aCA8IDEyO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgZGF0ZSBpcyB2YWxpZCBkZXBlbmRpbmcgb24gdGhlIHllYXIgYW5kIG1vbnRoIHByb3ZpZGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBpc1ZhbGlkRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRhdGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkYXRlID4gMCAmJiBkYXRlIDw9IGdldE51bWJlck9mRGF5c0luVGhlTW9udGgoeWVhciwgbW9udGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyB0aGUgcGFyYW1ldGVycyBwcm92aWRlZCBhbmQgcmV0dXJucyB0aGUgZGF0ZS5cbiAgICogSWYgdGhlIHBhcmFtZXRlcnMgYXJlIG5vdFxuICAgKiB2YWxpZCB0aGVuIHJldHVybiBudWxsLlxuICAgKiBOT1RFOiAoTW9udGggaGVyZSBpcyAxIGJhc2VkIHNpbmNlIHRoZSB1c2VyIGhhcyBwcm92aWRlZCB0aGF0IGFzIGFuIGlucHV0KVxuICAgKi9cbiAgcHJpdmF0ZSB2YWxpZGF0ZUFuZEdldERhdGUoeWVhcjogc3RyaW5nLCBtb250aDogc3RyaW5nLCBkYXRlOiBzdHJpbmcpOiBEYXRlIHtcbiAgICAvLyBJIGRvbid0IGtub3cgd2hhdHMgd3Jvbmcgd2l0aCB0aGUgVFMgY29tcGlsZXIuIEl0IHRocm93cyBhbiBlcnJvciBpZiBJIHdyaXRlXG4gICAgLy8gdGhlIGJlbG93IGlmIHN0YXRlbWVudC4gVGhlIGVycm9yIGlzOlxuICAgIC8vIE9wZXJhdG9yICchPT0nIGNhbm5vdCBiZSBhcHBsaWVkIHRvIHR5cGVzICcyJyBhbmQgJzQnXG4gICAgLy8gTW9yZSBpbmZvIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTI3OTQjaXNzdWVjb21tZW50LTI3MDM0MjkzNlxuICAgIC8qXG4gICAgICAgIGlmICh5ZWFyLmxlbmd0aCAhPT0gMiB8fCB5ZWFyLmxlbmd0aCAhPT0gNCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgKi9cblxuICAgIC8vIEluc3RlYWQgSSBoYXZlIHRvIHdyaXRlIHRoZSBsb2dpYyBsaWtlIHRoaXMgeC0oXG4gICAgY29uc3QgeTogbnVtYmVyID0gK3llYXI7XG4gICAgY29uc3QgbTogbnVtYmVyID0gK21vbnRoIC0gMTsgLy8gbW9udGggaXMgMCBiYXNlZFxuICAgIGNvbnN0IGQ6IG51bWJlciA9ICtkYXRlO1xuICAgIGlmICghdGhpcy5pc1ZhbGlkTW9udGgobSkgfHwgIXRoaXMuaXNWYWxpZERhdGUoeSwgbSwgZCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9IHBhcnNlVG9Gb3VyRGlnaXRZZWFyKHkpO1xuICAgIHJldHVybiByZXN1bHQgIT09IC0xID8gbmV3IERhdGUocmVzdWx0LCBtLCBkKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBpbnB1dCBwcm92aWRlZCBieSB0aGUgdXNlciBpcyB2YWxpZC5cbiAgICovXG4gIGlzVmFsaWRJbnB1dChkYXRlOiBzdHJpbmcpOiBEYXRlIHtcbiAgICBpZiAoIWRhdGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBkYXRlUGFydHM6IHN0cmluZ1tdID0gZGF0ZS5tYXRjaChVU0VSX0lOUFVUX1JFR0VYKTtcbiAgICBpZiAoIWRhdGVQYXJ0cyB8fCBkYXRlUGFydHMubGVuZ3RoICE9PSAzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgW2ZpcnN0UGFydCwgc2Vjb25kUGFydCwgdGhpcmRQYXJ0XSA9IGRhdGVQYXJ0cztcbiAgICBpZiAodGhpcy5sb2NhbGVEaXNwbGF5Rm9ybWF0ID09PSBMSVRUTEVfRU5ESUFOKSB7XG4gICAgICAvLyBzZWNvbmRQYXJ0IGlzIG1vbnRoICYmIGZpcnN0UGFydCBpcyBkYXRlXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUFuZEdldERhdGUodGhpcmRQYXJ0LCBzZWNvbmRQYXJ0LCBmaXJzdFBhcnQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5sb2NhbGVEaXNwbGF5Rm9ybWF0ID09PSBNSURETEVfRU5ESUFOKSB7XG4gICAgICAvLyBmaXJzdFBhcnQgaXMgbW9udGggJiYgc2Vjb25kUGFydCBpcyBkYXRlXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUFuZEdldERhdGUodGhpcmRQYXJ0LCBmaXJzdFBhcnQsIHNlY29uZFBhcnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzZWNvbmRQYXJ0IGlzIG1vbnRoICYmIHRoaXJkUGFydCBpcyBkYXRlXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUFuZEdldERhdGUoZmlyc3RQYXJ0LCBzZWNvbmRQYXJ0LCB0aGlyZFBhcnQpO1xuICAgIH1cbiAgfVxufVxuIl19