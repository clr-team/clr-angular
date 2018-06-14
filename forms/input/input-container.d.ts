/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IfErrorService } from '../common/if-error/if-error.service';
export declare class ClrInputContainer implements OnDestroy {
    private ifErrorService;
    subscription: Subscription;
    invalid: boolean;
    constructor(ifErrorService: IfErrorService);
    ngOnDestroy(): void;
}
