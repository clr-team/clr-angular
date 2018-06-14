import { EventEmitter, OnDestroy } from '@angular/core';
import { Expand } from '../../utils/expand/providers/expand';
import { AbstractTreeSelection } from './abstract-tree-selection';
import { TreeSelectionService } from './providers/tree-selection.service';
export declare class ClrTreeNode extends AbstractTreeSelection implements OnDestroy {
    nodeExpand: Expand;
    parent: ClrTreeNode;
    treeSelectionService: TreeSelectionService;
    nodeId: string;
    constructor(nodeExpand: Expand, parent: ClrTreeNode, treeSelectionService: TreeSelectionService, nodeId: string);
    private _children;
    readonly children: ClrTreeNode[];
    checkIfChildNodeRegistered(node: ClrTreeNode): boolean;
    register(node: ClrTreeNode): void;
    unregister(node: ClrTreeNode): void;
    activateSelection(): void;
    nodeSelected: boolean;
    nodeSelectedChange: EventEmitter<boolean>;
    selectedChanged(): void;
    readonly selectable: boolean;
    nodeIndeterminate: boolean;
    nodeIndeterminateChanged: EventEmitter<boolean>;
    indeterminateChanged(): void;
    toggleExpand(): void;
    readonly caretDirection: string;
    expanded: boolean;
    readonly state: string;
    ngOnDestroy(): void;
}
