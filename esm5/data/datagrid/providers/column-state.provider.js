/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/** @type {?} */
export var COLUMN_STATE = new InjectionToken('COLUMN_STATE');
/**
 * @return {?}
 */
export function columnStateFactory() {
    return new BehaviorSubject({
        changes: [],
    });
}
/** @type {?} */
export var COLUMN_STATE_PROVIDER = {
    provide: COLUMN_STATE,
    useFactory: columnStateFactory,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXN0YXRlLnByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvY29sdW1uLXN0YXRlLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFHdkMsTUFBTSxLQUFPLFlBQVksR0FBRyxJQUFJLGNBQWMsQ0FBYyxjQUFjLENBQUM7Ozs7QUFFM0UsTUFBTSxVQUFVLGtCQUFrQjtJQUNoQyxPQUFPLElBQUksZUFBZSxDQUFjO1FBQ3RDLE9BQU8sRUFBRSxFQUFFO0tBQ1osQ0FBQyxDQUFDO0FBQ0wsQ0FBQzs7QUFFRCxNQUFNLEtBQU8scUJBQXFCLEdBQUc7SUFDbkMsT0FBTyxFQUFFLFlBQVk7SUFDckIsVUFBVSxFQUFFLGtCQUFrQjtDQUMvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29sdW1uU3RhdGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbHVtbi1zdGF0ZS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgQ09MVU1OX1NUQVRFID0gbmV3IEluamVjdGlvblRva2VuPENvbHVtblN0YXRlPignQ09MVU1OX1NUQVRFJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2x1bW5TdGF0ZUZhY3RvcnkoKSB7XG4gIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0PENvbHVtblN0YXRlPih7XG4gICAgY2hhbmdlczogW10sXG4gIH0pO1xufVxuXG5leHBvcnQgY29uc3QgQ09MVU1OX1NUQVRFX1BST1ZJREVSID0ge1xuICBwcm92aWRlOiBDT0xVTU5fU1RBVEUsXG4gIHVzZUZhY3Rvcnk6IGNvbHVtblN0YXRlRmFjdG9yeSxcbn07XG4iXX0=