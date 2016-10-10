var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'eu-cdbr-west-01.cleardb.com',
  user     : 'bd25aad1a27147',
  password : '3c718b93',
  database : 'heroku_a97929cf2aedc44'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

// Drop tables
var drop = '' +
'DROP TABLE client;';

connection.query(drop, (err, rows, fields) => {
  if (err) throw err;
  console.log('tables dropped');
});

// Create tables
var create = ''+
'CREATE TABLE client (name VARCHAR(20), address VARCHAR(20), birth DATE);';

connection.query(create, (err, rows, fields) => {
  if (err) throw err;
  console.log('table created');
});

// Insert into tables
var insert = ""+
"INSERT INTO client (name,address) VALUES('name1','address1');";
connection.query(insert, (err, rows, fields) => {
  if (err) throw err;
  console.log('table insert');
});
connection.end();
