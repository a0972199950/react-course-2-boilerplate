const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if(process.env.NODE_ENV === "test"){
    require('dotenv').config({ path: ".env.test" });
} else if(process.env.NODE_ENV === "development"){
    require('dotenv').config({ path: ".env.development" });
}

module.exports = (env) => {
    const isProduction = env === "production";
    const CSSExtract = new MiniCssExtractPlugin({filename: "styles.css"});

    return {
        entry: ["@babel/polyfill", "./src/app.js"],
        output: {
            path: path.join(__dirname, "public", "dist"),
            filename: "bundle.js"
        },
        module: {
            rules: [{
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            },{
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }]
        },
        plugins: [
            CSSExtract,
            // new webpack.DefinePlugin()的作用很有趣，它是
            // 「把你整個專案視為純文字為前提，搜尋你整個專案裡面的特定字串後，把該字串替換為另一個字串」
            // 例如專案中有【name=this.name】這段程式，若在new webpack.DefinePlugin()裡傳入{"this.name": "that.name"}，
            // 上面專案的內容就會變成【name=that.name】！因為是把程式視為純文字，因此若想把同樣一段改成【name="john"】，
            // 則new webpack.DefinePlugin()裡就必須是{"this.name": '"john"'}，要雙上引號
            // 使用JSON.stringify()是因為若傳入本來就是字串的值進去(例如"john")，則stringtify()會回傳成""john""
            new webpack.DefinePlugin({
                "process.env.FIREBASE_API_KEY": JSON.stringify(process.env.FIREBASE_API_KEY),
                "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                "process.env.FIREBASE_DATABASE_URL": JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                "process.env.FIREBASE_PROJECT_ID": JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
        ],
        devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",
        devServer: {
            contentBase: path.join(__dirname, "public"),
            // 若瀏覽器尋找頁面時收到404，則強制載入首頁
            historyApiFallback: true,
            publicPath: "/dist/"
        },
    }
};