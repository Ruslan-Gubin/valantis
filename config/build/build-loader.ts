import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { buildBabelLoader } from "./babel/build-babel-loader";
import { imageLoader } from "./image/image-loader";
import { typescriptLoader } from "./loader/typescript-loader";


export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  const fontsLoader = {
    test: /\.woff2,ttf,otf,eot?$/i,
    loader: 'file-loader',
    type: "asset/resource",
  }

  const assetsLoader = imageLoader();

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const cssLoaderWithModule = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
      },
    },
  };
  
  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      cssLoaderWithModule,
      "sass-loader",
    ],
  };

  const tsLoader = typescriptLoader(isDev);
  const babelLoader = buildBabelLoader(options);

  const currentLoader = options.loader === 'babel' ? babelLoader  : tsLoader; 

  return [ 
    assetsLoader, 
    scssLoader, 
    currentLoader,
    svgLoader,
    fontsLoader,
  ];
}
