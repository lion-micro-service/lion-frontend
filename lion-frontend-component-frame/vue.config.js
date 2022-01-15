const pages = require('@lion/lion-frontend-core/src/webpack/vue.config')
const webpack=require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    devServer: {
        disableHostCheck: true
    },
    filenameHashing: true,
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            }),
            // new CompressionPlugin({
            //     // filename: '[path].gz[query]',
            //     // //压缩算法
            //     // algorithm: 'gzip',
            //     // //匹配文件
            //     // test: /\.js$|\.css$|\.html$|\.less$/,
            //     // //压缩超过此大小的文件,以字节为单位
            //     // threshold: 10240,
            //     // minRatio: 0.8,
            //     // //删除原始文件只保留压缩后的文件
            //     // deleteOriginalAssets: false
            //
            //     filename: "[path].br[query]",
            //     algorithm: "brotliCompress",
            //     test: /\.(js|css|html|svg|less|jpg|bmp|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|avif|apng)$/,
            //     compressionOptions: { level: 11 },
            //     threshold: 10240,
            //     minRatio: 0.8,
            //     deleteOriginalAssets: false
            // })
        ],
        output: {
            filename: `js/[name].[hash].js`,
            chunkFilename: `js/[name].[hash].js`
        },
    },
    "pages":pages.pages(),
    "css": {
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true
                }
            }
        }
    }
}