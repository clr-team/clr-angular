/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ControlClassService } from '../common/providers/control-class.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { WrappedFormControl } from '../common/wrapped-control';
import { ClrSelectContainer } from './select-container';
export declare class ClrSelect extends WrappedFormControl<ClrSelectContainer> implements OnInit {
    private ngControlService;
    private ifErrorService;
    private control;
    constructor(vcr: ViewContainerRef, ngControlService: NgControlService, ifErrorService: IfErrorService, control: NgControl, controlClassService: ControlClassService, el: ElementRef);
    ngOnInit(): void;
    onBlur(): void;
}
