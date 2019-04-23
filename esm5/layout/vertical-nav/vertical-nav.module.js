/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '../../icon/icon.module';
import { ClrConditionalModule } from '../../utils/conditional/conditional.module';
import { ClrVerticalNav } from './vertical-nav';
import { ClrVerticalNavGroup } from './vertical-nav-group';
import { ClrVerticalNavGroupChildren } from './vertical-nav-group-children';
import { ClrVerticalNavIcon } from './vertical-nav-icon';
import { ClrVerticalNavLink } from './vertical-nav-link';
/** @type {?} */
export var CLR_VERTICAL_NAV_DIRECTIVES = [
    ClrVerticalNav,
    ClrVerticalNavLink,
    ClrVerticalNavGroup,
    ClrVerticalNavGroupChildren,
    ClrVerticalNavIcon,
];
var ClrVerticalNavModule = /** @class */ (function () {
    function ClrVerticalNavModule() {
    }
    ClrVerticalNavModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrIconModule, ClrConditionalModule],
                    declarations: [CLR_VERTICAL_NAV_DIRECTIVES],
                    exports: [CLR_VERTICAL_NAV_DIRECTIVES, ClrConditionalModule, ClrIconModule],
                },] }
    ];
    return ClrVerticalNavModule;
}());
export { ClrVerticalNavModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxheW91dC92ZXJ0aWNhbC1uYXYvdmVydGljYWwtbmF2Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUUvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFbEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQUV6RCxNQUFNLEtBQU8sMkJBQTJCLEdBQWdCO0lBQ3RELGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLDJCQUEyQjtJQUMzQixrQkFBa0I7Q0FDbkI7QUFFRDtJQUFBO0lBS21DLENBQUM7O2dCQUxuQyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQztvQkFDNUQsWUFBWSxFQUFFLENBQUMsMkJBQTJCLENBQUM7b0JBQzNDLE9BQU8sRUFBRSxDQUFDLDJCQUEyQixFQUFFLG9CQUFvQixFQUFFLGFBQWEsQ0FBQztpQkFDNUU7O0lBQ2tDLDJCQUFDO0NBQUEsQUFMcEMsSUFLb0M7U0FBdkIsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xySWNvbk1vZHVsZSB9IGZyb20gJy4uLy4uL2ljb24vaWNvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyQ29uZGl0aW9uYWxNb2R1bGUgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9jb25kaXRpb25hbC5tb2R1bGUnO1xuXG5pbXBvcnQgeyBDbHJWZXJ0aWNhbE5hdiB9IGZyb20gJy4vdmVydGljYWwtbmF2JztcbmltcG9ydCB7IENsclZlcnRpY2FsTmF2R3JvdXAgfSBmcm9tICcuL3ZlcnRpY2FsLW5hdi1ncm91cCc7XG5pbXBvcnQgeyBDbHJWZXJ0aWNhbE5hdkdyb3VwQ2hpbGRyZW4gfSBmcm9tICcuL3ZlcnRpY2FsLW5hdi1ncm91cC1jaGlsZHJlbic7XG5pbXBvcnQgeyBDbHJWZXJ0aWNhbE5hdkljb24gfSBmcm9tICcuL3ZlcnRpY2FsLW5hdi1pY29uJztcbmltcG9ydCB7IENsclZlcnRpY2FsTmF2TGluayB9IGZyb20gJy4vdmVydGljYWwtbmF2LWxpbmsnO1xuXG5leHBvcnQgY29uc3QgQ0xSX1ZFUlRJQ0FMX05BVl9ESVJFQ1RJVkVTOiBUeXBlPGFueT5bXSA9IFtcbiAgQ2xyVmVydGljYWxOYXYsXG4gIENsclZlcnRpY2FsTmF2TGluayxcbiAgQ2xyVmVydGljYWxOYXZHcm91cCxcbiAgQ2xyVmVydGljYWxOYXZHcm91cENoaWxkcmVuLFxuICBDbHJWZXJ0aWNhbE5hdkljb24sXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDbHJJY29uTW9kdWxlLCBDbHJDb25kaXRpb25hbE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0NMUl9WRVJUSUNBTF9OQVZfRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFtDTFJfVkVSVElDQUxfTkFWX0RJUkVDVElWRVMsIENsckNvbmRpdGlvbmFsTW9kdWxlLCBDbHJJY29uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyVmVydGljYWxOYXZNb2R1bGUge31cbiJdfQ==