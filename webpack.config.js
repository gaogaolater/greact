module.exports = (env) => {
    return {
        entry: {
            app: ['./src/demo/index.js']
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].js',
            publicPath: '/',
        },
        resolve: {
            extensions: ['.js', '.vue', '.json', '.scss']
        },
        module: {
            rules: [{
                test: /\.js[x]$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }]
        },
        plugins: getPlugins(env)
    }
}