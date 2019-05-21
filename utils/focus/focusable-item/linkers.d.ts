import { Observable } from 'rxjs';
import { ArrowKeyDirection } from '../arrow-key-direction.enum';
import { FocusableItem } from './focusable-item';
/**
 * Links a set of focusable items to a parent along one direction
 */
export declare function linkParent(items: FocusableItem[], parent: FocusableItem | Observable<FocusableItem>, direction: ArrowKeyDirection): void;
/**
 * Double-links a set of focusable items vertically, possibly looping
 */
export declare function linkVertical(items: FocusableItem[], loop?: boolean): void;
