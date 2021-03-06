"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const testing_1 = require("@angular-devkit/schematics/testing");
const path = require("path");
const collectionPath = path.join(__dirname, '../collection.json');
xdescribe('add', () => {
    it('works', () => {
        const runner = new testing_1.SchematicTestRunner('schematics', collectionPath);
        const tree = runner.runSchematic('add', { module: 'app' }, schematics_1.Tree.empty());
        expect(tree.files).toEqual(['/hello']);
    });
});
//# sourceMappingURL=index_spec.js.map