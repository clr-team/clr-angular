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
        return !!this.expandService.expandable || (this._model.children && this._model.children.length > 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS90cmVlLXZpZXcvdHJlZS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7OztBQW9CdEYsTUFBTSxPQUFPLFdBQVc7Ozs7Ozs7OztJQUl0QixZQUM0QixNQUFjLEVBR3hDLE1BQXNCLEVBQ2YsZUFBdUMsRUFDdkMsYUFBOEIsRUFDOUIsYUFBK0IsRUFDdEMsUUFBa0I7UUFQUSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSWpDLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtRQUN2QyxrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBVnhDLFdBQU0sR0FBRyxnQkFBZ0IsQ0FBQztRQUNsQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQXNERixtQkFBYyxHQUFHLElBQUksWUFBWSxDQUFtQixLQUFLLENBQUMsQ0FBQztRQW9DM0QsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBRWxFLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQWhGekMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRTtZQUNsQyw2RUFBNkU7WUFDN0UscUdBQXFHO1lBQ3JHLFlBQVk7WUFDWixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsbUJBQUssUUFBUSxFQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztTQUNyRDthQUFNO1lBQ0wsNkZBQTZGO1lBQzdGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLG1CQUE2QixNQUFNLENBQUMsTUFBTSxFQUFBLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hHO0lBQ0gsQ0FBQzs7OztJQUlELFlBQVk7UUFDVixJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxXQUFXLEVBQUU7WUFDMUMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEcsQ0FBQzs7OztJQUVELElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBaUM7UUFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZDLDJHQUEyRztRQUMzRyxxRkFBcUY7UUFDckYsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFdBQVcsRUFBRTtZQUNsRCxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDO1NBQ3JDO1FBQ0QsMERBQTBEO1FBQzFELElBQUksT0FBTyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQzlCLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDO1NBQ3pFO1FBQ0QscUdBQXFHO1FBQ3JHLG9EQUFvRDtRQUNwRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDOzs7O0lBSUQsSUFDSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDbEQsQ0FBQzs7OztJQUVELElBQ0ksdUJBQXVCO1FBQ3pCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRTtZQUMxRCxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQzs7OztJQUVELElBQ0ksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMzRyxDQUFDOzs7Ozs7O0lBU0QsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFNRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQ2xILENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxTQUFTOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDL0csQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFDLENBQUM7SUFDdkQsQ0FBQzs7O1lBNUhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsaTVEQUErQjtnQkFDL0IsU0FBUyxFQUFFO29CQUNULGtCQUFrQjtvQkFDbEIsc0JBQXNCO29CQUN0QixlQUFlO29CQUNmLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO2lCQUMzRDtnQkFDRCxVQUFVLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLGlCQUFpQixFQUFFO3dCQUN6QixLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7d0JBQ2pFLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDaEUsVUFBVSxDQUFDLHdCQUF3QixFQUFFLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3FCQUNsRSxDQUFDO2lCQUNIO2dCQUNELElBQUksRUFBRSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sRUFBRTthQUMxQzs7Ozt5Q0FNSSxNQUFNLFNBQUMsU0FBUztZQUdULFdBQVcsdUJBRmxCLFFBQVEsWUFDUixRQUFRO1lBM0JvQixtQkFBbUI7WUFQM0MsZUFBZTtZQUNmLGdCQUFnQjtZQVp2QixRQUFROzs7dUJBd0VQLEtBQUssU0FBQyxhQUFhOzZCQXNCbkIsTUFBTSxTQUFDLG1CQUFtQjsyQkFFMUIsV0FBVyxTQUFDLFdBQVc7c0NBS3ZCLFdBQVcsU0FBQywyQkFBMkI7MkJBU3ZDLFdBQVcsU0FBQyxvQkFBb0I7eUJBT2hDLEtBQUssU0FBQyxlQUFlO3VCQUtyQixLQUFLLFNBQUMsYUFBYTs2QkFRbkIsTUFBTSxTQUFDLG1CQUFtQjs7OztJQTNGM0IsNkJBQTBCOzs7OztJQUMxQixxQ0FBK0I7O0lBdUIvQiw2QkFBeUI7O0lBK0J6QixxQ0FBd0Y7O0lBdUJ4RixpQ0FBd0Q7O0lBYXhELHFDQUEwRTs7Ozs7SUFFMUUsb0NBQTJDOztJQXpGekMsNkJBQXdDOztJQUl4QyxzQ0FBOEM7O0lBQzlDLG9DQUFxQzs7SUFDckMsb0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTa2lwU2VsZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgSWZFeHBhbmRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtZXhwYW5kZWQuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVU5JUVVFX0lELCBVTklRVUVfSURfUFJPVklERVIgfSBmcm9tICcuLi8uLi91dGlscy9pZC1nZW5lcmF0b3IvaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9hZGluZ0xpc3RlbmVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9hZGluZy9sb2FkaW5nLWxpc3RlbmVyJztcbmltcG9ydCB7IERlY2xhcmF0aXZlVHJlZU5vZGVNb2RlbCB9IGZyb20gJy4vbW9kZWxzL2RlY2xhcmF0aXZlLXRyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBDbHJTZWxlY3RlZFN0YXRlIH0gZnJvbSAnLi9tb2RlbHMvc2VsZWN0ZWQtc3RhdGUuZW51bSc7XG5pbXBvcnQgeyBUcmVlTm9kZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IFRSRUVfRkVBVFVSRVNfUFJPVklERVIsIFRyZWVGZWF0dXJlc1NlcnZpY2UgfSBmcm9tICcuL3RyZWUtZmVhdHVyZXMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci10cmVlLW5vZGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vdHJlZS1ub2RlLmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICBVTklRVUVfSURfUFJPVklERVIsXG4gICAgVFJFRV9GRUFUVVJFU19QUk9WSURFUixcbiAgICBJZkV4cGFuZFNlcnZpY2UsXG4gICAgeyBwcm92aWRlOiBMb2FkaW5nTGlzdGVuZXIsIHVzZUV4aXN0aW5nOiBJZkV4cGFuZFNlcnZpY2UgfSxcbiAgXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2NoaWxkTm9kZXNTdGF0ZScsIFtcbiAgICAgIHN0YXRlKCdleHBhbmRlZCcsIHN0eWxlKHsgaGVpZ2h0OiAnKicsICdvdmVyZmxvdy15JzogJ2hpZGRlbicgfSkpLFxuICAgICAgc3RhdGUoJ2NvbGxhcHNlZCcsIHN0eWxlKHsgaGVpZ2h0OiAwLCAnb3ZlcmZsb3cteSc6ICdoaWRkZW4nIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ2V4cGFuZGVkIDw9PiBjb2xsYXBzZWQnLCBhbmltYXRlKCcwLjJzIGVhc2UtaW4tb3V0JykpLFxuICAgIF0pLFxuICBdLFxuICBob3N0OiB7ICdbY2xhc3MuY2xyLXRyZWUtbm9kZV0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyVHJlZU5vZGU8VD4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIFNUQVRFUyA9IENsclNlbGVjdGVkU3RhdGU7XG4gIHByaXZhdGUgc2tpcEVtaXRDaGFuZ2UgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFVOSVFVRV9JRCkgcHVibGljIG5vZGVJZDogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQFNraXBTZWxmKClcbiAgICBwYXJlbnQ6IENsclRyZWVOb2RlPFQ+LFxuICAgIHB1YmxpYyBmZWF0dXJlc1NlcnZpY2U6IFRyZWVGZWF0dXJlc1NlcnZpY2U8VD4sXG4gICAgcHVibGljIGV4cGFuZFNlcnZpY2U6IElmRXhwYW5kU2VydmljZSxcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5ncyxcbiAgICBpbmplY3RvcjogSW5qZWN0b3JcbiAgKSB7XG4gICAgaWYgKHRoaXMuZmVhdHVyZXNTZXJ2aWNlLnJlY3Vyc2lvbikge1xuICAgICAgLy8gSSdtIGNvbXBsZXRlbHkgc3R1Y2ssIHdlIGhhdmUgdG8gaGFjayBpbnRvIHByaXZhdGUgcHJvcGVydGllcyB1bnRpbCBlaXRoZXJcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE0OTM1IG9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE1OTk4XG4gICAgICAvLyBhcmUgZml4ZWRcbiAgICAgIHRoaXMuX21vZGVsID0gKDxhbnk+aW5qZWN0b3IpLnZpZXcuY29udGV4dC5jbHJNb2RlbDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRm9yY2UgY2FzdCBmb3Igbm93LCBub3Qgc3VyZSBob3cgdG8gdGllIHRoZSBjb3JyZWN0IHR5cGUgaGVyZSB0byBmZWF0dXJlc1NlcnZpY2UucmVjdXJzaW9uXG4gICAgICB0aGlzLl9tb2RlbCA9IG5ldyBEZWNsYXJhdGl2ZVRyZWVOb2RlTW9kZWwocGFyZW50ID8gPERlY2xhcmF0aXZlVHJlZU5vZGVNb2RlbDxUPj5wYXJlbnQuX21vZGVsIDogbnVsbCk7XG4gICAgfVxuICB9XG5cbiAgX21vZGVsOiBUcmVlTm9kZU1vZGVsPFQ+O1xuXG4gIGlzRXhwYW5kYWJsZSgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuZXhwYW5kYWJsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmV4cGFuZGFibGU7XG4gICAgfVxuICAgIHJldHVybiAhIXRoaXMuZXhwYW5kU2VydmljZS5leHBhbmRhYmxlIHx8ICh0aGlzLl9tb2RlbC5jaGlsZHJlbiAmJiB0aGlzLl9tb2RlbC5jaGlsZHJlbi5sZW5ndGggPiAwKTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyU2VsZWN0ZWQnKVxuICBnZXQgc2VsZWN0ZWQoKTogQ2xyU2VsZWN0ZWRTdGF0ZSB8IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5zZWxlY3RlZC52YWx1ZTtcbiAgfVxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IENsclNlbGVjdGVkU3RhdGUgfCBib29sZWFuKSB7XG4gICAgdGhpcy5mZWF0dXJlc1NlcnZpY2Uuc2VsZWN0YWJsZSA9IHRydWU7XG4gICAgLy8gR3JhY2VmdWxseSBoYW5kbGUgZmFsc3kgc3RhdGVzIGxpa2UgbnVsbCBvciB1bmRlZmluZWQgYmVjYXVzZSBpdCdzIGp1c3QgZWFzaWVyIHRoYW4gYW5zd2VyaW5nIHF1ZXN0aW9ucy5cbiAgICAvLyBUaGlzIHNob3VsZG4ndCBoYXBwZW4gd2l0aCBzdHJpY3QgdHlwaW5nIG9uIHRoZSBhcHAncyBzaWRlLCBidXQgaXQncyBub3QgdXAgdG8gdXMuXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhbHVlID0gQ2xyU2VsZWN0ZWRTdGF0ZS5VTlNFTEVDVEVEO1xuICAgIH1cbiAgICAvLyBXZSBtYXRjaCBib29sZWFucyB0byB0aGUgY29ycmVzcG9uZGluZyBDbHJTZWxlY3RlZFN0YXRlXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlID8gQ2xyU2VsZWN0ZWRTdGF0ZS5TRUxFQ1RFRCA6IENsclNlbGVjdGVkU3RhdGUuVU5TRUxFQ1RFRDtcbiAgICB9XG4gICAgLy8gV2UgcHJvcGFnYXRlIG9ubHkgaWYgdGhlIHRyZWUgaXMgaW4gc21hcnQgbW9kZSwgYW5kIHNraXAgZW1pdHRpbmcgdGhlIG91dHB1dCB3aGVuIHdlIHNldCB0aGUgaW5wdXRcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3Ztd2FyZS9jbGFyaXR5L2lzc3Vlcy8zMDczXG4gICAgdGhpcy5za2lwRW1pdENoYW5nZSA9IHRydWU7XG4gICAgdGhpcy5fbW9kZWwuc2V0U2VsZWN0ZWQodmFsdWUsIHRoaXMuZmVhdHVyZXNTZXJ2aWNlLmVhZ2VyLCB0aGlzLmZlYXR1cmVzU2VydmljZS5lYWdlcik7XG4gICAgdGhpcy5za2lwRW1pdENoYW5nZSA9IGZhbHNlO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyU2VsZWN0ZWRDaGFuZ2UnKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xyU2VsZWN0ZWRTdGF0ZT4oZmFsc2UpO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgZ2V0IHRyZWVOb2RlUm9sZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5wYXJlbnQgPyAndHJlZWl0ZW0nIDogJ3RyZWUnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbXVsdGlzZWxlY3RhYmxlJylcbiAgZ2V0IHJvb3RBcmlhTXVsdGlTZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9tb2RlbC5wYXJlbnQgfHwgIXRoaXMuZmVhdHVyZXNTZXJ2aWNlLnNlbGVjdGFibGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1zZWxlY3RlZCcpXG4gIGdldCBhcmlhU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZmVhdHVyZXNTZXJ2aWNlLnNlbGVjdGFibGUgPyB0aGlzLl9tb2RlbC5zZWxlY3RlZC52YWx1ZSA9PT0gQ2xyU2VsZWN0ZWRTdGF0ZS5TRUxFQ1RFRCA6IG51bGw7XG4gIH1cblxuICAvLyBBbGxvd3MgdGhlIGNvbnN1bWVyIHRvIG92ZXJyaWRlIG91ciBsb2dpYyBkZWNpZGluZyBpZiBhIG5vZGUgaXMgZXhwYW5kYWJsZS5cbiAgLy8gVXNlZnVsIGZvciByZWN1cnNpdmUgdHJlZXMgdGhhdCBkb24ndCB3YW50IHRvIHByZS1sb2FkIG9uZSBsZXZlbCBhaGVhZCBqdXN0IHRvIGtub3cgd2hpY2ggbm9kZXMgYXJlIGV4cGFuZGFibGUuXG4gIEBJbnB1dCgnY2xyRXhwYW5kYWJsZScpIGV4cGFuZGFibGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgLy8gSSdtIGNhdmluZyBvbiB0aGlzLCBmb3IgdHJlZSBub2RlcyBJIHRoaW5rIHdlIGNhbiB0b2xlcmF0ZSBoYXZpbmcgYSB0d28td2F5IGJpbmRpbmcgb24gdGhlIGNvbXBvbmVudFxuICAvLyByYXRoZXIgdGhhbiBlbmZvcmNlIHRoZSBjbHJJZkV4cGFuZGVkIHN0cnVjdHVyYWwgZGlyZWN0aXZlIGZvciBkeW5hbWljIGNhc2VzLiBNb3N0bHkgYmVjYXVzZSBmb3IgdGhlIHNtYXJ0XG4gIC8vIGNhc2UsIHlvdSBjYW4ndCB1c2UgYSBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZSwgaXQgd291bGQgbmVlZCB0byBnbyBvbiBhbiBuZy1jb250YWluZXIuXG4gIEBJbnB1dCgnY2xyRXhwYW5kZWQnKVxuICBnZXQgZXhwYW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kU2VydmljZS5leHBhbmRlZDtcbiAgfVxuICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmV4cGFuZFNlcnZpY2UuZXhwYW5kZWQgPSB2YWx1ZTtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckV4cGFuZGVkQ2hhbmdlJykgZXhwYW5kZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5fbW9kZWwuc2VsZWN0ZWQucGlwZShmaWx0ZXIoKCkgPT4gIXRoaXMuc2tpcEVtaXRDaGFuZ2UpKS5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHZhbHVlKSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuZXhwYW5kU2VydmljZS5leHBhbmRDaGFuZ2Uuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMuZXhwYW5kZWRDaGFuZ2UuZW1pdCh2YWx1ZSkpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX21vZGVsLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=