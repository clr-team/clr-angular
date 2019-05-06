import { IfActiveService } from '../../utils/conditional/if-active.service';
import { AriaService } from './providers/aria.service';
export declare class ClrTabContent {
    ifActiveService: IfActiveService;
    id: number;
    private ariaService;
    constructor(ifActiveService: IfActiveService, id: number, ariaService: AriaService);
    readonly ariaLabelledBy: string;
    tabContentId: string;
    readonly active: boolean;
}
