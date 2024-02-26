import { PluginItem } from "@babel/core";
import { BuildBabelLoader, BuildOptions } from "../types/types";
import { removeDataTestId } from "./removeDataTestId";

const babelOptions = ( plugins: PluginItem[]) => {
  return {
    presets: [
      "@babel/preset-env",
      "@babel/preset-typescript",
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
        },
      ],
    ],
    plugins: plugins.length ? plugins : undefined,
  }
}

export function buildBabelLoader(options: BuildOptions): BuildBabelLoader {
  const isProd = options.mode === "production";
  
  const plugins: PluginItem[] = [];
  
  if (isProd) {
    plugins.push([
      removeDataTestId,
      {
        props: ['data-testid']
      }
    ])
  }

  return {
    test: /\.(ts|js)x?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: babelOptions( plugins ),
    },
  };
  
}
