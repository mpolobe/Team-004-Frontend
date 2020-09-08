var config={
    entry: ["./src/app.js"],
    resolve: {
        alias: {

        }
    },
    output: {
        path: __dirname+"/build",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?modules",
                include: /flexboxgrid/,
            }
        ]
    }
};

module.exports = config;