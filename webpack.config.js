var path = require("path");     //allows to resolve path of application

var DIST_DIR = path.resolve(__dirname, "dist");  

const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
//directory from which app is served
//copy everything which has been prepared for serving into the dist folder (created automatically)

var SRC_DIR = path.resolve(__dirname, "./src/");
//tells where to find the untranspiled source code

var config = {
    devtool: 'inline-source-map',
    entry: SRC_DIR + "/app/index.tsx",   //this is the root file (file which starts app)
    output: {
        path: DIST_DIR + "/app",
        filename: "./bundle.js",
        publicPath: "/app/"
        //important for webpack development server -> our public folder
        //in this case, have to tell the webpack folder what would be the place to look (where app lives)
    },

    resolve: {
        extensions: [
        '.webpack.js',
        '.web.js',
        '.tsx',
        '.ts',
        '.js',
        '.jsx',
        '.json',
        '*',
        ],
    }, 

    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        dns: 'empty'

    },

    module: {
        loaders: [
            //only one loader, babel
            {
                test: /\.js?/,  //which files should webpack have a look at regarding this loader
                include: SRC_DIR,  //which folders should you scan for such files
                exclude: [
                    /node_modules/,
                    '/app/server.js',
                ],
                loader: "babel-loader",
                query: {
                    plugins: ['transform-decorators-legacy' ],
                    presets: ["react", "es2015", "stage-2"]
                }
			},  {
                test: /\.css$/,
				loaders: ["style-loader", "css-loader"]
			},  {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
			}
		]
	},

	plugins: [
        new TsConfigPathsPlugin(/* { tsconfig, compiler } */),
    ],
};


module.exports = config