let pages = require('@lion/lion-scaffold-front-component-core/src/webpack/vue.config')

module.exports = {
    "pages":pages.pages(),
    "css": {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            }
        }
    }
}