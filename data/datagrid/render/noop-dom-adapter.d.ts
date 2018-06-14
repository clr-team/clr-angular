import { DomAdapter } from './dom-adapter';
export declare class NoopDomAdapter implements DomAdapter {
    userDefinedWidth(element: any): number;
    scrollBarWidth(element: any): number;
    scrollWidth(element: any): number;
    computedHeight(element: any): number;
    clientRectHeight(element: any): number;
    clientRectRight(element: any): number;
    clientRectWidth(element: any): number;
    minWidth(element: any): number;
    focus(element: any): void;
}
