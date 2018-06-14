import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { ClrLoadingState } from '../../utils/loading/loading';
import { LoadingListener } from '../../utils/loading/loading-listener';
export declare class ClrLoadingButton implements LoadingListener {
    private el;
    private renderer;
    buttonState: typeof ClrLoadingState;
    state: ClrLoadingState;
    clrLoadingChange: EventEmitter<ClrLoadingState>;
    constructor(el: ElementRef, renderer: Renderer2);
    loadingStateChange(state: ClrLoadingState): void;
    private setExplicitButtonWidth();
}
