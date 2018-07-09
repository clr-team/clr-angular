import { EventEmitter, OnInit } from '@angular/core';
export declare class ClrStackBlock implements OnInit {
    private parent;
    expanded: boolean;
    expandedChange: EventEmitter<boolean>;
    expandable: boolean;
    private focused;
    private _changedChildren;
    private _fullyInitialized;
    private _changed;
    readonly getChangedValue: boolean;
    setChangedValue: boolean;
    constructor(parent: ClrStackBlock);
    ngOnInit(): void;
    addChild(): void;
    toggleExpand(): void;
    onStackBlockFocus(focusState: boolean): void;
    readonly caretDirection: string;
    readonly role: string;
    readonly tabIndex: string;
    readonly onStackLabelFocus: boolean;
}
