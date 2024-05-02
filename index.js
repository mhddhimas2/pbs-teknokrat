const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const response = require('./request.js');

app.use(bodyParser.json());

// Membuat koneksi ke database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan username Anda
    password: '', // Ganti dengan password Anda
    database: 'db_perpustakaan' // Ganti dengan nama database Anda
});

// Menghubungkan ke database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Terhubung ke database MySQL');
});

// GET endpoint untuk mendapatkan data buku
app.get('/buku', (req, res) => {
    const sql = 'SELECT * FROM tb_buku';
    db.query(sql, (error, result) => {
        if (error) {
            response(500, 'error', 'Gagal mengambil data buku dari database', res);
        } else {
            response(200, result, 'Data buku berhasil diambil dari database', res);
        }
    });
});

// GET endpoint untuk mendapatkan data penerbit
app.get('/penerbit', (req, res) => {
    const sql = 'SELECT * FROM tb_penerbit';
    db.query(sql, (error, result) => {
        if (error) {
            response(500, 'error', 'Gagal mengambil data penerbit dari database', res);
        } else {
            response(200, result, 'Data penerbit berhasil diambil dari database', res);
        }
    });
});

// GET endpoint untuk mendapatkan data anggota
app.get('/anggota', (req, res) => {
    const sql = 'SELECT * FROM tb_anggota';
    db.query(sql, (error, result) => {
        if (error) {
            response(500, 'error', 'Gagal mengambil data anggota dari database', res);
        } else {
            response(200, result, 'Data anggota berhasil diambil dari database', res);
        }
    });
});

// GET endpoint untuk mendapatkan data pinjaman
app.get('/pinjaman', (req, res) => {
    const sql = 'SELECT * FROM tb_pinjaman';
    db.query(sql, (error, result) => {
        if (error) {
            response(500, 'error', 'Gagal mengambil data pinjaman dari database', res);
        } else {
            response(200, result, 'Data pinjaman berhasil diambil dari database', res);
        }
    });
});

// POST endpoint untuk menambah data buku
app.post('/buku', (req, res) => {
    const { judul, pengarang, tahun_terbit, id_penerbit } = req.body;
    const sql = `INSERT INTO tb_buku (judul, pengarang, tahun_terbit, id_penerbit) VALUES (?, ?, ?, ?)`;
    db.query(sql, [judul, pengarang, tahun_terbit, id_penerbit], (error, result) => {
        if (error) {
            response(500, 'error', 'Gagal menambahkan data buku ke database', res);
        } else {
            response(200, result, 'Data buku berhasil ditambahkan ke database', res);
        }
    });
});

// POST endpoint untuk menambah data penerbit
app.post('/penerbit', (req, res) => {
    const { nama_penerbit, lokasi } = req.body;
    const sql = `INSERT INTO tb_penerbit (nama_penerbit, lokasi) VALUES (?, ?)`;
    db.query(sql, [nama_penerbit, lokasi], (error, result) => {
        if (error) {
            response(500, 'error', 'Gagal menambahkan data penerbit ke database', res);
        } else {
            response(200, result, 'Data penerbit berhasil ditambahkan ke database', res);
        }
    });
});

// POST endpoint untuk menambah data anggota
app.post('/anggota', (req, res) => {
    const { nama, alamat, email, telepon } = req.body;
    const sql = `INSERT INTO tb_anggota (nama, alamat, email, telepon) VALUES (?, ?, ?, ?)`;
    db.query(sql, [nama, alamat, email, telepon], (error, result) => {
        if (error) {
            response(500, 'error', 'Gagal menambahkan data anggota ke database', res);
        } else {
            response(200, result, 'Data anggota berhasil ditambahkan ke database', res);
        }
    });
});

// POST endpoint untuk menambah data pinjaman
app.post('/pinjaman', (req, res) => {
    const { id_buku, id_anggota, tanggal_pinjam, tanggal_kembali } = req.body;
    const sql = `INSERT INTO tb_pinjaman (id_buku, id_anggota, tanggal_pinjam, tanggal_kembali) VALUES (?, ?, ?, ?)`;
    db.query(sql, [id_buku, id_anggota, tanggal_pinjam, tanggal_kembali], (error, result) => {
        if (error) {
            response(500, 'error', 'Gagal menambahkan data pinjaman ke database', res);
        } else {
            response(200, result, 'Data pinjaman berhasil ditambahkan ke database', res);
        }
    });
});

app.listen(port, () => {
    console.log(`Running on port http://localhost:${port}`);
});
