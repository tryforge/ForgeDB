import { Interpreter } from "@tryforge/forgescript"
import { ForgeDB } from ".."
import { DBEventHandler } from "../structures/eventManager"

export default new DBEventHandler({
    name: "variableDelete",
    version: "2.0.0",
    description: "This event is triggered when a variable gets deleted.",
    listener(extras){
        const commands = this.getExtension(ForgeDB, true).commands.get('variableDelete')
        
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
