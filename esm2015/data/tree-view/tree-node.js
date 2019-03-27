/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Inject, Injector, Input, Optional, Output, SkipSelf, } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Expand } from '../../utils/expand/providers/expand';
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
                providers: [UNIQUE_ID_PROVIDER, TREE_FEATURES_PROVIDER, Expand, { provide: LoadingListener, useExisting: Expand }],
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
    { type: Expand },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS90cmVlLXZpZXcvdHJlZS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDN0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7OztBQWV0RixNQUFNLE9BQU8sV0FBVzs7Ozs7Ozs7O0lBSXRCLFlBQzRCLE1BQWMsRUFHeEMsTUFBc0IsRUFDZixlQUF1QyxFQUN2QyxhQUFxQixFQUNyQixhQUErQixFQUN0QyxRQUFrQjtRQVBRLFdBQU0sR0FBTixNQUFNLENBQVE7UUFJakMsb0JBQWUsR0FBZixlQUFlLENBQXdCO1FBQ3ZDLGtCQUFhLEdBQWIs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RUFBRTtvQkFDVixPQUFPLENBQUMsaUJBQWlCLEVBQUU7d0JBQ3pCLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDakUsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO3dCQUNoRSxVQUFVLENBQUMsd0JBQXdCLEVBQUUsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7cUJBQ2xFLENBQUM7aUJBQ0g7Z0JBQ0QsSUFBSSxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxFQUFFO2FBQzFDOzs7O3lDQU1JLE1BQU0sU0FBQyxTQUFTO1lBR1QsV0FBVyx1QkFGbEIsUUFBUSxZQUNSLFFBQVE7WUF0Qm9CLG1CQUFtQjtZQVAzQyxNQUFNO1lBQ04sZ0JBQWdCO1lBWnZCLFFBQVE7Ozt1QkFtRVAsS0FBSyxTQUFDLGFBQWE7NkJBc0JuQixNQUFNLFNBQUMsbUJBQW1COzJCQUUxQixXQUFXLFNBQUMsV0FBVztzQ0FLdkIsV0FBVyxTQUFDLDJCQUEyQjsyQkFTdkMsV0FBVyxTQUFDLG9CQUFvQjt5QkFPaEMsS0FBSyxTQUFDLGVBQWU7dUJBS3JCLEtBQUssU0FBQyxhQUFhOzZCQVFuQixNQUFNLFNBQUMsbUJBQW1COzs7O0lBM0YzQiw2QkFBMEI7Ozs7O0lBQzFCLHFDQUErQjs7SUF1Qi9CLDZCQUF5Qjs7SUErQnpCLHFDQUF3Rjs7SUF1QnhGLGlDQUF3RDs7SUFheEQscUNBQTBFOzs7OztJQUUxRSxvQ0FBMkM7O0lBekZ6Qyw2QkFBd0M7O0lBSXhDLHNDQUE4Qzs7SUFDOUMsb0NBQTRCOztJQUM1QixvQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFNraXBTZWxmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBFeHBhbmQgfSBmcm9tICcuLi8uLi91dGlscy9leHBhbmQvcHJvdmlkZXJzL2V4cGFuZCc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVU5JUVVFX0lELCBVTklRVUVfSURfUFJPVklERVIgfSBmcm9tICcuLi8uLi91dGlscy9pZC1nZW5lcmF0b3IvaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9hZGluZ0xpc3RlbmVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9hZGluZy9sb2FkaW5nLWxpc3RlbmVyJztcbmltcG9ydCB7IERlY2xhcmF0aXZlVHJlZU5vZGVNb2RlbCB9IGZyb20gJy4vbW9kZWxzL2RlY2xhcmF0aXZlLXRyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBDbHJTZWxlY3RlZFN0YXRlIH0gZnJvbSAnLi9tb2RlbHMvc2VsZWN0ZWQtc3RhdGUuZW51bSc7XG5pbXBvcnQgeyBUcmVlTm9kZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IFRSRUVfRkVBVFVSRVNfUFJPVklERVIsIFRyZWVGZWF0dXJlc1NlcnZpY2UgfSBmcm9tICcuL3RyZWUtZmVhdHVyZXMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci10cmVlLW5vZGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vdHJlZS1ub2RlLmh0bWwnLFxuICBwcm92aWRlcnM6IFtVTklRVUVfSURfUFJPVklERVIsIFRSRUVfRkVBVFVSRVNfUFJPVklERVIsIEV4cGFuZCwgeyBwcm92aWRlOiBMb2FkaW5nTGlzdGVuZXIsIHVzZUV4aXN0aW5nOiBFeHBhbmQgfV0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdjaGlsZE5vZGVzU3RhdGUnLCBbXG4gICAgICBzdGF0ZSgnZXhwYW5kZWQnLCBzdHlsZSh7IGhlaWdodDogJyonLCAnb3ZlcmZsb3cteSc6ICdoaWRkZW4nIH0pKSxcbiAgICAgIHN0YXRlKCdjb2xsYXBzZWQnLCBzdHlsZSh7IGhlaWdodDogMCwgJ292ZXJmbG93LXknOiAnaGlkZGVuJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKCdleHBhbmRlZCA8PT4gY29sbGFwc2VkJywgYW5pbWF0ZSgnMC4ycyBlYXNlLWluLW91dCcpKSxcbiAgICBdKSxcbiAgXSxcbiAgaG9zdDogeyAnW2NsYXNzLmNsci10cmVlLW5vZGVdJzogJ3RydWUnIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsclRyZWVOb2RlPFQ+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBTVEFURVMgPSBDbHJTZWxlY3RlZFN0YXRlO1xuICBwcml2YXRlIHNraXBFbWl0Q2hhbmdlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChVTklRVUVfSUQpIHB1YmxpYyBub2RlSWQ6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBTa2lwU2VsZigpXG4gICAgcGFyZW50OiBDbHJUcmVlTm9kZTxUPixcbiAgICBwdWJsaWMgZmVhdHVyZXNTZXJ2aWNlOiBUcmVlRmVhdHVyZXNTZXJ2aWNlPFQ+LFxuICAgIHB1YmxpYyBleHBhbmRTZXJ2aWNlOiBFeHBhbmQsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3MsXG4gICAgaW5qZWN0b3I6IEluamVjdG9yXG4gICkge1xuICAgIGlmICh0aGlzLmZlYXR1cmVzU2VydmljZS5yZWN1cnNpb24pIHtcbiAgICAgIC8vIEknbSBjb21wbGV0ZWx5IHN0dWNrLCB3ZSBoYXZlIHRvIGhhY2sgaW50byBwcml2YXRlIHByb3BlcnRpZXMgdW50aWwgZWl0aGVyXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNDkzNSBvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNTk5OFxuICAgICAgLy8gYXJlIGZpeGVkXG4gICAgICB0aGlzLl9tb2RlbCA9ICg8YW55PmluamVjdG9yKS52aWV3LmNvbnRleHQuY2xyTW9kZWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZvcmNlIGNhc3QgZm9yIG5vdywgbm90IHN1cmUgaG93IHRvIHRpZSB0aGUgY29ycmVjdCB0eXBlIGhlcmUgdG8gZmVhdHVyZXNTZXJ2aWNlLnJlY3Vyc2lvblxuICAgICAgdGhpcy5fbW9kZWwgPSBuZXcgRGVjbGFyYXRpdmVUcmVlTm9kZU1vZGVsKHBhcmVudCA/IDxEZWNsYXJhdGl2ZVRyZWVOb2RlTW9kZWw8VD4+cGFyZW50Ll9tb2RlbCA6IG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIF9tb2RlbDogVHJlZU5vZGVNb2RlbDxUPjtcblxuICBpc0V4cGFuZGFibGUoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmV4cGFuZGFibGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5leHBhbmRhYmxlO1xuICAgIH1cbiAgICByZXR1cm4gISF0aGlzLmV4cGFuZFNlcnZpY2UuZXhwYW5kYWJsZSB8fCB0aGlzLl9tb2RlbC5jaGlsZHJlbi5sZW5ndGggPiAwO1xuICB9XG5cbiAgQElucHV0KCdjbHJTZWxlY3RlZCcpXG4gIGdldCBzZWxlY3RlZCgpOiBDbHJTZWxlY3RlZFN0YXRlIHwgYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLnNlbGVjdGVkLnZhbHVlO1xuICB9XG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogQ2xyU2VsZWN0ZWRTdGF0ZSB8IGJvb2xlYW4pIHtcbiAgICB0aGlzLmZlYXR1cmVzU2VydmljZS5zZWxlY3RhYmxlID0gdHJ1ZTtcbiAgICAvLyBHcmFjZWZ1bGx5IGhhbmRsZSBmYWxzeSBzdGF0ZXMgbGlrZSBudWxsIG9yIHVuZGVmaW5lZCBiZWNhdXNlIGl0J3MganVzdCBlYXNpZXIgdGhhbiBhbnN3ZXJpbmcgcXVlc3Rpb25zLlxuICAgIC8vIFRoaXMgc2hvdWxkbid0IGhhcHBlbiB3aXRoIHN0cmljdCB0eXBpbmcgb24gdGhlIGFwcCdzIHNpZGUsIGJ1dCBpdCdzIG5vdCB1cCB0byB1cy5cbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFsdWUgPSBDbHJTZWxlY3RlZFN0YXRlLlVOU0VMRUNURUQ7XG4gICAgfVxuICAgIC8vIFdlIG1hdGNoIGJvb2xlYW5zIHRvIHRoZSBjb3JyZXNwb25kaW5nIENsclNlbGVjdGVkU3RhdGVcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUgPyBDbHJTZWxlY3RlZFN0YXRlLlNFTEVDVEVEIDogQ2xyU2VsZWN0ZWRTdGF0ZS5VTlNFTEVDVEVEO1xuICAgIH1cbiAgICAvLyBXZSBwcm9wYWdhdGUgb25seSBpZiB0aGUgdHJlZSBpcyBpbiBzbWFydCBtb2RlLCBhbmQgc2tpcCBlbWl0dGluZyB0aGUgb3V0cHV0IHdoZW4gd2Ugc2V0IHRoZSBpbnB1dFxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdm13YXJlL2NsYXJpdHkvaXNzdWVzLzMwNzNcbiAgICB0aGlzLnNraXBFbWl0Q2hhbmdlID0gdHJ1ZTtcbiAgICB0aGlzLl9tb2RlbC5zZXRTZWxlY3RlZCh2YWx1ZSwgdGhpcy5mZWF0dXJlc1NlcnZpY2UuZWFnZXIsIHRoaXMuZmVhdHVyZXNTZXJ2aWNlLmVhZ2VyKTtcbiAgICB0aGlzLnNraXBFbWl0Q2hhbmdlID0gZmFsc2U7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJTZWxlY3RlZENoYW5nZScpIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDbHJTZWxlY3RlZFN0YXRlPihmYWxzZSk7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBnZXQgdHJlZU5vZGVSb2xlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLnBhcmVudCA/ICd0cmVlaXRlbScgOiAndHJlZSc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1tdWx0aXNlbGVjdGFibGUnKVxuICBnZXQgcm9vdEFyaWFNdWx0aVNlbGVjdGFibGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX21vZGVsLnBhcmVudCB8fCAhdGhpcy5mZWF0dXJlc1NlcnZpY2Uuc2VsZWN0YWJsZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXNlbGVjdGVkJylcbiAgZ2V0IGFyaWFTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5mZWF0dXJlc1NlcnZpY2Uuc2VsZWN0YWJsZSA/IHRoaXMuX21vZGVsLnNlbGVjdGVkLnZhbHVlID09PSBDbHJTZWxlY3RlZFN0YXRlLlNFTEVDVEVEIDogbnVsbDtcbiAgfVxuXG4gIC8vIEFsbG93cyB0aGUgY29uc3VtZXIgdG8gb3ZlcnJpZGUgb3VyIGxvZ2ljIGRlY2lkaW5nIGlmIGEgbm9kZSBpcyBleHBhbmRhYmxlLlxuICAvLyBVc2VmdWwgZm9yIHJlY3Vyc2l2ZSB0cmVlcyB0aGF0IGRvbid0IHdhbnQgdG8gcHJlLWxvYWQgb25lIGxldmVsIGFoZWFkIGp1c3QgdG8ga25vdyB3aGljaCBub2RlcyBhcmUgZXhwYW5kYWJsZS5cbiAgQElucHV0KCdjbHJFeHBhbmRhYmxlJykgZXhwYW5kYWJsZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAvLyBJJ20gY2F2aW5nIG9uIHRoaXMsIGZvciB0cmVlIG5vZGVzIEkgdGhpbmsgd2UgY2FuIHRvbGVyYXRlIGhhdmluZyBhIHR3by13YXkgYmluZGluZyBvbiB0aGUgY29tcG9uZW50XG4gIC8vIHJhdGhlciB0aGFuIGVuZm9yY2UgdGhlIGNscklmRXhwYW5kZWQgc3RydWN0dXJhbCBkaXJlY3RpdmUgZm9yIGR5bmFtaWMgY2FzZXMuIE1vc3RseSBiZWNhdXNlIGZvciB0aGUgc21hcnRcbiAgLy8gY2FzZSwgeW91IGNhbid0IHVzZSBhIHN0cnVjdHVyYWwgZGlyZWN0aXZlLCBpdCB3b3VsZCBuZWVkIHRvIGdvIG9uIGFuIG5nLWNvbnRhaW5lci5cbiAgQElucHV0KCdjbHJFeHBhbmRlZCcpXG4gIGdldCBleHBhbmRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbmRTZXJ2aWNlLmV4cGFuZGVkO1xuICB9XG4gIHNldCBleHBhbmRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZXhwYW5kU2VydmljZS5leHBhbmRlZCA9IHZhbHVlO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyRXhwYW5kZWRDaGFuZ2UnKSBleHBhbmRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLl9tb2RlbC5zZWxlY3RlZC5waXBlKGZpbHRlcigoKSA9PiAhdGhpcy5za2lwRW1pdENoYW5nZSkpLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodmFsdWUpKVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5leHBhbmRTZXJ2aWNlLmV4cGFuZENoYW5nZS5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5leHBhbmRlZENoYW5nZS5lbWl0KHZhbHVlKSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fbW9kZWwuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==