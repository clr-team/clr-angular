/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { DatagridRenderStep } from '../enums/render-step.enum';
import { STRICT_WIDTH_CLASS } from './constants';
import { DatagridRenderOrganizer } from './render-organizer';
import { DatagridColumnChanges } from '../enums/column-changes.enum';
export class DatagridCellRenderer {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     */
    constructor(el, renderer, organizer) {
        this.el = el;
        this.renderer = renderer;
        this.subscriptions = [];
        this.subscriptions.push(organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe(() => this.clearWidth()));
    }
    // @TODO(JEREMY) Work out how to dedupe some of this code between header and cell renderers
    /**
     * @param {?} columnState
     * @return {?}
     */
    set columnState(columnState) {
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
        }
        this.stateSubscription = columnState.subscribe(state => this.stateChanges(state));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
        }
    }
    /**
     * @param {?} state
     * @return {?}
     */
    stateChanges(state) {
        if (state.changes && state.changes.length) {
            state.changes.forEach(change => {
                switch (change) {
                    case DatagridColumnChanges.WIDTH:
                        this.setWidth(state);
                        break;
                    default:
                        break;
                }
            });
        }
    }
    /**
     * @return {?}
     */
    clearWidth() {
        this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        this.renderer.setStyle(this.el.nativeElement, 'width', null);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    setWidth(state) {
        if (state.strictWidth) {
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        this.renderer.setStyle(this.el.nativeElement, 'width', state.width + 'px');
    }
}
DatagridCellRenderer.decorators = [
    { type: Directive, args: [{ selector: 'clr-dg-cell' },] }
];
/** @nocollapse */
DatagridCellRenderer.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DatagridRenderOrganizer }
];
if (false) {
    /** @type {?} */
    DatagridCellRenderer.prototype.stateSubscription;
    /** @type {?} */
    DatagridCellRenderer.prototype.subscriptions;
    /** @type {?} */
    DatagridCellRenderer.prototype.el;
    /** @type {?} */
    DatagridCellRenderer.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL2NlbGwtcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzVFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUdyRSxNQUFNLE9BQU8sb0JBQW9COzs7Ozs7SUFXL0IsWUFBb0IsRUFBYyxFQUFVLFFBQW1CLEVBQUUsU0FBa0M7UUFBL0UsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFNdkQsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBTHpDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixTQUFTLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUNoRyxDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBWEQsSUFBSSxXQUFXLENBQUMsV0FBaUQ7UUFDL0QsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDcEYsQ0FBQzs7OztJQVNELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QztJQUNILENBQUM7Ozs7O0lBRU8sWUFBWSxDQUFDLEtBQTBCO1FBQzdDLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN6QyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDN0IsUUFBUSxNQUFNLEVBQUU7b0JBQ2QsS0FBSyxxQkFBcUIsQ0FBQyxLQUFLO3dCQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNyQixNQUFNO29CQUNSO3dCQUNFLE1BQU07aUJBQ1Q7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7OztJQUVPLFVBQVU7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7Ozs7SUFFTyxRQUFRLENBQUMsS0FBMEI7UUFDekMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDbkU7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDdEU7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztJQUM3RSxDQUFDOzs7WUFwREYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRTs7OztZQVZsQixVQUFVO1lBQWEsU0FBUztZQU0zQyx1QkFBdUI7Ozs7SUFNOUIsaURBQXdDOztJQWdCeEMsNkNBQTJDOztJQU4vQixrQ0FBc0I7O0lBQUUsd0NBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJTdGVwIH0gZnJvbSAnLi4vZW51bXMvcmVuZGVyLXN0ZXAuZW51bSc7XG5cbmltcG9ydCB7IFNUUklDVF9XSURUSF9DTEFTUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyT3JnYW5pemVyIH0gZnJvbSAnLi9yZW5kZXItb3JnYW5pemVyJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uU3RhdGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbHVtbi1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGF0YWdyaWRDb2x1bW5DaGFuZ2VzIH0gZnJvbSAnLi4vZW51bXMvY29sdW1uLWNoYW5nZXMuZW51bSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ2Nsci1kZy1jZWxsJyB9KVxuZXhwb3J0IGNsYXNzIERhdGFncmlkQ2VsbFJlbmRlcmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8vIEBUT0RPKEpFUkVNWSkgV29yayBvdXQgaG93IHRvIGRlZHVwZSBzb21lIG9mIHRoaXMgY29kZSBiZXR3ZWVuIGhlYWRlciBhbmQgY2VsbCByZW5kZXJlcnNcbiAgc2V0IGNvbHVtblN0YXRlKGNvbHVtblN0YXRlOiBCZWhhdmlvclN1YmplY3Q8RGF0YWdyaWRDb2x1bW5TdGF0ZT4pIHtcbiAgICBpZiAodGhpcy5zdGF0ZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlU3Vic2NyaXB0aW9uID0gY29sdW1uU3RhdGUuc3Vic2NyaWJlKHN0YXRlID0+IHRoaXMuc3RhdGVDaGFuZ2VzKHN0YXRlKSk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIG9yZ2FuaXplcjogRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIG9yZ2FuaXplci5maWx0ZXJSZW5kZXJTdGVwcyhEYXRhZ3JpZFJlbmRlclN0ZXAuQ0xFQVJfV0lEVEhTKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbGVhcldpZHRoKCkpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgICBpZiAodGhpcy5zdGF0ZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGVDaGFuZ2VzKHN0YXRlOiBEYXRhZ3JpZENvbHVtblN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLmNoYW5nZXMgJiYgc3RhdGUuY2hhbmdlcy5sZW5ndGgpIHtcbiAgICAgIHN0YXRlLmNoYW5nZXMuZm9yRWFjaChjaGFuZ2UgPT4ge1xuICAgICAgICBzd2l0Y2ggKGNoYW5nZSkge1xuICAgICAgICAgIGNhc2UgRGF0YWdyaWRDb2x1bW5DaGFuZ2VzLldJRFRIOlxuICAgICAgICAgICAgdGhpcy5zZXRXaWR0aChzdGF0ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJXaWR0aCgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgU1RSSUNUX1dJRFRIX0NMQVNTKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgbnVsbCk7XG4gIH1cblxuICBwcml2YXRlIHNldFdpZHRoKHN0YXRlOiBEYXRhZ3JpZENvbHVtblN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLnN0cmljdFdpZHRoKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgU1RSSUNUX1dJRFRIX0NMQVNTKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIFNUUklDVF9XSURUSF9DTEFTUyk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBzdGF0ZS53aWR0aCArICdweCcpO1xuICB9XG59XG4iXX0=