let pages = require('@lion/lion-front-core/src/webpack/vue.config')

module.exports = {
    filenameHashing: true,
    configureWebpack: {
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