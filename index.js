const express = require('express')
const app = express()
const port = 3001

// memanggil request body-parser
const bodyParser = require('body-parser')

const response = require('./request.js')

// memanggik file config.js
const db = require('./config.js')

//menggunakan body-parser
app.use(bodyParser.json())

// route get data
app.get('/mahasiswa', (req,res)=>{
    const sql = 'SELECT * FROM tb_mahasiswa'
    db.query(sql,(error, result)=>{
        response(200,result,'data mahasiswa',res)
    })
})

app.get('/mahasiswa/:npm', (req, res) => {
    const npm = req.params.npm;
    const sql = `SELECT * FROM tb_mahasiswa WHERE npm = '${npm}'`; // Menggunakan npm dari params
    db.query(sql, (error, result) => {
        if (error) {
            console.error('Error fetching data:', error);
            response(500, 'error', 'Internal Server Error', res); // Tangani kesalahan query SQL
        } else {
            if (result.length === 0) {
                response(404, 'error', 'Data not found', res); // Tangani jika data tidak ditemukan
            } else {
                response(200, result, 'Get data mahasiswa', res); // Tangani jika data berhasil ditemukan
            }
        }
    });
});


// route post data
app.post('/mahasiswa', (req, res)=>{
    const {nama, npm ,alamat }=req.body
    const sql = `INSERT INTO tb_mahasiswa (nama, npm, alamat) values ('${nama}','${npm}','${alamat}');`

    db.query(sql,(error, fields)=>{
        if(error) response(500, 'invalid', `${nama} dengan npm ${npm} sudah di tambahkan`, res)
        if (fields?.affectedRows){
            const data={
                isSucces: fields.affectedRows,
                id:fields.insertId,
            }
            response(200,data,"Data nerhasil di simpan",res)
            
        }
    })
})


app.listen(port, () => {
    console.log(`Runing in port ${port}`)
})