/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ControlIdService } from './providers/control-id.service';
export declare class ClrControlError {
    private controlIdService;
    describedByAttr: string;
    private subscriptions;
    constructor(controlIdService: ControlIdService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
