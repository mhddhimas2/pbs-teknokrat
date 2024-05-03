const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6702732',
    password: '3ZfrDxtYD6',
    database: 'sql6702732'
});

module.exports = db;
