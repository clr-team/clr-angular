import { AnimationEvent } from '@angular/animations';
import { AfterContentInit, EventEmitter, OnDestroy } from '@angular/core';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { VerticalNavGroupRegistrationService } from './providers/vertical-nav-group-registration.service';
import { VerticalNavGroupService } from './providers/vertical-nav-group.service';
import { VerticalNavService } from './providers/vertical-nav.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
export declare class ClrVerticalNavGroup implements AfterContentInit, OnDestroy {
    private _itemExpand;
    private _navGroupRegistrationService;
    private _navGroupService;
    private _navService;
    commonStrings: ClrCommonStrings;
    constructor(_itemExpand: IfExpandService, _navGroupRegistrationService: VerticalNavGroupRegistrationService, _navGroupService: VerticalNavGroupService, _navService: VerticalNavService, commonStrings: ClrCommonStrings);
    private wasExpanded;
    expanded: boolean;
    userExpandedInput: boolean;
    expandedChange: EventEmitter<boolean>;
    private _subscriptions;
    private _expandAnimationState;
    expandGroup(): void;
    collapseGroup(): void;
    expandAnimationDone($event: AnimationEvent): void;
    expandAnimationState: string;
    toggleExpand(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
