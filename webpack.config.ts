import type { Configuration } from 'webpack';
import { buildWebpack } from './config/build/build-webpack';
import { BuildMode, BuildPath } from './config/build/types/types';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

interface EnvVariables {
  mode: BuildMode;
  analyzer?: boolean;
}


export default(env: EnvVariables): Configuration  => {

  const paths: BuildPath = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src'),
  }

  const mode = env.mode || 'development';
  const port = mode === 'production' ? process.env.PORT_PROD ?? 3001 : process.env.PORT_DEV ?? 3101;
  const loader = process.env.LOADER ?? "babel";
  const analyzer = env.analyzer;

  const config: Configuration = buildWebpack({
    port: Number(port) || 3001,
    mode,
    paths,
    analyzer,
    loader,
  });
  return config;
} 