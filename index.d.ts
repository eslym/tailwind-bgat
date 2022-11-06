import type {PluginCreator, Config} from "tailwindcss/types/config";

declare const BGaTPlugin: { handler: PluginCreator, config?: Partial<Config> };
export = BGaTPlugin;
