var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: path.join(__dirname, 'src', 'index.tsx'),                 // webpack打包的入口文件
    output: {
        filename: 'bundle[chunkhash].js',
        path: path.join(__dirname, 'dist'),
        publicPath: '',
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true// 压缩内联css
            },
            filename: 'index.html',
            template: 'src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                // exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            "cacheDirectory": true,
                            "presets":
                                [
                                    ["@babel/preset-env", { targets: { browsers: "last 2 versions" } }],
                                    "@babel/react"
                                ],
                            "plugins": [
                                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                                ["@babel/plugin-proposal-class-properties", { "loose": true }]
                            ]
                        }
                    }
                ]
            }, {
                test: /\.ts|tsx$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        "compilerOptions": {
                            "declaration": false,
                            // "moduleResolution": "node",
                            "module": "commonjs",
                            "target": "es5",
                            // "experimentalDecorators": false,
                            "noUnusedParameters": false,
                            "noUnusedLocals": false,
                            "noResolve": false
                        }
                    }
                }]
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }
        ]
    },
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 7000,
        host: '127.0.0.1',
        overlay: true
    },
    resolve: {
        alias: {
            'root': path.join(__dirname, 'src')
        },
        extensions: ['.ts', '.tsx', '.js', '.json', '.vue', '.scss', '.css']
    }
}