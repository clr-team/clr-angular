/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { LayoutService } from './providers/layout.service';
import { MarkControlService } from './providers/mark-control.service';
export declare class ClrForm {
    layoutService: LayoutService;
    private markControlService;
    constructor(layoutService: LayoutService, markControlService: MarkControlService);
    /** @deprecated since 2.0 */
    markAsDirty(): void;
    markAsTouched(): void;
}
