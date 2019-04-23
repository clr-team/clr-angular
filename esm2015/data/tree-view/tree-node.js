/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Inject, Injector, Input, Optional, Output, SkipSelf, } from '@angular/core';
import { filter } from 'rxjs/operators';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';
import { LoadingListener } from '../../utils/loading/loading-listener';
import { DeclarativeTreeNodeModel } from './models/declarative-tree-node.model';
import { ClrSelectedState } from './models/selected-state.enum';
import { TREE_FEATURES_PROVIDER, TreeFeaturesService } from './tree-features.service';
/**
 * @template T
 */
export class ClrTreeNode {
    /**
     * @param {?} nodeId
     * @param {?} parent
     * @param {?} featuresService
     * @param {?} expandService
     * @param {?} commonStrings
     * @param {?} injector
     */
    constructor(nodeId, parent, featuresService, expandService, commonStrings, injector) {
        this.nodeId = nodeId;
        this.featuresService = featuresService;
        this.expandService = expandService;
        this.commonStrings = commonStrings;
        this.STATES = ClrSelectedState;
        this.skipEmitChange = false;
        this.selectedChange = new EventEmitter(false);
        this.expandedChange = new EventEmitter();
        this.subscriptions = [];
        if (this.featuresService.recursion) {
            // I'm completely stuck, we have to hack into private properties until either
            // https://github.com/angular/angular/issues/14935 or https://github.com/angular/angular/issues/15998
            // are fixed
            this._model = ((/** @type {?} */ (injector))).view.context.clrModel;
        }
        else {
            // Force cast for now, not sure how to tie the correct type here to featuresService.recursion
            this._model = new DeclarativeTreeNodeModel(parent ? (/** @type {?} */ (parent._model)) : null);
        }
    }
    /**
     * @return {?}
     */
    isExpandable() {
        if (typeof this.expandable !== 'undefined') {
            return this.expandable;
        }
        return !!this.expandService.expandable || this._model.children.length > 0;
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._model.selected.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this.featuresService.selectable = true;
        // Gracefully handle falsy states like null or undefined because it's just easier than answering questions.
        // This shouldn't happen with strict typing on the app's side, but it's not up to us.
        if (value === null || typeof value === 'undefined') {
            value = ClrSelectedState.UNSELECTED;
        }
        // We match booleans to the corresponding ClrSelectedState
        if (typeof value === 'boolean') {
            value = value ? ClrSelectedState.SELECTED : ClrSelectedState.UNSELECTED;
        }
        // We propagate only if the tree is in smart mode, and skip emitting the output when we set the input
        // See https://github.com/vmware/clarity/issues/3073
        this.skipEmitChange = true;
        this._model.setSelected(value, this.featuresService.eager, this.featuresService.eager);
        this.skipEmitChange = false;
    }
    /**
     * @return {?}
     */
    get treeNodeRole() {
        return this._model.parent ? 'treeitem' : 'tree';
    }
    /**
     * @return {?}
     */
    get rootAriaMultiSelectable() {
        if (this._model.parent || !this.featuresService.selectable) {
            return null;
        }
        else {
            return true;
        }
    }
    /**
     * @return {?}
     */
    get ariaSelected() {
        return this.featuresService.selectable ? this._model.selected.value === ClrSelectedState.SELECTED : null;
    }
    // I'm caving on this, for tree nodes I think we can tolerate having a two-way binding on the component
    // rather than enforce the clrIfExpanded structural directive for dynamic cases. Mostly because for the smart
    // case, you can't use a structural directive, it would need to go on an ng-container.
    /**
     * @return {?}
     */
    get expanded() {
        return this.expandService.expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        this.expandService.expanded = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this._model.selected.pipe(filter((/**
         * @return {?}
         */
        () => !this.skipEmitChange))).subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => this.selectedChange.emit(value))));
        this.subscriptions.push(this.expandService.expandChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => this.expandedChange.emit(value))));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._model.destroy();
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
ClrTreeNode.decorators = [
    { type: Component, args: [{
                selector: 'clr-tree-node',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"clr-tree-node-content-container\">\n  <button\n    *ngIf=\"isExpandable() && !_model.loading && !expandService.loading\"\n    type=\"button\"\n    class=\"clr-treenode-caret\"\n    (click)=\"expandService.toggle()\"\n    [attr.aria-expanded]=\"expandService.expanded\">\n    <clr-icon\n      class=\"clr-treenode-caret-icon\"\n      shape=\"caret\"\n      [attr.dir]=\"expandService.expanded ? 'down' : 'right'\"\n      [attr.title]=\"expandService.expanded ? commonStrings.collapse : commonStrings.expand\"></clr-icon>\n  </button>\n  <div class=\"clr-treenode-spinner-container\" *ngIf=\"expandService.loading || _model.loading\">\n        <span class=\"clr-treenode-spinner spinner\"></span>\n  </div>\n  <div class=\"clr-checkbox-wrapper clr-treenode-checkbox\" *ngIf=\"featuresService.selectable\">\n    <input type=\"checkbox\" id=\"{{nodeId}}-check\" class=\"clr-checkbox\" [attr.aria-labelledby]=\"nodeId\"\n           [checked]=\"_model.selected.value === STATES.SELECTED\"\n           [indeterminate]=\"_model.selected.value === STATES.INDETERMINATE\"\n           (change)=\"_model.toggleSelection(featuresService.eager)\">\n    <label for=\"{{nodeId}}-check\" class=\"clr-control-label\"></label>\n  </div>\n  <div class=\"clr-treenode-content\" [id]=\"nodeId\">\n    <ng-content></ng-content>\n  </div>\n</div>\n<div class=\"clr-treenode-children\"\n     [@childNodesState]=\"expandService.expanded ? 'expanded' : 'collapsed'\"\n     [attr.role]=\"isExpandable() ? 'group' : null\">\n  <ng-content select=\"clr-tree-node\"></ng-content>\n  <ng-content select=\"[clrIfExpanded]\"></ng-content>\n  <clr-recursive-children [parent]=\"_model\"></clr-recursive-children>\n</div>\n",
                providers: [
                    UNIQUE_ID_PROVIDER,
                    TREE_FEATURES_PROVIDER,
                    IfExpandService,
                    { provide: LoadingListener, useExisting: IfExpandService },
                ],
                animations: [
                    trigger('childNodesState', [
                        state('expanded', style({ height: '*', 'overflow-y': 'hidden' })),
                        state('collapsed', style({ height: 0, 'overflow-y': 'hidden' })),
                        transition('expanded <=> collapsed', animate('0.2s ease-in-out')),
                    ]),
                ],
                host: { '[class.clr-tree-node]': 'true' }
            }] }
];
/** @nocollapse */
ClrTreeNode.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [UNIQUE_ID,] }] },
    { type: ClrTreeNode, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: TreeFeaturesService },
    { type: IfExpandService },
    { type: ClrCommonStrings },
    { type: Injector }
];
ClrTreeNode.propDecorators = {
    selected: [{ type: Input, args: ['clrSelected',] }],
    selectedChange: [{ type: Output, args: ['clrSelectedChange',] }],
    treeNodeRole: [{ type: HostBinding, args: ['attr.role',] }],
    rootAriaMultiSelectable: [{ type: HostBinding, args: ['attr.aria-multiselectable',] }],
    ariaSelected: [{ type: HostBinding, args: ['attr.aria-selected',] }],
    expandable: [{ type: Input, args: ['clrExpandable',] }],
    expanded: [{ type: Input, args: ['clrExpanded',] }],
    expandedChange: [{ type: Output, args: ['clrExpandedChange',] }]
};
if (false) {
    /** @type {?} */
    ClrTreeNode.prototype.STATES;
    /**
     * @type {?}
     * @private
     */
    ClrTreeNode.prototype.skipEmitChange;
    /** @type {?} */
    ClrTreeNode.prototype._model;
    /** @type {?} */
    ClrTreeNode.prototype.selectedChange;
    /** @type {?} */
    ClrTreeNode.prototype.expandable;
    /** @type {?} */
    ClrTreeNode.prototype.expandedChange;
    /**
     * @type {?}
     * @private
     */
    ClrTreeNode.prototype.subscriptions;
    /** @type {?} */
    ClrTreeNode.prototype.nodeId;
    /** @type {?} */
    ClrTreeNode.prototype.featuresService;
    /** @type {?} */
    ClrTreeNode.prototype.expandService;
    /** @type {?} */
    ClrTreeNode.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS90cmVlLXZpZXcvdHJlZS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7OztBQW9CdEYsTUFBTSxPQUFPLFdBQVc7Ozs7Ozs7OztJQUl0QixZQUM0QixNQUFjLEVBR3hDLE1BQXNCLEVBQ2YsZUFBdUMsRUFDdkMsYUFBOEIsRUFDOUIsYUFBK0IsRUFDdEMsUUFBa0I7UUFQUSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSWpDLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtRQUN2QyxrQkFBYSxHQUFi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QUNELFVBQVUsRUFBRTtvQkFDVixPQUFPLENBQUMsaUJBQWlCLEVBQUU7d0JBQ3pCLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDakUsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO3dCQUNoRSxVQUFVLENBQUMsd0JBQXdCLEVBQUUsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7cUJBQ2xFLENBQUM7aUJBQ0g7Z0JBQ0QsSUFBSSxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxFQUFFO2FBQzFDOzs7O3lDQU1JLE1BQU0sU0FBQyxTQUFTO1lBR1QsV0FBVyx1QkFGbEIsUUFBUSxZQUNSLFFBQVE7WUEzQm9CLG1CQUFtQjtZQVAzQyxlQUFlO1lBQ2YsZ0JBQWdCO1lBWnZCLFFBQVE7Ozt1QkF3RVAsS0FBSyxTQUFDLGFBQWE7NkJBc0JuQixNQUFNLFNBQUMsbUJBQW1COzJCQUUxQixXQUFXLFNBQUMsV0FBVztzQ0FLdkIsV0FBVyxTQUFDLDJCQUEyQjsyQkFTdkMsV0FBVyxTQUFDLG9CQUFvQjt5QkFPaEMsS0FBSyxTQUFDLGVBQWU7dUJBS3JCLEtBQUssU0FBQyxhQUFhOzZCQVFuQixNQUFNLFNBQUMsbUJBQW1COzs7O0lBM0YzQiw2QkFBMEI7Ozs7O0lBQzFCLHFDQUErQjs7SUF1Qi9CLDZCQUF5Qjs7SUErQnpCLHFDQUF3Rjs7SUF1QnhGLGlDQUF3RDs7SUFheEQscUNBQTBFOzs7OztJQUUxRSxvQ0FBMkM7O0lBekZ6Qyw2QkFBd0M7O0lBSXhDLHNDQUE4Qzs7SUFDOUMsb0NBQXFDOztJQUNyQyxvQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFNraXBTZWxmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBJZkV4cGFuZFNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1leHBhbmRlZC5zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBVTklRVUVfSUQsIFVOSVFVRV9JRF9QUk9WSURFUiB9IGZyb20gJy4uLy4uL3V0aWxzL2lkLWdlbmVyYXRvci9pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBMb2FkaW5nTGlzdGVuZXIgfSBmcm9tICcuLi8uLi91dGlscy9sb2FkaW5nL2xvYWRpbmctbGlzdGVuZXInO1xuaW1wb3J0IHsgRGVjbGFyYXRpdmVUcmVlTm9kZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvZGVjbGFyYXRpdmUtdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IENsclNlbGVjdGVkU3RhdGUgfSBmcm9tICcuL21vZGVscy9zZWxlY3RlZC1zdGF0ZS5lbnVtJztcbmltcG9ydCB7IFRyZWVOb2RlTW9kZWwgfSBmcm9tICcuL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgVFJFRV9GRUFUVVJFU19QUk9WSURFUiwgVHJlZUZlYXR1cmVzU2VydmljZSB9IGZyb20gJy4vdHJlZS1mZWF0dXJlcy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXRyZWUtbm9kZScsXG4gIHRlbXBsYXRlVXJsOiAnLi90cmVlLW5vZGUuaHRtbCcsXG4gIHByb3ZpZGVyczogW1xuICAgIFVOSVFVRV9JRF9QUk9WSURFUixcbiAgICBUUkVFX0ZFQVRVUkVTX1BST1ZJREVSLFxuICAgIElmRXhwYW5kU2VydmljZSxcbiAgICB7IHByb3ZpZGU6IExvYWRpbmdMaXN0ZW5lciwgdXNlRXhpc3Rpbmc6IElmRXhwYW5kU2VydmljZSB9LFxuICBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignY2hpbGROb2Rlc1N0YXRlJywgW1xuICAgICAgc3RhdGUoJ2V4cGFuZGVkJywgc3R5bGUoeyBoZWlnaHQ6ICcqJywgJ292ZXJmbG93LXknOiAnaGlkZGVuJyB9KSksXG4gICAgICBzdGF0ZSgnY29sbGFwc2VkJywgc3R5bGUoeyBoZWlnaHQ6IDAsICdvdmVyZmxvdy15JzogJ2hpZGRlbicgfSkpLFxuICAgICAgdHJhbnNpdGlvbignZXhwYW5kZWQgPD0+IGNvbGxhcHNlZCcsIGFuaW1hdGUoJzAuMnMgZWFzZS1pbi1vdXQnKSksXG4gICAgXSksXG4gIF0sXG4gIGhvc3Q6IHsgJ1tjbGFzcy5jbHItdHJlZS1ub2RlXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJUcmVlTm9kZTxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgU1RBVEVTID0gQ2xyU2VsZWN0ZWRTdGF0ZTtcbiAgcHJpdmF0ZSBza2lwRW1pdENoYW5nZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoVU5JUVVFX0lEKSBwdWJsaWMgbm9kZUlkOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKClcbiAgICBAU2tpcFNlbGYoKVxuICAgIHBhcmVudDogQ2xyVHJlZU5vZGU8VD4sXG4gICAgcHVibGljIGZlYXR1cmVzU2VydmljZTogVHJlZUZlYXR1cmVzU2VydmljZTxUPixcbiAgICBwdWJsaWMgZXhwYW5kU2VydmljZTogSWZFeHBhbmRTZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzLFxuICAgIGluamVjdG9yOiBJbmplY3RvclxuICApIHtcbiAgICBpZiAodGhpcy5mZWF0dXJlc1NlcnZpY2UucmVjdXJzaW9uKSB7XG4gICAgICAvLyBJJ20gY29tcGxldGVseSBzdHVjaywgd2UgaGF2ZSB0byBoYWNrIGludG8gcHJpdmF0ZSBwcm9wZXJ0aWVzIHVudGlsIGVpdGhlclxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTQ5MzUgb3IgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTU5OThcbiAgICAgIC8vIGFyZSBmaXhlZFxuICAgICAgdGhpcy5fbW9kZWwgPSAoPGFueT5pbmplY3Rvcikudmlldy5jb250ZXh0LmNsck1vZGVsO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBGb3JjZSBjYXN0IGZvciBub3csIG5vdCBzdXJlIGhvdyB0byB0aWUgdGhlIGNvcnJlY3QgdHlwZSBoZXJlIHRvIGZlYXR1cmVzU2VydmljZS5yZWN1cnNpb25cbiAgICAgIHRoaXMuX21vZGVsID0gbmV3IERlY2xhcmF0aXZlVHJlZU5vZGVNb2RlbChwYXJlbnQgPyA8RGVjbGFyYXRpdmVUcmVlTm9kZU1vZGVsPFQ+PnBhcmVudC5fbW9kZWwgOiBudWxsKTtcbiAgICB9XG4gIH1cblxuICBfbW9kZWw6IFRyZWVOb2RlTW9kZWw8VD47XG5cbiAgaXNFeHBhbmRhYmxlKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5leHBhbmRhYmxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRoaXMuZXhwYW5kYWJsZTtcbiAgICB9XG4gICAgcmV0dXJuICEhdGhpcy5leHBhbmRTZXJ2aWNlLmV4cGFuZGFibGUgfHwgdGhpcy5fbW9kZWwuY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyU2VsZWN0ZWQnKVxuICBnZXQgc2VsZWN0ZWQoKTogQ2xyU2VsZWN0ZWRTdGF0ZSB8IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5zZWxlY3RlZC52YWx1ZTtcbiAgfVxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IENsclNlbGVjdGVkU3RhdGUgfCBib29sZWFuKSB7XG4gICAgdGhpcy5mZWF0dXJlc1NlcnZpY2Uuc2VsZWN0YWJsZSA9IHRydWU7XG4gICAgLy8gR3JhY2VmdWxseSBoYW5kbGUgZmFsc3kgc3RhdGVzIGxpa2UgbnVsbCBvciB1bmRlZmluZWQgYmVjYXVzZSBpdCdzIGp1c3QgZWFzaWVyIHRoYW4gYW5zd2VyaW5nIHF1ZXN0aW9ucy5cbiAgICAvLyBUaGlzIHNob3VsZG4ndCBoYXBwZW4gd2l0aCBzdHJpY3QgdHlwaW5nIG9uIHRoZSBhcHAncyBzaWRlLCBidXQgaXQncyBub3QgdXAgdG8gdXMuXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhbHVlID0gQ2xyU2VsZWN0ZWRTdGF0ZS5VTlNFTEVDVEVEO1xuICAgIH1cbiAgICAvLyBXZSBtYXRjaCBib29sZWFucyB0byB0aGUgY29ycmVzcG9uZGluZyBDbHJTZWxlY3RlZFN0YXRlXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlID8gQ2xyU2VsZWN0ZWRTdGF0ZS5TRUxFQ1RFRCA6IENsclNlbGVjdGVkU3RhdGUuVU5TRUxFQ1RFRDtcbiAgICB9XG4gICAgLy8gV2UgcHJvcGFnYXRlIG9ubHkgaWYgdGhlIHRyZWUgaXMgaW4gc21hcnQgbW9kZSwgYW5kIHNraXAgZW1pdHRpbmcgdGhlIG91dHB1dCB3aGVuIHdlIHNldCB0aGUgaW5wdXRcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3Ztd2FyZS9jbGFyaXR5L2lzc3Vlcy8zMDczXG4gICAgdGhpcy5za2lwRW1pdENoYW5nZSA9IHRydWU7XG4gICAgdGhpcy5fbW9kZWwuc2V0U2VsZWN0ZWQodmFsdWUsIHRoaXMuZmVhdHVyZXNTZXJ2aWNlLmVhZ2VyLCB0aGlzLmZlYXR1cmVzU2VydmljZS5lYWdlcik7XG4gICAgdGhpcy5za2lwRW1pdENoYW5nZSA9IGZhbHNlO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyU2VsZWN0ZWRDaGFuZ2UnKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xyU2VsZWN0ZWRTdGF0ZT4oZmFsc2UpO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgZ2V0IHRyZWVOb2RlUm9sZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5wYXJlbnQgPyAndHJlZWl0ZW0nIDogJ3RyZWUnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbXVsdGlzZWxlY3RhYmxlJylcbiAgZ2V0IHJvb3RBcmlhTXVsdGlTZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9tb2RlbC5wYXJlbnQgfHwgIXRoaXMuZmVhdHVyZXNTZXJ2aWNlLnNlbGVjdGFibGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1zZWxlY3RlZCcpXG4gIGdldCBhcmlhU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZmVhdHVyZXNTZXJ2aWNlLnNlbGVjdGFibGUgPyB0aGlzLl9tb2RlbC5zZWxlY3RlZC52YWx1ZSA9PT0gQ2xyU2VsZWN0ZWRTdGF0ZS5TRUxFQ1RFRCA6IG51bGw7XG4gIH1cblxuICAvLyBBbGxvd3MgdGhlIGNvbnN1bWVyIHRvIG92ZXJyaWRlIG91ciBsb2dpYyBkZWNpZGluZyBpZiBhIG5vZGUgaXMgZXhwYW5kYWJsZS5cbiAgLy8gVXNlZnVsIGZvciByZWN1cnNpdmUgdHJlZXMgdGhhdCBkb24ndCB3YW50IHRvIHByZS1sb2FkIG9uZSBsZXZlbCBhaGVhZCBqdXN0IHRvIGtub3cgd2hpY2ggbm9kZXMgYXJlIGV4cGFuZGFibGUuXG4gIEBJbnB1dCgnY2xyRXhwYW5kYWJsZScpIGV4cGFuZGFibGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgLy8gSSdtIGNhdmluZyBvbiB0aGlzLCBmb3IgdHJlZSBub2RlcyBJIHRoaW5rIHdlIGNhbiB0b2xlcmF0ZSBoYXZpbmcgYSB0d28td2F5IGJpbmRpbmcgb24gdGhlIGNvbXBvbmVudFxuICAvLyByYXRoZXIgdGhhbiBlbmZvcmNlIHRoZSBjbHJJZkV4cGFuZGVkIHN0cnVjdHVyYWwgZGlyZWN0aXZlIGZvciBkeW5hbWljIGNhc2VzLiBNb3N0bHkgYmVjYXVzZSBmb3IgdGhlIHNtYXJ0XG4gIC8vIGNhc2UsIHlvdSBjYW4ndCB1c2UgYSBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZSwgaXQgd291bGQgbmVlZCB0byBnbyBvbiBhbiBuZy1jb250YWluZXIuXG4gIEBJbnB1dCgnY2xyRXhwYW5kZWQnKVxuICBnZXQgZXhwYW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kU2VydmljZS5leHBhbmRlZDtcbiAgfVxuICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmV4cGFuZFNlcnZpY2UuZXhwYW5kZWQgPSB2YWx1ZTtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckV4cGFuZGVkQ2hhbmdlJykgZXhwYW5kZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5fbW9kZWwuc2VsZWN0ZWQucGlwZShmaWx0ZXIoKCkgPT4gIXRoaXMuc2tpcEVtaXRDaGFuZ2UpKS5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHZhbHVlKSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuZXhwYW5kU2VydmljZS5leHBhbmRDaGFuZ2Uuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMuZXhwYW5kZWRDaGFuZ2UuZW1pdCh2YWx1ZSkpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX21vZGVsLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=