"use strict";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    return (tree, _context) => {
        _context.logger.info(`Updating for Clarity 0.13.0`);
        const root = 'src';
        function replaceContent(path) {
            const dir = tree.getDir(path);
            if (dir.subfiles.length) {
                dir.subfiles.forEach(file => {
                    if (!file.endsWith('.ts')) {
                        return;
                    }
                    const filePath = path + '/' + file;
                    const buffer = tree.read(filePath);
                    if (!buffer) {
                        return;
                    }
                    const content = buffer.toString('utf-8');
                    let updated = content.replace('ClarityModule.forChild()', 'ClarityModule');
                    updated = updated.replace('ClarityModule.forRoot()', 'ClarityModule');
                    tree.overwrite(filePath, updated);
                });
            }
            if (dir.subdirs.length) {
                dir.subdirs.forEach(d => {
                    replaceContent(path + '/' + d);
                });
            }
        }
        replaceContent(root);
        return tree;
    };
}
exports.default = default_1;
//# sourceMappingURL=update-0.13.0-beta.1.js.map