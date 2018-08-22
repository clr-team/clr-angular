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
