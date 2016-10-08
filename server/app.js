"use strict";
var express = require("express");
var app = express();
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.listen(3000, function () {
    console.log("Server listening on port 3000");
});
exports.App = app;
//# sourceMappingURL=app.js.map