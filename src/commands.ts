import { around } from "monkey-around";
import { Command } from "obsidian";

export function onCommandTrigger(id: string, cb: Function) {
	const uninstallCommand = around(this.app.commands, {
		executeCommand(originalMethod) {
			return function (...args: Command[]) {
				if (args[0].id === id) {
					cb();
				}
				const result =
					originalMethod && originalMethod.apply(this, args);
				return result;
			};
		},
	});
	return uninstallCommand;
}
