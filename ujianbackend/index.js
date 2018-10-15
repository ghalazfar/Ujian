const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const xoauth2 = require('xoauth2')
const url = bodyParser.urlencoded({ extended: false})
const port = 4000
const mysql = require('mysql')

app.use(url)
app.use(bodyParser.json())

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ghalazfar@gmail.com',
        pass: 'wmnohcstoumlktkm'
    },
    tls: {
        rejectUnauthorized: false
    }
})

var mailOptions = {
    from: 'ghalazfar@gmail.com',
    to: 'ghalazfar@yahoo.co.id',
    subject: 'Tes',
    text: 'Halo Dunia!',
    html: '<h1>ini email2</h1>'
}

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'ghalazfar',
    password: 'kronos12',
    database: 'practice',
    port: '3306',
})

app.get('/', (req, res) => {
    res.send('<h1>Selamat Datang!</h1>');
});

app.get('/books', (req, res) => {
    var sql = `SELECT * FROM books;`;
    conn.query(sql,(err,results) => {
        if(err) throw err;
            res.send(results);
   
    })
});

app.get('/sendemail', (req, res) => {
    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.log('error!')
        }
        else {
            console.log('sukses!')
        }
    })
});


app.post('/books',(req, res)=>{
    const { idbook, title, author, status, catid } = req.body;
    var data = {
        idbook: idbook,
        title: title,
        author: author,
        status: status
    }
    
    var sql1 = 'INSERT INTO books SET ?';
    conn.query(sql1, data, (err, results) => {
        if(err) throw err;
        console.log(results);

        if(catid.length !== 0) {
            var sql2 = "INSERT INTO bookcat (bookid, catid) VALUES ?"
            var value = []
            for(var i in catid) {  
                value.push([results.insertId, catid[i]])
            }
            conn.query(sql2, [value], (err, results2) => {
            if (err) throw err;
            sql = "SELECT * FROM books"
            conn.query(sql,(err,results3)=>{
                if(err)throw err;
                res.send(results3);
            })
            console.log(results2);  
            })     
              
        }         
        
    })

})

app.get('/search', (req, res) => {   
    var sql=`SELECT b.*, bc.catid
    FROM books b 
    JOIN bookcat bc 
    ON b.idbook = bc.bookid
    WHERE catid in (${req.query.catid})
    GROUP BY b.idbook
    HAVING COUNT(catid) = ${req.query.catid.length};`;
    //line 2,3,4: tabel book jadi b, bookcat jadi bc, digabung dimana b.idbook sama dengan bc.bookid,
    //line 1,5: ambil tabel yang sudah digabung dengan syarat catid = di query (/search?catid=1)
    //line 6,7: diurutkan berdasarkan idbook, hanya memasukkan buku yg catid-nya sepanjang query catid
    conn.query(sql, (err, results) => {
        if(err) throw err;            
        res.send(results);
    })    
})


app.delete('/books/:id', (req, res) => {
    const { id } = req.params
    var sql = `DELETE b.*, bc.*
    FROM books b 
    JOIN bookcat bc 
    ON b.idbook = bc.bookid 
    WHERE b.idbook = '${id}'`
    conn.query(sql, (err, results) => {
        if(err) throw err;      
  
        var sql = `SELECT * FROM books;`;
        conn.query(sql,(err,results) => {
            if(err) throw err;
                res.send(results);  
        })          
    })    
})

app.put('/books/:id', (req, res) => {
    const { id } = req.params
    var sql = `DELETE FROM book b 
    JOIN bookcat bc 
    ON b.id = bc.bookid 
    WHERE b.id = ${id};`
    conn.query(sql, (err, results) => {
        if(err) throw err;      
  
        var sql = `SELECT * FROM books;`;
        conn.query(sql,(err,results) => {
            if(err) throw err;
                res.send(results);  
        })          
    })    
})

app.listen(port, () => console.log(`Listening on port ${port}!`))