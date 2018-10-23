/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2 } from '@angular/core';
import { DatagridRenderStep } from './../enums/render-step.enum';
import { DatagridRenderOrganizer } from './../render/render-organizer';
/**
 * \@description
 * Internal datagrid service that holds a reference to the clr-dg-table element and exposes a method to get height.
 */
var TableSizeService = /** @class */ (function () {
    function TableSizeService(platformId, renderOrganizer, renderer) {
        var _this = this;
        this.platformId = platformId;
        this.renderer = renderer;
        this.subscriptions = [];
        this.subscriptions.push(renderOrganizer.renderStep.subscribe(function (step) {
            if (step === DatagridRenderStep.UPDATE_ROW_WIDTH) {
                _this.updateRowWidth();
            }
        }));
    }
    Object.defineProperty(TableSizeService.prototype, "tableRef", {
        get: /**
         * @return {?}
         */
        function () {
            return this._tableRef;
        },
        set: /**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            this._tableRef = element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableSizeService.prototype, "table", {
        set: /**
         * @param {?} table
         * @return {?}
         */
        function (table) {
            if (isPlatformBrowser(this.platformId) && table.nativeElement) {
                this.tableRef = table.nativeElement.querySelector('.datagrid-table');
            }
        },
        enumerable: true,
        configurable: true
    });
    // Used when resizing columns to show the column border being dragged.
    // Used when resizing columns to show the column border being dragged.
    /**
     * @return {?}
     */
    TableSizeService.prototype.getColumnDragHeight = 
    // Used when resizing columns to show the column border being dragged.
    /**
     * @return {?}
     */
    function () {
        if (!this.tableRef) {
            return;
        }
        return this.tableRef.clientHeight + "px";
    };
    /**
     * @return {?}
     */
    TableSizeService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * @return {?}
     */
    TableSizeService.prototype.updateRowWidth = /**
     * @return {?}
     */
    function () {
        if (!this.tableRef) {
            return;
        }
        /** @type {?} */
        var newWidth = 0;
        this.renderer.removeStyle(this.tableRef, 'width');
        this.columns = Array.from(this.tableRef.querySelectorAll('.datagrid-column'));
        this.columns.forEach(function (item) {
            newWidth += item.clientWidth;
        });
        this.renderer.setStyle(this.tableRef, 'width', newWidth + 'px');
    };
    TableSizeService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TableSizeService.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: DatagridRenderOrganizer },
        { type: Renderer2 }
    ]; };
    return TableSizeService;
}());
export { TableSizeService };
if (false) {
    /** @type {?} */
    TableSizeService.prototype._tableRef;
    /** @type {?} */
    TableSizeService.prototype.columns;
    /** @type {?} */
    TableSizeService.prototype.subscriptions;
    /** @type {?} */
    TableSizeService.prototype.platformId;
    /** @type {?} */
    TableSizeService.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtc2l6ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvdGFibGUtc2l6ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBYyxNQUFNLEVBQUUsVUFBVSxFQUFhLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHbEcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7O0FBTXZFO0lBYUUsMEJBQytCLFVBQWtCLEVBQy9DLGVBQXdDLEVBQ2hDLFFBQW1CO1FBSDdCLGlCQVlDO1FBWDhCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFFdkMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXdCckIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBdEJ6QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsZUFBZSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ3ZDLElBQUksSUFBSSxLQUFLLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFO2dCQUNoRCxLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDdkI7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQXBCRCxzQkFBVyxzQ0FBUTs7OztRQUFuQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDOzs7OztRQUVELFVBQW9CLE9BQW9CO1lBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQzNCLENBQUM7OztPQUpBO0lBbUJELHNCQUFXLG1DQUFLOzs7OztRQUFoQixVQUFpQixLQUFpQjtZQUNoQyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLENBQUMsYUFBYSxFQUFFO2dCQUM3RCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7YUFDdEU7UUFDSCxDQUFDOzs7T0FBQTtJQUVELHNFQUFzRTs7Ozs7SUFDdEUsOENBQW1COzs7OztJQUFuQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE9BQU87U0FDUjtRQUNELE9BQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLE9BQUksQ0FBQztJQUMzQyxDQUFDOzs7O0lBSUQsc0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7O0lBRUQseUNBQWM7OztJQUFkO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsT0FBTztTQUNSOztZQUNHLFFBQVEsR0FBVyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUN2QixRQUFRLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDOztnQkF6REYsVUFBVTs7OztnQkFja0MsTUFBTSx1QkFBOUMsTUFBTSxTQUFDLFdBQVc7Z0JBcEJkLHVCQUF1QjtnQkFKaUMsU0FBUzs7SUFvRTFFLHVCQUFDO0NBQUEsQUExREQsSUEwREM7U0F6RFksZ0JBQWdCOzs7SUFDM0IscUNBQStCOztJQUMvQixtQ0FBMkI7O0lBcUMzQix5Q0FBMkM7O0lBMUJ6QyxzQ0FBK0M7O0lBRS9DLG9DQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBQTEFURk9STV9JRCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJTdGVwIH0gZnJvbSAnLi8uLi9lbnVtcy9yZW5kZXItc3RlcC5lbnVtJztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyT3JnYW5pemVyIH0gZnJvbSAnLi8uLi9yZW5kZXIvcmVuZGVyLW9yZ2FuaXplcic7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJbnRlcm5hbCBkYXRhZ3JpZCBzZXJ2aWNlIHRoYXQgaG9sZHMgYSByZWZlcmVuY2UgdG8gdGhlIGNsci1kZy10YWJsZSBlbGVtZW50IGFuZCBleHBvc2VzIGEgbWV0aG9kIHRvIGdldCBoZWlnaHQuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUYWJsZVNpemVTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfdGFibGVSZWY6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGNvbHVtbnM6IEVsZW1lbnRbXTtcblxuICBwdWJsaWMgZ2V0IHRhYmxlUmVmKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fdGFibGVSZWY7XG4gIH1cblxuICBwdWJsaWMgc2V0IHRhYmxlUmVmKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5fdGFibGVSZWYgPSBlbGVtZW50O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcmVuZGVyT3JnYW5pemVyOiBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplcixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICByZW5kZXJPcmdhbml6ZXIucmVuZGVyU3RlcC5zdWJzY3JpYmUoc3RlcCA9PiB7XG4gICAgICAgIGlmIChzdGVwID09PSBEYXRhZ3JpZFJlbmRlclN0ZXAuVVBEQVRFX1JPV19XSURUSCkge1xuICAgICAgICAgIHRoaXMudXBkYXRlUm93V2lkdGgoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIHB1YmxpYyBzZXQgdGFibGUodGFibGU6IEVsZW1lbnRSZWYpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0YWJsZS5uYXRpdmVFbGVtZW50KSB7XG4gICAgICB0aGlzLnRhYmxlUmVmID0gdGFibGUubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZGF0YWdyaWQtdGFibGUnKTtcbiAgICB9XG4gIH1cblxuICAvLyBVc2VkIHdoZW4gcmVzaXppbmcgY29sdW1ucyB0byBzaG93IHRoZSBjb2x1bW4gYm9yZGVyIGJlaW5nIGRyYWdnZWQuXG4gIGdldENvbHVtbkRyYWdIZWlnaHQoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMudGFibGVSZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIGAke3RoaXMudGFibGVSZWYuY2xpZW50SGVpZ2h0fXB4YDtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgdXBkYXRlUm93V2lkdGgoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnRhYmxlUmVmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBuZXdXaWR0aDogbnVtYmVyID0gMDtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMudGFibGVSZWYsICd3aWR0aCcpO1xuICAgIHRoaXMuY29sdW1ucyA9IEFycmF5LmZyb20odGhpcy50YWJsZVJlZi5xdWVyeVNlbGVjdG9yQWxsKCcuZGF0YWdyaWQtY29sdW1uJykpO1xuICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgbmV3V2lkdGggKz0gaXRlbS5jbGllbnRXaWR0aDtcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudGFibGVSZWYsICd3aWR0aCcsIG5ld1dpZHRoICsgJ3B4Jyk7XG4gIH1cbn1cbiJdfQ==