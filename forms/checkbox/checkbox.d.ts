/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Renderer2, ElementRef, Injector, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ClrCheckboxWrapper } from './checkbox-wrapper';
import { WrappedFormControl } from '../common/wrapped-control';
export declare class ClrCheckbox extends WrappedFormControl<ClrCheckboxWrapper> {
    constructor(vcr: ViewContainerRef, injector: Injector, control: NgControl, renderer: Renderer2, el: ElementRef);
}
