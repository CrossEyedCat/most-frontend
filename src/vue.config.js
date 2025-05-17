const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    publicPath: '/ui',
    outputDir: 'dist/ui',
    transpileDependencies: true,
    devServer: {
        port: 8083,
        hot: true,
        liveReload: true,
        onAfterSetupMiddleware(devServer) {
            const expressApp = devServer.app;
            expressApp.use('/assets', require('express').static('src/assets'));
        },
        proxy: {
            '/api': {
                target: 'https://most-pol.ru/',
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            },
            '/stream': {
                target: 'https://most-pol.ru/',
                changeOrigin: true
            },
            '/websocket': {
                target: 'wss://most-pol.ru/',
                ws: true,
                changeOrigin: true
            },
            '/auth': {
                target: 'https://most-pol.ru/',
                changeOrigin: true
            },
            '/egisz': {
                target: 'https://most-pol.ru/',
                changeOrigin: true
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('m3u8')
            .test(/.m3u8$/)
            .use('raw-loader')
            .loader('raw-loader')
            .end();
    }
});