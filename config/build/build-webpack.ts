import { buildLoaders } from './build-loader';
import { buildPlugins } from './build-plugins';
import { buildResolvers } from './build-resolvers';
import { BuildOptions } from './types/types';
import { buildDevServer } from './build-dev-server';
import { Configuration } from 'webpack';
import { buildPerformance } from './build-performance';


export function buildWebpack (options: BuildOptions): Configuration {
  const { mode, paths } = options;
  const isDev = options.mode === 'development';

  return {
    mode,
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      assetModuleFilename: "assets/[name][ext]",
      publicPath: '/',
      clean: true,
    },
    
  plugins: buildPlugins(options),
  module: { rules: buildLoaders(options) },
  resolve: buildResolvers(options),
  devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
  devServer: isDev ? buildDevServer(options) : undefined,
  performance: !isDev ? buildPerformance() : undefined,
  }
}