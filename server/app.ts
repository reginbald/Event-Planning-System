import * as express from "express";

var app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

export var App = app;
