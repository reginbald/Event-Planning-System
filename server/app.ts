import * as express from "express";
const webpack = require('webpack');
const path = require('path');
var app = express();
const config = require('../webpack.config.dev.js');
const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath:config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});

export var App = app;
