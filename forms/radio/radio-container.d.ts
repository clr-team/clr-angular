/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { OnDestroy } from '@angular/core';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ClrLabel } from '../common/label';
import { ControlClassService } from '../common/providers/control-class.service';
import { LayoutService } from '../common/providers/layout.service';
export declare class ClrRadioContainer implements OnDestroy {
    private ifErrorService;
    private layoutService;
    private controlClassService;
    private subscriptions;
    invalid: boolean;
    label: ClrLabel;
    private inline;
    clrInline: boolean | string;
    constructor(ifErrorService: IfErrorService, layoutService: LayoutService, controlClassService: ControlClassService);
    controlClass(): string;
    addGrid(): boolean;
    ngOnDestroy(): void;
}
