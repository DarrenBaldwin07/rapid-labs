import path from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { webpackPlugin } from './plugin/unplugin.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDirectory = 'dist';

export default {
    mode: 'production',
    target: 'web',
    entry: path.resolve(__dirname, './src/entry-server.tsx'),
    output: {
        path: path.join(__dirname, buildDirectory),
        library: 'SSR',
        libraryTarget: 'var',
        filename: 'server/index.js',
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'tsx',
                    target: 'es2015',
                },
            },
            {
                test: /\.(png|jp(e*)g|svg|gif|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/',
                            name: 'images/[hash]-[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        webpackPlugin(),
    ],
}
