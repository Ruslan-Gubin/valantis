import ReactRefreshTypeScript from'react-refresh-typescript';


export function typescriptLoader(isDev: boolean) {
  return {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
        },
      }
    ],
    exclude: /node_modules/,
  }
}