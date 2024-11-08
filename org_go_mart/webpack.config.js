var path = require('path');
    var ExtractTextPlugin = require('sgmf-scripts')['extract-text-webpack-plugin'];
    var sgmfScripts = require('sgmf-scripts');

    module.exports = [{
        mode: 'development',
        devtool: 'source-map',
        name: 'js',
        entry: sgmfScripts.createJsPath(),
        output: {
            path: path.resolve('./cartridges/app_custom_gomart/cartridge/static'),
            filename: '[name].js'
        }
    }, {
        mode: 'development',
        devtool: 'source-map',
        name: 'scss',
        entry: sgmfScripts.createScssPath(),
        output: {
            path: path.resolve('./cartridges/app_custom_gomart/cartridge/static'),
            filename: '[name].css'
        },
        module: {
            rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    }, {
                        loader: 'sass-loader'
                    }]
                })
            }]
        },
        plugins: [
            new ExtractTextPlugin({ filename: '[name].css' })
        ]
    }];