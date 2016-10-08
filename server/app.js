"use strict";
var express = require("express");
var webpack = require('webpack');
var path = require('path');
var app = express();
var config = require('../webpack.config.dev.js');
var compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.listen(3000, function () {
    console.log("Server listening on port 3000");
});
exports.App = app;
//# sourceMappingURL=app.js.map