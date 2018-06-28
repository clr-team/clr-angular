/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { InjectionToken, Injector, Type, ViewContainerRef } from '@angular/core';
import { DynamicWrapper } from './dynamic-wrapper';
export declare class HostWrapper<W extends DynamicWrapper> implements Injector {
    constructor(containerType: Type<W>, vcr: ViewContainerRef, index?: number);
    private injector;
    get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T): T;
}
