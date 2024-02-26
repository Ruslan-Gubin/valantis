import { Configuration } from "webpack";


export function buildPerformance (): Configuration['performance'] {
  return {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 51200
  }
}