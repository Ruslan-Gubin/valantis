import { PluginItem } from "@babel/core";

export interface BuildPath {
  entry: string;
  html: string;
  output: string;
  src: string;
  public: string;
}

export type BuildMode = 'production' | 'development';

export interface BuildOptions {
  port: number;
  paths: BuildPath;
  mode: BuildMode;
  analyzer?: boolean;
  loader: string;
}

export type BuildBabelLoader = {
  test: RegExp;
  exclude: RegExp;
  use: {
      loader: string;
      options: {
          presets: (string | (string | {
              runtime: string;
          })[])[];
          plugins: PluginItem[] | undefined;
      };
  };
}