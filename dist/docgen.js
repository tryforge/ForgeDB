"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
const fs_1 = require("fs");
if (!(0, fs_1.existsSync)(`./docs/functions`))
    (0, fs_1.mkdirSync)(`./docs/functions`);
for (const file of (0, fs_1.readdirSync)("./dist/functions").filter((x) => x.endsWith(".js"))) {
    const req = require(`../dist/functions/${file}`).default;
    (0, fs_1.writeFileSync)(`./docs/functions/${req.name.slice(1)}.md`, (0, forgescript_1.generateFunctionDoc)(req, `./src/functions`));
    console.log(`Generated doc info for ${req.name}`);
}
//# sourceMappingURL=docgen.js.map