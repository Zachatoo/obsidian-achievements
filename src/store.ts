import { writable } from "svelte/store";
import type AchievementsPlugin from "src/main";

const plugin = writable<AchievementsPlugin>();
export default { plugin };
