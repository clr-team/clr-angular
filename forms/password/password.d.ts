/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { OnInit, ViewContainerRef, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { IfErrorService } from '../common/if-error/if-error.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { ClrPasswordContainer } from './password-container';
import { WrappedFormControl } from '../common/wrapped-control';
import { FocusService } from '../common/providers/focus.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ControlClassService } from '../common/providers/control-class.service';
export declare class ClrPassword extends WrappedFormControl<ClrPasswordContainer> implements OnInit, OnDestroy {
    private ngControlService;
    private ifErrorService;
    private control;
    private focusService;
    type: string;
    private toggleService;
    subscription: Subscription;
    constructor(vcr: ViewContainerRef, ngControlService: NgControlService, ifErrorService: IfErrorService, control: NgControl, focusService: FocusService, controlClassService: ControlClassService, type: string, renderer: Renderer2, el: ElementRef, toggleService: BehaviorSubject<boolean>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onFocus(): void;
    onBlur(): void;
}
