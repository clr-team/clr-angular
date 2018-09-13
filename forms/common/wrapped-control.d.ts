/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { InjectionToken, OnInit, Type, ViewContainerRef } from '@angular/core';
import { DynamicWrapper } from '../../utils/host-wrapping/dynamic-wrapper';
import { ControlIdService } from './providers/control-id.service';
export declare class WrappedFormControl<W extends DynamicWrapper> implements OnInit {
    protected wrapperType: Type<W>;
    protected vcr: ViewContainerRef;
    protected index: number;
    constructor(wrapperType: Type<W>, vcr: ViewContainerRef, index?: number);
    protected controlIdService: ControlIdService;
    _id: string;
    id: string;
    private _containerInjector;
    protected getProviderFromContainer<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T): T;
    ngOnInit(): void;
}
