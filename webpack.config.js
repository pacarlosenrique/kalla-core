const path = require("path");
const glob = require("glob");
const lodash = require('lodash');

function reduce(obj, val) {
	const filenameRegex = /([\w\d_-]*)\.?[^\\\/]*$/i;
	obj[val.match(filenameRegex)[1]] = val;
	//obj.push(val);
	return obj;
};

function getEntry() {
	return lodash.reduce(glob.sync("./src/**/*.js"), reduce, {});
};

module.exports = {
	entry: getEntry(),
	output: {
		path: path.resolve('./dist'),
		filename: "[name].js"
	},
	module: {
		loaders: [{
			exclude: '/node_modules',
			loader: 'babel-loader',
			query: {
				
			}
		}]
	}

};

/*
,
				presets: ['es2015']
*/