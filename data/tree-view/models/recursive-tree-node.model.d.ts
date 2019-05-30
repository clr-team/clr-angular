import { TreeNodeModel } from './tree-node.model';
import { AsyncArray } from './async-array';
import { TreeFeaturesService } from '../tree-features.service';
export declare class RecursiveTreeNodeModel<T> extends TreeNodeModel<T> {
    private getChildren;
    private featuresService;
    constructor(model: T, parent: RecursiveTreeNodeModel<T> | null, getChildren: (node: T) => AsyncArray<T> | undefined, featuresService: TreeFeaturesService<T> | undefined);
    parent: RecursiveTreeNodeModel<T> | null;
    private childrenFetched;
    clearChildren(): void;
    fetchChildren(): void;
    private wrapChildren;
    private _children;
    children: RecursiveTreeNodeModel<T>[];
    private subscription;
    destroy(): void;
}
