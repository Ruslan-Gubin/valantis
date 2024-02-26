import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer (options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port || 3001,
    open: false,
    //если раздавать статику через nginx то надо делать проксирование на index.html
    historyApiFallback: true,
    static: './build',
    hot: true,
  }
}