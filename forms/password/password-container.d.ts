/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { InjectionToken, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DynamicWrapper } from '../../utils/host-wrapping/dynamic-wrapper';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ClrLabel } from '../common/label';
import { ControlClassService } from '../common/providers/control-class.service';
import { FocusService } from '../common/providers/focus.service';
import { LayoutService } from '../common/providers/layout.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
export declare const ToggleService: InjectionToken<any>;
export declare function ToggleServiceProvider(): BehaviorSubject<boolean>;
export declare class ClrPasswordContainer implements DynamicWrapper, OnDestroy {
    private ifErrorService;
    private layoutService;
    private controlClassService;
    focusService: FocusService;
    private toggleService;
    commonStrings: ClrCommonStrings;
    subscriptions: Subscription[];
    invalid: boolean;
    control: NgControl;
    _dynamic: boolean;
    show: boolean;
    focus: boolean;
    _toggle: boolean;
    clrToggle: boolean;
    label: ClrLabel;
    constructor(ifErrorService: IfErrorService, layoutService: LayoutService, controlClassService: ControlClassService, focusService: FocusService, toggleService: BehaviorSubject<boolean>, commonStrings: ClrCommonStrings);
    toggle(): void;
    controlClass(): string;
    addGrid(): boolean;
    ngOnDestroy(): void;
}
