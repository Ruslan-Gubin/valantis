
export function imageLoader() {
  return {
    test: /\.(png|jpg|webp|jpeg|gif)$/i,
    type: "asset/resource",
    use: [
      {
        loader: "image-webpack-loader",
        options: {
          mozjpeg: {
            progressive: true,
          },
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
          webp: {
            quality: 75,
          },
        },
      },
    ],
  }
}