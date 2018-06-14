import { Observable } from 'rxjs';
export declare class IfOpenService {
    /********
     * @property _openChange
     *
     * @description
     * A RXJS Subject that updates and provides subscriptions to for the current open state of a component template
     * implemting the IfOpen structural directive.
     */
    private _openChange;
    /*********
     * @property _open
     *
     * @description
     * A property holding the current value for open/closed state of an IfOpen structural directive.
     *
     */
    private _open;
    /*********
     *
     * @description
     * A getter function that provides an observable for the _opened Subject.
     *
     */
    readonly openChange: Observable<boolean>;
    /*********
     *
     * @description
     * A getter that returns the current value of this IfOpen instance.
     *
     */
    /*********
     *
     * @description
     * A setter function that updates the current state of _open for this instance of IfOpen structural directive. And,
     * broadcasts the new value to all subscribers.
     *
     * @param value
     */
    open: boolean;
    /**
     * Sometimes, we need to remember the event that triggered the toggling to avoid loops.
     * This is for instance the case of components that open on a click, but close on a click outside.
     */
    originalEvent: any;
    toggleWithEvent(event: any): void;
}
