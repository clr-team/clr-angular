/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ViewContainerRef, OnInit, Renderer2, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { IfErrorService } from '../common/if-error/if-error.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { ClrInputContainer } from './input-container';
import { WrappedFormControl } from '../common/wrapped-control';
import { ControlClassService } from '../common/providers/control-class.service';
export declare class ClrInput extends WrappedFormControl<ClrInputContainer> implements OnInit {
    private ngControlService;
    private ifErrorService;
    private control;
    type: string;
    constructor(vcr: ViewContainerRef, ngControlService: NgControlService, ifErrorService: IfErrorService, control: NgControl, controlClassService: ControlClassService, type: string, renderer: Renderer2, el: ElementRef);
    ngOnInit(): void;
    onBlur(): void;
}
