import { Interpreter } from "@tryforge/forgescript"
import { ForgeDB } from ".."
import { DBEventHandler } from "../structures/eventManager"

export default new DBEventHandler({
    name: "connect",
    version: "2.0.0",
    description: "test",
    listener(){
        const commands = this.getExtension(ForgeDB, true).commands.get('connect')
        
        for (const command of commands) {
            Interpreter.run({
                obj: {},
                client: this,
                command,
                data: command.compiled.code
            })
        }
    }
})