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
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Inject, Input, Optional, Output, SkipSelf, } from '@angular/core';
import { Expand } from '../../utils/expand/providers/expand';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';
import { LoadingListener } from '../../utils/loading/loading-listener';
import { AbstractTreeSelection } from './abstract-tree-selection';
import { clrTreeSelectionProviderFactory } from './providers/tree-selection.provider';
import { TreeSelectionService } from './providers/tree-selection.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
var ɵ0 = clrTreeSelectionProviderFactory;
var ClrTreeNode = /** @class */ (function (_super) {
    tslib_1.__extends(ClrTreeNode, _super);
    function ClrTreeNode(nodeExpand, parent, treeSelectionService, nodeId, commonStrings) {
        var _this = _super.call(this, parent) || this;
        _this.nodeExpand = nodeExpand;
        _this.parent = parent;
        _this.treeSelectionService = treeSelectionService;
        _this.nodeId = nodeId;
        _this.commonStrings = commonStrings;
        _this._children = [];
        _this.nodeSelectedChange = new EventEmitter(true);
        _this.nodeIndeterminateChanged = new EventEmitter(true);
        if (_this.parent) {
            _this.parent.register(_this);
        }
        return _this;
    }
    Object.defineProperty(ClrTreeNode.prototype, "children", {
        get: /**
         * @return {?}
         */
        function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    /* Registration */
    /* Registration */
    /**
     * @param {?} node
     * @return {?}
     */
    ClrTreeNode.prototype.checkIfChildNodeRegistered = /* Registration */
    /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return this.children.indexOf(node) > -1;
    };
    // TODO: This should ideally be in AbstractTreeSelection
    // Tried doing this but ran into some issues and also ran out of time.
    // Will get this done later.
    // TODO: This should ideally be in AbstractTreeSelection
    // Tried doing this but ran into some issues and also ran out of time.
    // Will get this done later.
    /**
     * @param {?} node
     * @return {?}
     */
    ClrTreeNode.prototype.register = 
    // TODO: This should ideally be in AbstractTreeSelection
    // Tried doing this but ran into some issues and also ran out of time.
    // Will get this done later.
    /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        if (!this.checkIfChildNodeRegistered(node)) {
            this.children.push(node);
            if (this.selectable) {
                if (this.selected) {
                    node.parentChanged(this.selected);
                }
            }
        }
    };
    // TODO: This should ideally be in AbstractTreeSelection
    // Tried doing this but ran into some issues and also ran out of time.
    // Will get this done later.
    // TODO: This should ideally be in AbstractTreeSelection
    // Tried doing this but ran into some issues and also ran out of time.
    // Will get this done later.
    /**
     * @param {?} node
     * @return {?}
     */
    ClrTreeNode.prototype.unregister = 
    // TODO: This should ideally be in AbstractTreeSelection
    // Tried doing this but ran into some issues and also ran out of time.
    // Will get this done later.
    /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var index = this.children.indexOf(node);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    };
    /* Selection */
    /* Selection */
    /**
     * @return {?}
     */
    ClrTreeNode.prototype.activateSelection = /* Selection */
    /**
     * @return {?}
     */
    function () {
        if (this.treeSelectionService && !this.treeSelectionService.selectable) {
            this.treeSelectionService.selectable = true;
        }
    };
    Object.defineProperty(ClrTreeNode.prototype, "nodeSelected", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // required for recursive trees to discard unset inputs.
            this.activateSelection();
            if (value === undefined || value === null) {
                return;
            }
            if (this.selected !== value) {
                this.selected = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrTreeNode.prototype.selectedChanged = /**
     * @return {?}
     */
    function () {
        this.nodeSelectedChange.emit(this.selected);
    };
    Object.defineProperty(ClrTreeNode.prototype, "selectable", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.treeSelectionService) {
                return this.treeSelectionService.selectable;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "nodeIndeterminate", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.indeterminate = value;
            this.activateSelection();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrTreeNode.prototype.indeterminateChanged = /**
     * @return {?}
     */
    function () {
        this.nodeIndeterminateChanged.emit(this.indeterminate);
    };
    /* Expansion */
    /* Expansion */
    /**
     * @return {?}
     */
    ClrTreeNode.prototype.toggleExpand = /* Expansion */
    /**
     * @return {?}
     */
    function () {
        this.nodeExpand.expanded = !this.nodeExpand.expanded;
    };
    Object.defineProperty(ClrTreeNode.prototype, "caretDirection", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nodeExpand.expanded ? 'down' : 'right';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "caretTitle", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nodeExpand.expanded ? this.commonStrings.collapse : this.commonStrings.expand;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "expanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nodeExpand.expanded;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = !!value;
            if (this.nodeExpand.expanded !== value) {
                this.nodeExpand.expanded = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "state", {
        get: /**
         * @return {?}
         */
        function () {
            return this.expanded && !this.nodeExpand.loading ? 'expanded' : 'collapsed';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "treeNodeRole", {
        get: /**
         * @return {?}
         */
        function () {
            return this.parent ? 'treeitem' : 'tree';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "rootAriaMultiSelectable", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.parent || !this.selectable) {
                return null;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "ariaSelected", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selectable ? this.selected : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "ariaTreeNodeChildrenRole", {
        get: /**
         * @return {?}
         */
        function () {
            return this.children.length > 0 ? 'group' : null;
        },
        enumerable: true,
        configurable: true
    });
    /* Lifecycle */
    /* Lifecycle */
    /**
     * @return {?}
     */
    ClrTreeNode.prototype.ngOnDestroy = /* Lifecycle */
    /**
     * @return {?}
     */
    function () {
        if (this.parent) {
            this.parent.unregister(this);
        }
    };
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
    ClrTreeNode.ctorParameters = function () { return [
        { type: Expand },
        { type: ClrTreeNode, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: TreeSelectionService },
        { type: String, decorators: [{ type: Inject, args: [UNIQUE_ID,] }] },
        { type: ClrCommonStrings }
    ]; };
    ClrTreeNode.propDecorators = {
        nodeSelected: [{ type: Input, args: ['clrSelected',] }],
        nodeSelectedChange: [{ type: Output, args: ['clrSelectedChange',] }],
        nodeIndeterminate: [{ type: Input, args: ['clrIndeterminate',] }],
        nodeIndeterminateChanged: [{ type: Output, args: ['clrIndeterminateChange',] }],
        treeNodeRole: [{ type: HostBinding, args: ['attr.role',] }],
        rootAriaMultiSelectable: [{ type: HostBinding, args: ['attr.aria-multiselectable',] }],
        ariaSelected: [{ type: HostBinding, args: ['attr.aria-selected',] }]
    };
    return ClrTreeNode;
}(AbstractTreeSelection));
export { ClrTreeNode };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS90cmVlLXZpZXcvdHJlZS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFdBQVcsRUFDWCxNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3RCxPQUFPLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDOUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRXZFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO1NBVTNELCtCQUErQjtBQVJqRDtJQXNCaUMsdUNBQXFCO0lBQ3BELHFCQUNTLFVBQWtCLEVBR2xCLE1BQW1CLEVBQ25CLG9CQUEwQyxFQUN2QixNQUFjLEVBQ2pDLGFBQStCO1FBUHhDLFlBU0Usa0JBQU0sTUFBTSxDQUFDLFNBSWQ7UUFaUSxnQkFBVSxHQUFWLFVBQVUsQ0FBUTtRQUdsQixZQUFNLEdBQU4sTUFBTSxDQUFhO1FBQ25CLDBCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDdkIsWUFBTSxHQUFOLE1BQU0sQ0FBUTtR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KSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFNraXBTZWxmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRXhwYW5kIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXhwYW5kL3Byb3ZpZGVycy9leHBhbmQnO1xuaW1wb3J0IHsgVU5JUVVFX0lELCBVTklRVUVfSURfUFJPVklERVIgfSBmcm9tICcuLi8uLi91dGlscy9pZC1nZW5lcmF0b3IvaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9hZGluZ0xpc3RlbmVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9hZGluZy9sb2FkaW5nLWxpc3RlbmVyJztcblxuaW1wb3J0IHsgQWJzdHJhY3RUcmVlU2VsZWN0aW9uIH0gZnJvbSAnLi9hYnN0cmFjdC10cmVlLXNlbGVjdGlvbic7XG5pbXBvcnQgeyBjbHJUcmVlU2VsZWN0aW9uUHJvdmlkZXJGYWN0b3J5IH0gZnJvbSAnLi9wcm92aWRlcnMvdHJlZS1zZWxlY3Rpb24ucHJvdmlkZXInO1xuaW1wb3J0IHsgVHJlZVNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy90cmVlLXNlbGVjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci10cmVlLW5vZGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vdHJlZS1ub2RlLmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICBFeHBhbmQsXG4gICAgeyBwcm92aWRlOiBMb2FkaW5nTGlzdGVuZXIsIHVzZUV4aXN0aW5nOiBFeHBhbmQgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBUcmVlU2VsZWN0aW9uU2VydmljZSxcbiAgICAgIHVzZUZhY3Rvcnk6IGNsclRyZWVTZWxlY3Rpb25Qcm92aWRlckZhY3RvcnksXG4gICAgICBkZXBzOiBbW25ldyBPcHRpb25hbCgpLCBuZXcgU2tpcFNlbGYoKSwgVHJlZVNlbGVjdGlvblNlcnZpY2VdXSxcbiAgICB9LFxuICAgIFVOSVFVRV9JRF9QUk9WSURFUixcbiAgXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2NoaWxkTm9kZXNTdGF0ZScsIFtcbiAgICAgIHN0YXRlKCdleHBhbmRlZCcsIHN0eWxlKHsgaGVpZ2h0OiAnKicsICdvdmVyZmxvdy15JzogJ2hpZGRlbicgfSkpLFxuICAgICAgc3RhdGUoJ2NvbGxhcHNlZCcsIHN0eWxlKHsgaGVpZ2h0OiAwLCAnb3ZlcmZsb3cteSc6ICdoaWRkZW4nIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ2V4cGFuZGVkIDw9PiBjb2xsYXBzZWQnLCBhbmltYXRlKCcwLjJzIGVhc2UtaW4tb3V0JykpLFxuICAgIF0pLFxuICBdLFxuICBob3N0OiB7ICdbY2xhc3MuY2xyLXRyZWUtbm9kZV0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyVHJlZU5vZGUgZXh0ZW5kcyBBYnN0cmFjdFRyZWVTZWxlY3Rpb24gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbm9kZUV4cGFuZDogRXhwYW5kLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQFNraXBTZWxmKClcbiAgICBwdWJsaWMgcGFyZW50OiBDbHJUcmVlTm9kZSxcbiAgICBwdWJsaWMgdHJlZVNlbGVjdGlvblNlcnZpY2U6IFRyZWVTZWxlY3Rpb25TZXJ2aWNlLFxuICAgIEBJbmplY3QoVU5JUVVFX0lEKSBwdWJsaWMgbm9kZUlkOiBzdHJpbmcsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NcbiAgKSB7XG4gICAgc3VwZXIocGFyZW50KTtcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIHRoaXMucGFyZW50LnJlZ2lzdGVyKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NoaWxkcmVuOiBDbHJUcmVlTm9kZVtdID0gW107XG5cbiAgZ2V0IGNoaWxkcmVuKCk6IENsclRyZWVOb2RlW10ge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgfVxuXG4gIC8qIFJlZ2lzdHJhdGlvbiAqL1xuXG4gIGNoZWNrSWZDaGlsZE5vZGVSZWdpc3RlcmVkKG5vZGU6IENsclRyZWVOb2RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uaW5kZXhPZihub2RlKSA+IC0xO1xuICB9XG5cbiAgLy8gVE9ETzogVGhpcyBzaG91bGQgaWRlYWxseSBiZSBpbiBBYnN0cmFjdFRyZWVTZWxlY3Rpb25cbiAgLy8gVHJpZWQgZG9pbmcgdGhpcyBidXQgcmFuIGludG8gc29tZSBpc3N1ZXMgYW5kIGFsc28gcmFuIG91dCBvZiB0aW1lLlxuICAvLyBXaWxsIGdldCB0aGlzIGRvbmUgbGF0ZXIuXG4gIHJlZ2lzdGVyKG5vZGU6IENsclRyZWVOb2RlKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNoZWNrSWZDaGlsZE5vZGVSZWdpc3RlcmVkKG5vZGUpKSB7XG4gICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobm9kZSk7XG4gICAgICBpZiAodGhpcy5zZWxlY3RhYmxlKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgbm9kZS5wYXJlbnRDaGFuZ2VkKHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETzogVGhpcyBzaG91bGQgaWRlYWxseSBiZSBpbiBBYnN0cmFjdFRyZWVTZWxlY3Rpb25cbiAgLy8gVHJpZWQgZG9pbmcgdGhpcyBidXQgcmFuIGludG8gc29tZSBpc3N1ZXMgYW5kIGFsc28gcmFuIG91dCBvZiB0aW1lLlxuICAvLyBXaWxsIGdldCB0aGlzIGRvbmUgbGF0ZXIuXG4gIHVucmVnaXN0ZXIobm9kZTogQ2xyVHJlZU5vZGUpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihub2RlKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8qIFNlbGVjdGlvbiAqL1xuXG4gIGFjdGl2YXRlU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRyZWVTZWxlY3Rpb25TZXJ2aWNlICYmICF0aGlzLnRyZWVTZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdGFibGUpIHtcbiAgICAgIHRoaXMudHJlZVNlbGVjdGlvblNlcnZpY2Uuc2VsZWN0YWJsZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdjbHJTZWxlY3RlZCcpXG4gIHB1YmxpYyBzZXQgbm9kZVNlbGVjdGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgLy8gcmVxdWlyZWQgZm9yIHJlY3Vyc2l2ZSB0cmVlcyB0byBkaXNjYXJkIHVuc2V0IGlucHV0cy5cbiAgICB0aGlzLmFjdGl2YXRlU2VsZWN0aW9uKCk7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyU2VsZWN0ZWRDaGFuZ2UnKSBub2RlU2VsZWN0ZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgc2VsZWN0ZWRDaGFuZ2VkKCk6IHZvaWQge1xuICAgIHRoaXMubm9kZVNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZCk7XG4gIH1cblxuICBnZXQgc2VsZWN0YWJsZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy50cmVlU2VsZWN0aW9uU2VydmljZSkge1xuICAgICAgcmV0dXJuIHRoaXMudHJlZVNlbGVjdGlvblNlcnZpY2Uuc2VsZWN0YWJsZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgQElucHV0KCdjbHJJbmRldGVybWluYXRlJylcbiAgc2V0IG5vZGVJbmRldGVybWluYXRlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5pbmRldGVybWluYXRlID0gdmFsdWU7XG4gICAgdGhpcy5hY3RpdmF0ZVNlbGVjdGlvbigpO1xuICB9XG5cbiAgQE91dHB1dCgnY2xySW5kZXRlcm1pbmF0ZUNoYW5nZScpIG5vZGVJbmRldGVybWluYXRlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPih0cnVlKTtcblxuICBpbmRldGVybWluYXRlQ2hhbmdlZCgpOiB2b2lkIHtcbiAgICB0aGlzLm5vZGVJbmRldGVybWluYXRlQ2hhbmdlZC5lbWl0KHRoaXMuaW5kZXRlcm1pbmF0ZSk7XG4gIH1cblxuICAvKiBFeHBhbnNpb24gKi9cblxuICB0b2dnbGVFeHBhbmQoKTogdm9pZCB7XG4gICAgdGhpcy5ub2RlRXhwYW5kLmV4cGFuZGVkID0gIXRoaXMubm9kZUV4cGFuZC5leHBhbmRlZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2FyZXREaXJlY3Rpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlRXhwYW5kLmV4cGFuZGVkID8gJ2Rvd24nIDogJ3JpZ2h0JztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2FyZXRUaXRsZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm5vZGVFeHBhbmQuZXhwYW5kZWQgPyB0aGlzLmNvbW1vblN0cmluZ3MuY29sbGFwc2UgOiB0aGlzLmNvbW1vblN0cmluZ3MuZXhwYW5kO1xuICB9XG5cbiAgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5vZGVFeHBhbmQuZXhwYW5kZWQ7XG4gIH1cblxuICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHRoaXMubm9kZUV4cGFuZC5leHBhbmRlZCAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMubm9kZUV4cGFuZC5leHBhbmRlZCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzdGF0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZGVkICYmICF0aGlzLm5vZGVFeHBhbmQubG9hZGluZyA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgZ2V0IHRyZWVOb2RlUm9sZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBhcmVudCA/ICd0cmVlaXRlbScgOiAndHJlZSc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1tdWx0aXNlbGVjdGFibGUnKVxuICBnZXQgcm9vdEFyaWFNdWx0aVNlbGVjdGFibGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucGFyZW50IHx8ICF0aGlzLnNlbGVjdGFibGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1zZWxlY3RlZCcpXG4gIGdldCBhcmlhU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0YWJsZSA/IHRoaXMuc2VsZWN0ZWQgOiBudWxsO1xuICB9XG5cbiAgZ2V0IGFyaWFUcmVlTm9kZUNoaWxkcmVuUm9sZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyAnZ3JvdXAnIDogbnVsbDtcbiAgfVxuXG4gIC8qIExpZmVjeWNsZSAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIHRoaXMucGFyZW50LnVucmVnaXN0ZXIodGhpcyk7XG4gICAgfVxuICB9XG59XG4iXX0=