/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { DynamicWrapper } from '../../utils/host-wrapping/dynamic-wrapper';
import { ControlClassService } from '../common/providers/control-class.service';
import { ClrLabel } from '../common/label';
export declare class ClrRadioWrapper implements DynamicWrapper {
    controlClassService: ControlClassService;
    _dynamic: boolean;
    label: ClrLabel;
    hasContainer: boolean;
    constructor(controlClassService: ControlClassService);
}
