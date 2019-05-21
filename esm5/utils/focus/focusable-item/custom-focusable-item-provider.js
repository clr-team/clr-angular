/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { UNIQUE_ID_PROVIDER } from '../../id-generator/id-generator.service';
import { FocusableItem } from './focusable-item';
/**
 * @template T
 * @param {?} implementation
 * @return {?}
 */
export function customFocusableItemProvider(implementation) {
    return [
        UNIQUE_ID_PROVIDER,
        implementation,
        {
            provide: FocusableItem,
            useExisting: implementation,
        },
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWZvY3VzYWJsZS1pdGVtLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZm9jdXMvZm9jdXNhYmxlLWl0ZW0vY3VzdG9tLWZvY3VzYWJsZS1pdGVtLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU9BLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7O0FBRWpELE1BQU0sVUFBVSwyQkFBMkIsQ0FBSSxjQUF1QjtJQUNwRSxPQUFPO1FBQ0wsa0JBQWtCO1FBQ2xCLGNBQWM7UUFDZDtZQUNFLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLFdBQVcsRUFBRSxjQUFjO1NBQzVCO0tBQ0YsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVOSVFVRV9JRF9QUk9WSURFUiB9IGZyb20gJy4uLy4uL2lkLWdlbmVyYXRvci9pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBGb2N1c2FibGVJdGVtIH0gZnJvbSAnLi9mb2N1c2FibGUtaXRlbSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXN0b21Gb2N1c2FibGVJdGVtUHJvdmlkZXI8VD4oaW1wbGVtZW50YXRpb246IFR5cGU8VD4pIHtcbiAgcmV0dXJuIFtcbiAgICBVTklRVUVfSURfUFJPVklERVIsXG4gICAgaW1wbGVtZW50YXRpb24sXG4gICAge1xuICAgICAgcHJvdmlkZTogRm9jdXNhYmxlSXRlbSxcbiAgICAgIHVzZUV4aXN0aW5nOiBpbXBsZW1lbnRhdGlvbixcbiAgICB9LFxuICBdO1xufVxuIl19