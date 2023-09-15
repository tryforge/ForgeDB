import { generateFunctionDoc } from "forgescript"
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs"

if (!existsSync(`./docs/functions`)) mkdirSync(`./docs/functions`)

for (const file of readdirSync("./dist/functions").filter((x) => x.endsWith(".js"))) {
    const req = require(`../dist/functions/${file}`).default as any
    writeFileSync(`./docs/functions/${req.name.slice(1)}.md`, generateFunctionDoc(req, `./src/functions`))
    console.log(`Generated doc info for ${req.name}`)
}
