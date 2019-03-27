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
import { BIG_ENDIAN, DEFAULT_LOCALE_FORMAT, DELIMITER_REGEX, LITTLE_ENDIAN, LITTLE_ENDIAN_REGEX, MIDDLE_ENDIAN, MIDDLE_ENDIAN_REGEX, RTL_REGEX, USER_INPUT_REGEX, } from '../utils/constants';
import { getNumberOfDaysInTheMonth, parseToFourDigitYear } from '../utils/date-utils';
import { LocaleHelperService } from './locale-helper.service';
export class DateIOService {
    /**
     * @param {?} _localeHelperService
     */
    constructor(_localeHelperService) {
        this._localeHelperService = _localeHelperService;
        this.cldrLocaleDateFormat = DEFAULT_LOCALE_FORMAT;
        this.localeDisplayFormat = LITTLE_ENDIAN;
        this.delimiters = ['/', '/'];
        this.cldrLocaleDateFormat = this._localeHelperService.localeDateFormat;
        this.initializeLocaleDisplayFormat();
    }
    /**
     * @private
     * @return {?}
     */
    initializeLocaleDisplayFormat() {
        /** @type {?} */
        const format = this.cldrLocaleDateFormat.toLocaleLowerCase();
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
    }
    /**
     * @private
     * @return {?}
     */
    extractDelimiters() {
        if (this.cldrLocaleDateFormat) {
            // Sanitize Date Format. Remove RTL characters.
            // FIXME: When we support RTL, remove this and handle it correctly.
            /** @type {?} */
            const localeFormat = this.cldrLocaleDateFormat.replace(RTL_REGEX, '');
            /** @type {?} */
            const delimiters = localeFormat.split(DELIMITER_REGEX);
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
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toLocaleDisplayFormatString(date) {
        if (date) {
            if (isNaN(date.getTime())) {
                return '';
            }
            /** @type {?} */
            const dateNo = date.getDate();
            /** @type {?} */
            const monthNo = date.getMonth() + 1;
            /** @type {?} */
            const dateStr = dateNo > 9 ? dateNo.toString() : '0' + dateNo;
            /** @type {?} */
            const monthStr = monthNo > 9 ? monthNo.toString() : '0' + monthNo;
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
    }
    /**
     * @return {?}
     */
    get placeholderText() {
        /** @type {?} */
        const format = this.localeDisplayFormat.format;
        return format[0] + this.delimiters[0] + format[1] + this.delimiters[1] + format[2];
    }
    /**
     * Checks if the month entered by the user is valid or not.
     * Note: Month is 0 based.
     * @private
     * @param {?} month
     * @return {?}
     */
    isValidMonth(month) {
        return month > -1 && month < 12;
    }
    /**
     * Checks if the date is valid depending on the year and month provided.
     * @private
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    isValidDate(year, month, date) {
        return date > 0 && date <= getNumberOfDaysInTheMonth(year, month);
    }
    /**
     * Validates the parameters provided and returns the date.
     * If the parameters are not
     * valid then return null.
     * NOTE: (Month here is 1 based since the user has provided that as an input)
     * @private
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    validateAndGetDate(year, month, date) {
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
        const y = +year;
        /** @type {?} */
        const m = +month - 1;
        // month is 0 based
        /** @type {?} */
        const d = +date;
        if (!this.isValidMonth(m) || !this.isValidDate(y, m, d)) {
            return null;
        }
        /** @type {?} */
        const result = parseToFourDigitYear(y);
        return result !== -1 ? new Date(result, m, d) : null;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDateValueFromDateString(date) {
        if (!date) {
            return null;
        }
        /** @type {?} */
        const dateParts = date.match(USER_INPUT_REGEX);
        if (!dateParts || dateParts.length !== 3) {
            return null;
        }
        const [firstPart, secondPart, thirdPart] = dateParts;
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
    }
}
DateIOService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DateIOService.ctorParameters = () => [
    { type: LocaleHelperService }
];
if (false) {
    /** @type {?} */
    DateIOService.prototype.cldrLocaleDateFormat;
    /**
     * @type {?}
     * @private
     */
    DateIOService.prototype.localeDisplayFormat;
    /**
     * @type {?}
     * @private
     */
    DateIOService.prototype.delimiters;
    /**
     * @type {?}
     * @private
     */
    DateIOService.prototype._localeHelperService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pby5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci9wcm92aWRlcnMvZGF0ZS1pby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUNMLFVBQVUsRUFDVixxQkFBcUIsRUFDckIsZUFBZSxFQUVmLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixTQUFTLEVBQ1QsZ0JBQWdCLEdBQ2pCLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHOUQsTUFBTSxPQUFPLGFBQWE7Ozs7SUFLeEIsWUFBb0Isb0JBQXlDO1FBQXpDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFKdEQseUJBQW9CLEdBQVcscUJBQXFCLENBQUM7UUFDcEQsd0JBQW1CLEdBQTJCLGFBQWEsQ0FBQztRQUM1RCxlQUFVLEdBQXFCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBR2hELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUM7UUFDdkUsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFTyw2QkFBNkI7O2NBQzdCLE1BQU0sR0FBVyxJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLEVBQUU7UUFDcEUsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGFBQWEsQ0FBQztTQUMxQzthQUFNLElBQUks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QUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN4QyxPQUFPLElBQUksQ0FBQztTQUNiO2NBQ0ssQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxHQUFHLFNBQVM7UUFDcEQsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEtBQUssYUFBYSxFQUFFO1lBQzlDLDJDQUEyQztZQUMzQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ2xFO2FBQU0sSUFBSSxJQUFJLENBQUMsbUJBQW1CLEtBQUssYUFBYSxFQUFFO1lBQ3JELDJDQUEyQztZQUMzQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ2xFO2FBQU07WUFDTCwyQ0FBMkM7WUFDM0MsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7OztZQWxJRixVQUFVOzs7O1lBRkYsbUJBQW1COzs7O0lBSTFCLDZDQUE0RDs7Ozs7SUFDNUQsNENBQW9FOzs7OztJQUNwRSxtQ0FBa0Q7Ozs7O0lBRXRDLDZDQUFpRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBCSUdfRU5ESUFOLFxuICBERUZBVUxUX0xPQ0FMRV9GT1JNQVQsXG4gIERFTElNSVRFUl9SRUdFWCxcbiAgSW5wdXREYXRlRGlzcGxheUZvcm1hdCxcbiAgTElUVExFX0VORElBTixcbiAgTElUVExFX0VORElBTl9SRUdFWCxcbiAgTUlERExFX0VORElBTixcbiAgTUlERExFX0VORElBTl9SRUdFWCxcbiAgUlRMX1JFR0VYLFxuICBVU0VSX0lOUFVUX1JFR0VYLFxufSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0TnVtYmVyT2ZEYXlzSW5UaGVNb250aCwgcGFyc2VUb0ZvdXJEaWdpdFllYXIgfSBmcm9tICcuLi91dGlscy9kYXRlLXV0aWxzJztcblxuaW1wb3J0IHsgTG9jYWxlSGVscGVyU2VydmljZSB9IGZyb20gJy4vbG9jYWxlLWhlbHBlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVJT1NlcnZpY2Uge1xuICBwdWJsaWMgY2xkckxvY2FsZURhdGVGb3JtYXQ6IHN0cmluZyA9IERFRkFVTFRfTE9DQUxFX0ZPUk1BVDtcbiAgcHJpdmF0ZSBsb2NhbGVEaXNwbGF5Rm9ybWF0OiBJbnB1dERhdGVEaXNwbGF5Rm9ybWF0ID0gTElUVExFX0VORElBTjtcbiAgcHJpdmF0ZSBkZWxpbWl0ZXJzOiBbc3RyaW5nLCBzdHJpbmddID0gWycvJywgJy8nXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sb2NhbGVIZWxwZXJTZXJ2aWNlOiBMb2NhbGVIZWxwZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5jbGRyTG9jYWxlRGF0ZUZvcm1hdCA9IHRoaXMuX2xvY2FsZUhlbHBlclNlcnZpY2UubG9jYWxlRGF0ZUZvcm1hdDtcbiAgICB0aGlzLmluaXRpYWxpemVMb2NhbGVEaXNwbGF5Rm9ybWF0KCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVMb2NhbGVEaXNwbGF5Rm9ybWF0KCk6IHZvaWQge1xuICAgIGNvbnN0IGZvcm1hdDogc3RyaW5nID0gdGhpcy5jbGRyTG9jYWxlRGF0ZUZvcm1hdC50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgIGlmIChMSVRUTEVfRU5ESUFOX1JFR0VYLnRlc3QoZm9ybWF0KSkge1xuICAgICAgdGhpcy5sb2NhbGVEaXNwbGF5Rm9ybWF0ID0gTElUVExFX0VORElBTjtcbiAgICB9IGVsc2UgaWYgKE1JRERMRV9FTkRJQU5fUkVHRVgudGVzdChmb3JtYXQpKSB7XG4gICAgICB0aGlzLmxvY2FsZURpc3BsYXlGb3JtYXQgPSBNSURETEVfRU5ESUFOO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBldmVyeXRoaW5nIGVsc2UgaXMgc2V0IHRvIEJJRy1FTkRJQU4gRk9STUFUXG4gICAgICB0aGlzLmxvY2FsZURpc3BsYXlGb3JtYXQgPSBCSUdfRU5ESUFOO1xuICAgIH1cbiAgICB0aGlzLmV4dHJhY3REZWxpbWl0ZXJzKCk7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3REZWxpbWl0ZXJzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNsZHJMb2NhbGVEYXRlRm9ybWF0KSB7XG4gICAgICAvLyBTYW5pdGl6ZSBEYXRlIEZvcm1hdC4gUmVtb3ZlIFJUTCBjaGFyYWN0ZXJzLlxuICAgICAgLy8gRklYTUU6IFdoZW4gd2Ugc3VwcG9ydCBSVEwsIHJlbW92ZSB0aGlzIGFuZCBoYW5kbGUgaXQgY29ycmVjdGx5LlxuICAgICAgY29uc3QgbG9jYWxlRm9ybWF0OiBzdHJpbmcgPSB0aGlzLmNsZHJMb2NhbGVEYXRlRm9ybWF0LnJlcGxhY2UoUlRMX1JFR0VYLCAnJyk7XG4gICAgICBjb25zdCBkZWxpbWl0ZXJzOiBzdHJpbmdbXSA9IGxvY2FsZUZvcm1hdC5zcGxpdChERUxJTUlURVJfUkVHRVgpO1xuXG4gICAgICAvLyBOT1RFOiBUaGUgc3BsaXQgZnJvbSB0aGUgQ0xEUiBkYXRlIGZvcm1hdCBzaG91bGQgYWx3YXlzIHJlc3VsdFxuICAgICAgLy8gaW4gYW4gYXJhcnkgd2l0aCA0IGVsZW1lbnRzLiBUaGUgMXN0IGFuZCB0aGUgMm5kIHZhbHVlcyBhcmUgdGhlIGRlbGltaXRlcnNcbiAgICAgIC8vIHdlIHdpbGwgdXNlIGluIG9yZGVyLlxuICAgICAgLy8gRWc6IFwiZGQvTU0veVwiLnNwbGl0KC9kK3xtK3x5Ky9pKSByZXN1bHRzIGluIFtcIlwiLCBcIi9cIiwgXCIvXCIsIFwiXCJdXG4gICAgICBpZiAoZGVsaW1pdGVycyAmJiBkZWxpbWl0ZXJzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICB0aGlzLmRlbGltaXRlcnMgPSBbZGVsaW1pdGVyc1sxXSwgZGVsaW1pdGVyc1syXV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdVbmV4cGVjdGVkIGRhdGUgZm9ybWF0IHJlY2VpdmVkLiBEZWxpbWl0ZXJzIGV4dHJhY3RlZDogJywgZGVsaW1pdGVycyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdG9Mb2NhbGVEaXNwbGF5Rm9ybWF0U3RyaW5nKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBpZiAoaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRhdGVObzogbnVtYmVyID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICBjb25zdCBtb250aE5vOiBudW1iZXIgPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgY29uc3QgZGF0ZVN0cjogc3RyaW5nID0gZGF0ZU5vID4gOSA/IGRhdGVOby50b1N0cmluZygpIDogJzAnICsgZGF0ZU5vO1xuICAgICAgY29uc3QgbW9udGhTdHI6IHN0cmluZyA9IG1vbnRoTm8gPiA5ID8gbW9udGhOby50b1N0cmluZygpIDogJzAnICsgbW9udGhObztcbiAgICAgIGlmICh0aGlzLmxvY2FsZURpc3BsYXlGb3JtYXQgPT09IExJVFRMRV9FTkRJQU4pIHtcbiAgICAgICAgcmV0dXJuIGRhdGVTdHIgKyB0aGlzLmRlbGltaXRlcnNbMF0gKyBtb250aFN0ciArIHRoaXMuZGVsaW1pdGVyc1sxXSArIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sb2NhbGVEaXNwbGF5Rm9ybWF0ID09PSBNSURETEVfRU5ESUFOKSB7XG4gICAgICAgIHJldHVybiBtb250aFN0ciArIHRoaXMuZGVsaW1pdGVyc1swXSArIGRhdGVTdHIgKyB0aGlzLmRlbGltaXRlcnNbMV0gKyBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpICsgdGhpcy5kZWxpbWl0ZXJzWzBdICsgbW9udGhTdHIgKyB0aGlzLmRlbGltaXRlcnNbMV0gKyBkYXRlU3RyO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBnZXQgcGxhY2Vob2xkZXJUZXh0KCk6IHN0cmluZyB7XG4gICAgY29uc3QgZm9ybWF0OiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZ10gPSB0aGlzLmxvY2FsZURpc3BsYXlGb3JtYXQuZm9ybWF0O1xuICAgIHJldHVybiBmb3JtYXRbMF0gKyB0aGlzLmRlbGltaXRlcnNbMF0gKyBmb3JtYXRbMV0gKyB0aGlzLmRlbGltaXRlcnNbMV0gKyBmb3JtYXRbMl07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBtb250aCBlbnRlcmVkIGJ5IHRoZSB1c2VyIGlzIHZhbGlkIG9yIG5vdC5cbiAgICogTm90ZTogTW9udGggaXMgMCBiYXNlZC5cbiAgICovXG4gIHByaXZhdGUgaXNWYWxpZE1vbnRoKG1vbnRoOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbW9udGggPiAtMSAmJiBtb250aCA8IDEyO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgZGF0ZSBpcyB2YWxpZCBkZXBlbmRpbmcgb24gdGhlIHllYXIgYW5kIG1vbnRoIHByb3ZpZGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBpc1ZhbGlkRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRhdGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkYXRlID4gMCAmJiBkYXRlIDw9IGdldE51bWJlck9mRGF5c0luVGhlTW9udGgoeWVhciwgbW9udGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyB0aGUgcGFyYW1ldGVycyBwcm92aWRlZCBhbmQgcmV0dXJucyB0aGUgZGF0ZS5cbiAgICogSWYgdGhlIHBhcmFtZXRlcnMgYXJlIG5vdFxuICAgKiB2YWxpZCB0aGVuIHJldHVybiBudWxsLlxuICAgKiBOT1RFOiAoTW9udGggaGVyZSBpcyAxIGJhc2VkIHNpbmNlIHRoZSB1c2VyIGhhcyBwcm92aWRlZCB0aGF0IGFzIGFuIGlucHV0KVxuICAgKi9cbiAgcHJpdmF0ZSB2YWxpZGF0ZUFuZEdldERhdGUoeWVhcjogc3RyaW5nLCBtb250aDogc3RyaW5nLCBkYXRlOiBzdHJpbmcpOiBEYXRlIHtcbiAgICAvLyBJIGRvbid0IGtub3cgd2hhdHMgd3Jvbmcgd2l0aCB0aGUgVFMgY29tcGlsZXIuIEl0IHRocm93cyBhbiBlcnJvciBpZiBJIHdyaXRlXG4gICAgLy8gdGhlIGJlbG93IGlmIHN0YXRlbWVudC4gVGhlIGVycm9yIGlzOlxuICAgIC8vIE9wZXJhdG9yICchPT0nIGNhbm5vdCBiZSBhcHBsaWVkIHRvIHR5cGVzICcyJyBhbmQgJzQnXG4gICAgLy8gTW9yZSBpbmZvIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTI3OTQjaXNzdWVjb21tZW50LTI3MDM0MjkzNlxuICAgIC8qXG4gICAgICAgIGlmICh5ZWFyLmxlbmd0aCAhPT0gMiB8fCB5ZWFyLmxlbmd0aCAhPT0gNCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgKi9cblxuICAgIC8vIEluc3RlYWQgSSBoYXZlIHRvIHdyaXRlIHRoZSBsb2dpYyBsaWtlIHRoaXMgeC0oXG4gICAgY29uc3QgeTogbnVtYmVyID0gK3llYXI7XG4gICAgY29uc3QgbTogbnVtYmVyID0gK21vbnRoIC0gMTsgLy8gbW9udGggaXMgMCBiYXNlZFxuICAgIGNvbnN0IGQ6IG51bWJlciA9ICtkYXRlO1xuICAgIGlmICghdGhpcy5pc1ZhbGlkTW9udGgobSkgfHwgIXRoaXMuaXNWYWxpZERhdGUoeSwgbSwgZCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9IHBhcnNlVG9Gb3VyRGlnaXRZZWFyKHkpO1xuICAgIHJldHVybiByZXN1bHQgIT09IC0xID8gbmV3IERhdGUocmVzdWx0LCBtLCBkKSA6IG51bGw7XG4gIH1cblxuICBnZXREYXRlVmFsdWVGcm9tRGF0ZVN0cmluZyhkYXRlOiBzdHJpbmcpOiBEYXRlIHtcbiAgICBpZiAoIWRhdGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBkYXRlUGFydHM6IHN0cmluZ1tdID0gZGF0ZS5tYXRjaChVU0VSX0lOUFVUX1JFR0VYKTtcbiAgICBpZiAoIWRhdGVQYXJ0cyB8fCBkYXRlUGFydHMubGVuZ3RoICE9PSAzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgW2ZpcnN0UGFydCwgc2Vjb25kUGFydCwgdGhpcmRQYXJ0XSA9IGRhdGVQYXJ0cztcbiAgICBpZiAodGhpcy5sb2NhbGVEaXNwbGF5Rm9ybWF0ID09PSBMSVRUTEVfRU5ESUFOKSB7XG4gICAgICAvLyBzZWNvbmRQYXJ0IGlzIG1vbnRoICYmIGZpcnN0UGFydCBpcyBkYXRlXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUFuZEdldERhdGUodGhpcmRQYXJ0LCBzZWNvbmRQYXJ0LCBmaXJzdFBhcnQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5sb2NhbGVEaXNwbGF5Rm9ybWF0ID09PSBNSURETEVfRU5ESUFOKSB7XG4gICAgICAvLyBmaXJzdFBhcnQgaXMgbW9udGggJiYgc2Vjb25kUGFydCBpcyBkYXRlXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUFuZEdldERhdGUodGhpcmRQYXJ0LCBmaXJzdFBhcnQsIHNlY29uZFBhcnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzZWNvbmRQYXJ0IGlzIG1vbnRoICYmIHRoaXJkUGFydCBpcyBkYXRlXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUFuZEdldERhdGUoZmlyc3RQYXJ0LCBzZWNvbmRQYXJ0LCB0aGlyZFBhcnQpO1xuICAgIH1cbiAgfVxufVxuIl19