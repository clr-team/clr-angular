/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Inject, Input, Optional, Output, SkipSelf, } from '@angular/core';
import { Expand } from '../../utils/expand/providers/expand';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';
import { LoadingListener } from '../../utils/loading/loading-listener';
import { AbstractTreeSelection } from './abstract-tree-selection';
import { clrTreeSelectionProviderFactory } from './providers/tree-selection.provider';
import { TreeSelectionService } from './providers/tree-selection.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
const ɵ0 = clrTreeSelectionProviderFactory;
export class ClrTreeNode extends AbstractTreeSelection {
    /**
     * @param {?} nodeExpand
     * @param {?} parent
     * @param {?} treeSelectionService
     * @param {?} nodeId
     * @param {?} commonStrings
     */
    constructor(nodeExpand, parent, treeSelectionService, nodeId, commonStrings) {
        super(parent);
        this.nodeExpand = nodeExpand;
        this.parent = parent;
        this.treeSelectionService = treeSelectionService;
        this.nodeId = nodeId;
        this.commonStrings = commonStrings;
        this._children = [];
        this.nodeSelectedChange = new EventEmitter(true);
        this.nodeIndeterminateChanged = new EventEmitter(true);
        if (this.parent) {
            this.parent.register(this);
        }
    }
    /**
     * @return {?}
     */
    get children() {
        return this._children;
    }
    /* Registration */
    /**
     * @param {?} node
     * @return {?}
     */
    checkIfChildNodeRegistered(node) {
        return this.children.indexOf(node) > -1;
    }
    // TODO: This should ideally be in AbstractTreeSelection
    // Tried doing this but ran into some issues and also ran out of time.
    // Will get this done later.
    /**
     * @param {?} node
     * @return {?}
     */
    register(node) {
        if (!this.checkIfChildNodeRegistered(node)) {
            this.children.push(node);
            if (this.selectable) {
                if (this.selected) {
                    node.parentChanged(this.selected);
                }
            }
        }
    }
    // TODO: This should ideally be in AbstractTreeSelection
    // Tried doing this but ran into some issues and also ran out of time.
    // Will get this done later.
    /**
     * @param {?} node
     * @return {?}
     */
    unregister(node) {
        /** @type {?} */
        const index = this.children.indexOf(node);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }
    /* Selection */
    /**
     * @return {?}
     */
    activateSelection() {
        if (this.treeSelectionService && !this.treeSelectionService.selectable) {
            this.treeSelectionService.selectable = true;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nodeSelected(value) {
        // required for recursive trees to discard unset inputs.
        this.activateSelection();
        if (value === undefined || value === null) {
            return;
        }
        if (this.selected !== value) {
            this.selected = value;
        }
    }
    /**
     * @return {?}
     */
    selectedChanged() {
        this.nodeSelectedChange.emit(this.selected);
    }
    /**
     * @return {?}
     */
    get selectable() {
        if (this.treeSelectionService) {
            return this.treeSelectionService.selectable;
        }
        return false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nodeIndeterminate(value) {
        this.indeterminate = value;
        this.activateSelection();
    }
    /**
     * @return {?}
     */
    indeterminateChanged() {
        this.nodeIndeterminateChanged.emit(this.indeterminate);
    }
    /* Expansion */
    /**
     * @return {?}
     */
    toggleExpand() {
        this.nodeExpand.expanded = !this.nodeExpand.expanded;
    }
    /**
     * @return {?}
     */
    get caretDirection() {
        return this.nodeExpand.expanded ? 'down' : 'right';
    }
    /**
     * @return {?}
     */
    get caretTitle() {
        return this.nodeExpand.expanded ? this.commonStrings.collapse : this.commonStrings.expand;
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this.nodeExpand.expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        value = !!value;
        if (this.nodeExpand.expanded !== value) {
            this.nodeExpand.expanded = value;
        }
    }
    /**
     * @return {?}
     */
    get state() {
        return this.expanded && !this.nodeExpand.loading ? 'expanded' : 'collapsed';
    }
    /**
     * @return {?}
     */
    get treeNodeRole() {
        return this.parent ? 'treeitem' : 'tree';
    }
    /**
     * @return {?}
     */
    get rootAriaMultiSelectable() {
        if (this.parent || !this.selectable) {
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
        return this.selectable ? this.selected : null;
    }
    /**
     * @return {?}
     */
    get ariaTreeNodeChildrenRole() {
        return this.children.length > 0 ? 'group' : null;
    }
    /* Lifecycle */
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.parent) {
            this.parent.unregister(this);
        }
    }
}
ClrTreeNode.decorators = [
    { type: Component, args: [{
                selector: 'clr-tree-node',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"clr-tree-node-content-container\">\n    <button\n        type=\"button\"\n        class=\"clr-treenode-caret\"\n        (click)=\"toggleExpand()\"\n        *ngIf=\"nodeExpand.expandable && !nodeExpand.loading\"\n        [attr.aria-expanded]=\"nodeExpand.expanded\">\n        <clr-icon\n            class=\"clr-treenode-caret-icon\"\n            shape=\"caret\"\n            [attr.dir]=\"caretDirection\"\n            [attr.title]=\"caretTitle\"></clr-icon>\n    </button>\n    <div class=\"clr-treenode-spinner-container\" *ngIf=\"nodeExpand.expandable && nodeExpand.loading\">\n        <span class=\"clr-treenode-spinner spinner\">\n            Loading...\n        </span>\n    </div>\n    <!-- TODO: Move this to new checkboxes. But the indeterminate two-way binding makes it hard. -->\n    <clr-checkbox\n        class=\"clr-treenode-checkbox\"\n        *ngIf=\"selectable\"\n        [(ngModel)]=\"selected\"\n        [(clrIndeterminate)]=\"indeterminate\"\n        [clrAriaLabeledBy]=\"nodeId\"></clr-checkbox>\n    <div class=\"clr-treenode-content\" [id]=\"nodeId\">\n        <ng-content></ng-content>\n    </div>\n</div>\n<!-- FIXME: remove this string concatenation when boolean states are supported -->\n<div\n    class=\"clr-treenode-children\"\n    [@childNodesState]=\"state\"\n    [attr.role]=\"ariaTreeNodeChildrenRole\">\n    <ng-content select=\"clr-tree-node\"></ng-content>\n    <ng-content select=\"[clrIfExpanded]\"></ng-content>\n</div>\n",
                providers: [
                    Expand,
                    { provide: LoadingListener, useExisting: Expand },
                    {
                        provide: TreeSelectionService,
                        useFactory: ɵ0,
                        deps: [[new Optional(), new SkipSelf(), TreeSelectionService]],
                    },
                    UNIQUE_ID_PROVIDER,
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
    { type: Expand },
    { type: ClrTreeNode, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: TreeSelectionService },
    { type: String, decorators: [{ type: Inject, args: [UNIQUE_ID,] }] },
    { type: ClrCommonStrings }
];
ClrTreeNode.propDecorators = {
    nodeSelected: [{ type: Input, args: ['clrSelected',] }],
    nodeSelectedChange: [{ type: Output, args: ['clrSelectedChange',] }],
    nodeIndeterminate: [{ type: Input, args: ['clrIndeterminate',] }],
    nodeIndeterminateChanged: [{ type: Output, args: ['clrIndeterminateChange',] }],
    treeNodeRole: [{ type: HostBinding, args: ['attr.role',] }],
    rootAriaMultiSelectable: [{ type: HostBinding, args: ['attr.aria-multiselectable',] }],
    ariaSelected: [{ type: HostBinding, args: ['attr.aria-selected',] }]
};
if (false) {
    /** @type {?} */
    ClrTreeNode.prototype._children;
    /** @type {?} */
    ClrTreeNode.prototype.nodeSelectedChange;
    /** @type {?} */
    ClrTreeNode.prototype.nodeIndeterminateChanged;
    /** @type {?} */
    ClrTreeNode.prototype.nodeExpand;
    /** @type {?} */
    ClrTreeNode.prototype.parent;
    /** @type {?} */
    ClrTreeNode.prototype.treeSelectionService;
    /** @type {?} */
    ClrTreeNode.prototype.nodeId;
    /** @type {?} */
    ClrTreeNode.prototype.commonStrings;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS90cmVlLXZpZXcvdHJlZS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFdkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDdEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7V0FVM0QsK0JBQStCO0FBY2pELE1BQU0sT0FBTyxXQUFZLFNBQVEscUJBQXFCOzs7Ozs7OztJQUNwRCxZQUNTLFVBQWtCLEVBR2xCLE1BQW1CLEVBQ25CLG9CQUEwQyxFQUN2QixNQUFjLEVBQ2pDLGFBQStCO1FBRXRDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQVJQLGVBQVUsR0FBVixVQUFVLENBQVE7UUFHbEIsV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQUNuQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQ3ZCLFdBQU0s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QkFDbEUsQ0FBQztpQkFDSDtnQkFDRCxJQUFJLEVBQUUsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLEVBQUU7YUFDMUM7Ozs7WUE5QlEsTUFBTTtZQW9DSSxXQUFXLHVCQUZ6QixRQUFRLFlBQ1IsUUFBUTtZQTdCSixvQkFBb0I7eUNBZ0N4QixNQUFNLFNBQUMsU0FBUztZQS9CWixnQkFBZ0I7OzsyQkFvRnRCLEtBQUssU0FBQyxhQUFhO2lDQVluQixNQUFNLFNBQUMsbUJBQW1CO2dDQWExQixLQUFLLFNBQUMsa0JBQWtCO3VDQU14QixNQUFNLFNBQUMsd0JBQXdCOzJCQW1DL0IsV0FBVyxTQUFDLFdBQVc7c0NBS3ZCLFdBQVcsU0FBQywyQkFBMkI7MkJBU3ZDLFdBQVcsU0FBQyxvQkFBb0I7Ozs7SUE1SGpDLGdDQUFzQzs7SUF3RHRDLHlDQUF5Rzs7SUFtQnpHLCtDQUFvSDs7SUF6RmxILGlDQUF5Qjs7SUFDekIsNkJBRTBCOztJQUMxQiwyQ0FBaUQ7O0lBQ2pELDZCQUF3Qzs7SUFDeEMsb0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTa2lwU2VsZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEV4cGFuZCB9IGZyb20gJy4uLy4uL3V0aWxzL2V4cGFuZC9wcm92aWRlcnMvZXhwYW5kJztcbmltcG9ydCB7IFVOSVFVRV9JRCwgVU5JUVVFX0lEX1BST1ZJREVSIH0gZnJvbSAnLi4vLi4vdXRpbHMvaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IExvYWRpbmdMaXN0ZW5lciB9IGZyb20gJy4uLy4uL3V0aWxzL2xvYWRpbmcvbG9hZGluZy1saXN0ZW5lcic7XG5cbmltcG9ydCB7IEFic3RyYWN0VHJlZVNlbGVjdGlvbiB9IGZyb20gJy4vYWJzdHJhY3QtdHJlZS1zZWxlY3Rpb24nO1xuaW1wb3J0IHsgY2xyVHJlZVNlbGVjdGlvblByb3ZpZGVyRmFjdG9yeSB9IGZyb20gJy4vcHJvdmlkZXJzL3RyZWUtc2VsZWN0aW9uLnByb3ZpZGVyJztcbmltcG9ydCB7IFRyZWVTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdHJlZS1zZWxlY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItdHJlZS1ub2RlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RyZWUtbm9kZS5odG1sJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRXhwYW5kLFxuICAgIHsgcHJvdmlkZTogTG9hZGluZ0xpc3RlbmVyLCB1c2VFeGlzdGluZzogRXhwYW5kIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogVHJlZVNlbGVjdGlvblNlcnZpY2UsXG4gICAgICB1c2VGYWN0b3J5OiBjbHJUcmVlU2VsZWN0aW9uUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgZGVwczogW1tuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCksIFRyZWVTZWxlY3Rpb25TZXJ2aWNlXV0sXG4gICAgfSxcbiAgICBVTklRVUVfSURfUFJPVklERVIsXG4gIF0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdjaGlsZE5vZGVzU3RhdGUnLCBbXG4gICAgICBzdGF0ZSgnZXhwYW5kZWQnLCBzdHlsZSh7IGhlaWdodDogJyonLCAnb3ZlcmZsb3cteSc6ICdoaWRkZW4nIH0pKSxcbiAgICAgIHN0YXRlKCdjb2xsYXBzZWQnLCBzdHlsZSh7IGhlaWdodDogMCwgJ292ZXJmbG93LXknOiAnaGlkZGVuJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKCdleHBhbmRlZCA8PT4gY29sbGFwc2VkJywgYW5pbWF0ZSgnMC4ycyBlYXNlLWluLW91dCcpKSxcbiAgICBdKSxcbiAgXSxcbiAgaG9zdDogeyAnW2NsYXNzLmNsci10cmVlLW5vZGVdJzogJ3RydWUnIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsclRyZWVOb2RlIGV4dGVuZHMgQWJzdHJhY3RUcmVlU2VsZWN0aW9uIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5vZGVFeHBhbmQ6IEV4cGFuZCxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBTa2lwU2VsZigpXG4gICAgcHVibGljIHBhcmVudDogQ2xyVHJlZU5vZGUsXG4gICAgcHVibGljIHRyZWVTZWxlY3Rpb25TZXJ2aWNlOiBUcmVlU2VsZWN0aW9uU2VydmljZSxcbiAgICBASW5qZWN0KFVOSVFVRV9JRCkgcHVibGljIG5vZGVJZDogc3RyaW5nLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge1xuICAgIHN1cGVyKHBhcmVudCk7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudC5yZWdpc3Rlcih0aGlzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jaGlsZHJlbjogQ2xyVHJlZU5vZGVbXSA9IFtdO1xuXG4gIGdldCBjaGlsZHJlbigpOiBDbHJUcmVlTm9kZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gIH1cblxuICAvKiBSZWdpc3RyYXRpb24gKi9cblxuICBjaGVja0lmQ2hpbGROb2RlUmVnaXN0ZXJlZChub2RlOiBDbHJUcmVlTm9kZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmluZGV4T2Yobm9kZSkgPiAtMTtcbiAgfVxuXG4gIC8vIFRPRE86IFRoaXMgc2hvdWxkIGlkZWFsbHkgYmUgaW4gQWJzdHJhY3RUcmVlU2VsZWN0aW9uXG4gIC8vIFRyaWVkIGRvaW5nIHRoaXMgYnV0IHJhbiBpbnRvIHNvbWUgaXNzdWVzIGFuZCBhbHNvIHJhbiBvdXQgb2YgdGltZS5cbiAgLy8gV2lsbCBnZXQgdGhpcyBkb25lIGxhdGVyLlxuICByZWdpc3Rlcihub2RlOiBDbHJUcmVlTm9kZSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jaGVja0lmQ2hpbGROb2RlUmVnaXN0ZXJlZChub2RlKSkge1xuICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKG5vZGUpO1xuICAgICAgaWYgKHRoaXMuc2VsZWN0YWJsZSkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgICAgIG5vZGUucGFyZW50Q2hhbmdlZCh0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE86IFRoaXMgc2hvdWxkIGlkZWFsbHkgYmUgaW4gQWJzdHJhY3RUcmVlU2VsZWN0aW9uXG4gIC8vIFRyaWVkIGRvaW5nIHRoaXMgYnV0IHJhbiBpbnRvIHNvbWUgaXNzdWVzIGFuZCBhbHNvIHJhbiBvdXQgb2YgdGltZS5cbiAgLy8gV2lsbCBnZXQgdGhpcyBkb25lIGxhdGVyLlxuICB1bnJlZ2lzdGVyKG5vZGU6IENsclRyZWVOb2RlKTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2Yobm9kZSk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICAvKiBTZWxlY3Rpb24gKi9cblxuICBhY3RpdmF0ZVNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50cmVlU2VsZWN0aW9uU2VydmljZSAmJiAhdGhpcy50cmVlU2VsZWN0aW9uU2VydmljZS5zZWxlY3RhYmxlKSB7XG4gICAgICB0aGlzLnRyZWVTZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdGFibGUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnY2xyU2VsZWN0ZWQnKVxuICBwdWJsaWMgc2V0IG5vZGVTZWxlY3RlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIC8vIHJlcXVpcmVkIGZvciByZWN1cnNpdmUgdHJlZXMgdG8gZGlzY2FyZCB1bnNldCBpbnB1dHMuXG4gICAgdGhpcy5hY3RpdmF0ZVNlbGVjdGlvbigpO1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnNlbGVjdGVkICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsclNlbGVjdGVkQ2hhbmdlJykgbm9kZVNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KHRydWUpO1xuXG4gIHNlbGVjdGVkQ2hhbmdlZCgpOiB2b2lkIHtcbiAgICB0aGlzLm5vZGVTZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWQpO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGFibGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMudHJlZVNlbGVjdGlvblNlcnZpY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnRyZWVTZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdGFibGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xySW5kZXRlcm1pbmF0ZScpXG4gIHNldCBub2RlSW5kZXRlcm1pbmF0ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IHZhbHVlO1xuICAgIHRoaXMuYWN0aXZhdGVTZWxlY3Rpb24oKTtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckluZGV0ZXJtaW5hdGVDaGFuZ2UnKSBub2RlSW5kZXRlcm1pbmF0ZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgaW5kZXRlcm1pbmF0ZUNoYW5nZWQoKTogdm9pZCB7XG4gICAgdGhpcy5ub2RlSW5kZXRlcm1pbmF0ZUNoYW5nZWQuZW1pdCh0aGlzLmluZGV0ZXJtaW5hdGUpO1xuICB9XG5cbiAgLyogRXhwYW5zaW9uICovXG5cbiAgdG9nZ2xlRXhwYW5kKCk6IHZvaWQge1xuICAgIHRoaXMubm9kZUV4cGFuZC5leHBhbmRlZCA9ICF0aGlzLm5vZGVFeHBhbmQuZXhwYW5kZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNhcmV0RGlyZWN0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubm9kZUV4cGFuZC5leHBhbmRlZCA/ICdkb3duJyA6ICdyaWdodCc7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNhcmV0VGl0bGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlRXhwYW5kLmV4cGFuZGVkID8gdGhpcy5jb21tb25TdHJpbmdzLmNvbGxhcHNlIDogdGhpcy5jb21tb25TdHJpbmdzLmV4cGFuZDtcbiAgfVxuXG4gIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlRXhwYW5kLmV4cGFuZGVkO1xuICB9XG5cbiAgc2V0IGV4cGFuZGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSAhIXZhbHVlO1xuICAgIGlmICh0aGlzLm5vZGVFeHBhbmQuZXhwYW5kZWQgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLm5vZGVFeHBhbmQuZXhwYW5kZWQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBnZXQgc3RhdGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbmRlZCAmJiAhdGhpcy5ub2RlRXhwYW5kLmxvYWRpbmcgPyAnZXhwYW5kZWQnIDogJ2NvbGxhcHNlZCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIGdldCB0cmVlTm9kZVJvbGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQgPyAndHJlZWl0ZW0nIDogJ3RyZWUnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbXVsdGlzZWxlY3RhYmxlJylcbiAgZ2V0IHJvb3RBcmlhTXVsdGlTZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnBhcmVudCB8fCAhdGhpcy5zZWxlY3RhYmxlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtc2VsZWN0ZWQnKVxuICBnZXQgYXJpYVNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGFibGUgPyB0aGlzLnNlbGVjdGVkIDogbnVsbDtcbiAgfVxuXG4gIGdldCBhcmlhVHJlZU5vZGVDaGlsZHJlblJvbGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwID8gJ2dyb3VwJyA6IG51bGw7XG4gIH1cblxuICAvKiBMaWZlY3ljbGUgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudC51bnJlZ2lzdGVyKHRoaXMpO1xuICAgIH1cbiAgfVxufVxuIl19