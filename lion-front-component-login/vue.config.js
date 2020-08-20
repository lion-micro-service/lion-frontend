let pages = require('@lion/lion-front-core/src/webpack/vue.config')

module.exports = {
    "pages":pages.pages(),
    "css": {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            }
        }
    },
}