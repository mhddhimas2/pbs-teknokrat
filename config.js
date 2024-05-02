const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6702732',
    password: '3ZfrDxtYD6',
    database: 'sql6702732',
    port: 3306 // Ganti dengan port yang sesuai jika perlu
});

// Mengaktifkan koneksi
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

module.exports = db;
