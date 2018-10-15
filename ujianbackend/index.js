const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const url = bodyParser.urlencoded({ extended: false})
const port = 2000
const mysql = require('mysql')

app.use(url)
app.use(bodyParser.json())

const conn = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'hotelbertasbih',
    port: '3306',
})

app.get('/', (req, res) => {
    res.send('<h1>Hotel Bertasbih</h1>');
});

//get kamar
app.get('/kamar', (req, res) => {
    const { category } = req.query
    var sql = ''
    if (category == undefined) {
        sql = `SELECT * FROM tablekamar;`;
        conn.query(sql,(err,results) => {
            if(err) throw err;
                res.send(results);   
        })
    }    
    else {
        sql = `SELECT k.* 
                FROM tablekamar k
                JOIN tablecategory c
                ON k.categoryid = c.id
                WHERE c.namacategory = '${category}';`
        conn.query(sql,(err,results) => {
            if(err) throw err;
                res.send(results);   
        })        
    }    
});

//create kamar
app.post('/kamar',(req, res)=>{
    const { nomorkamar, categoryid, harga } = req.body;
    const data = { nomorkamar, categoryid, harga }    
    var sql = "INSERT INTO tablekamar SET ?"
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        sql = "SELECT * FROM tablekamar"
        conn.query(sql,(err,results2)=>{
            if(err)throw err;
            res.send(results2);
        })
    })                   
})

//update kamar
app.put('/kamar/:id', (req,res) => {
    const { id } = req.params;
    const { nomorkamar, categoryid, harga } = req.body;
    const data = { nomorkamar, categoryid, harga }    
    var sql = `UPDATE tablekamar SET ? WHERE id = ${id}`
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        sql = "SELECT * FROM tablekamar"
        conn.query(sql,(err,results2)=>{
            if(err)throw err;
            res.send(results2);
        })
    })
})

//delete kamar
app.delete('/kamar/:id', (req, res) => {
    const { id } = req.params
    var sql = `DELETE k.* FROM tablekamar k WHERE k.id = '${id}'`
    conn.query(sql, (err, results) => {
        if(err) throw err;    
        var sql = `SELECT * FROM tablekamar;`;
        conn.query(sql,(err,results) => {
            if(err) throw err;
                res.send(results);  
        })          
    })    
})

//create category
app.post('/category',(req, res)=>{
    const { namacategory } = req.body;
    const data = { namacategory }    
    var sql = "INSERT INTO tablecategory SET ?"
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        sql = "SELECT * FROM tablecategory"
        conn.query(sql,(err,results2)=>{
            if(err)throw err;
            res.send(results2);
        })
    })                   
})

//update category
app.put('/category/:id', (req,res) => {
    const { id } = req.params;
    const { namacategory } = req.body;
    const data = { namacategory }    
    var sql = `UPDATE tablecategory SET ? WHERE id = ${id};`
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        sql = "SELECT * FROM tablecategory"
        conn.query(sql,(err,results2)=>{
            if(err)throw err;
            res.send(results2);
        })
    })
})

//delete category
app.delete('/category/:id', (req, res) => {
    const { id } = req.params
    var sql = `DELETE c.* FROM tablecategory c WHERE c.id = '${id}';`
    conn.query(sql, (err, results) => {
        if(err) throw err;    
        var sql = `SELECT * FROM tablecategory;`;
        conn.query(sql,(err,results) => {
            if(err) throw err;
                res.send(results);  
        })          
    })    
})

//login
app.post('/login', (req, res) => {
    const { email, password } = req.body
    const data = { email, password }
    var sql = `SELECT * FROM tableuser WHERE email = '${email}' AND password = '${password}';`
    conn.query(sql, data, (err, user) => {
        if (err) throw err;
        if (user.length == 0 ) {
            res.send({ err: "Wrong Email or Password!" })
        }
        else {
            res.send(user)
        }
    })
})

//register
app.post('/register', (req, res) => {
    const { username, email, password, role } = req.body
    const data = { username, email, password, role }
    var sql = `SELECT * FROM tableuser WHERE email = '${email}';` 
    conn.query(sql, data, (err, user) => {
        if (err) throw err;
        if (user.length == 0 ) {
            sql = `INSERT INTO tableuser SET ?`
            conn.query(sql, data, (err, results) => {
                if (err) throw err;
                res.send(data)
            })
        }
        else {
            res.send({ err: "Email already registered!"})
        }
    })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))