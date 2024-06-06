import { Interpreter } from "@tryforge/forgescript"
import { ForgeDB } from ".."
import { DBEventHandler } from "../structures/eventManager"

export default new DBEventHandler({
    name: "variableCreate",
    version: "2.0.0",
    description: "This event is triggered when a new variable gets created.",
    listener(extras){
        const commands = this.getExtension(ForgeDB, true).commands.get('create')
        
        for (const command of commands) {
            Interpreter.run({
                obj: {},
                client: this,
                command,
                data: command.compiled.code,
                extras
            })
        }
    }
})
