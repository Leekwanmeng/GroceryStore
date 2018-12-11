const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'kenpark080801',
    database : 'GroceryStore'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Mysql connected');
});

// Sign up handler
exports.signup = (req,res) => {
    var email = req.body.email;
    var selectQuery = 'SELECT * FROM CUSTOMER WHERE email = ?';
    var insertQuery = 'INSERT INTO CUSTOMER SET ?';
    db.query(selectQuery, [email], 
        (err, results) => {
            if (err) {
                res.status(400).send({
                    error:"error ocurred"
                });
                throw err;
            }
            if (results.length > 0) {
                res.status(409).send({
                    error:"Email address already taken"
                });
                return;
            } else {
                var users= {
                    "name":req.body.name,
                    "password":req.body.password,
                    "email":req.body.email
                };
                db.query(insertQuery, users, 
                    (error, results) => {
                    if (error) {
                        res.status(400).send({
                            error:"error ocurred"
                        });
                    }
                    res.status(200).send({
                        "success":"user registered sucessfully"
                    });
                });
            }
        });
        
    
}

// Login handler
exports.login = (req,res) => {
    var email = req.body.email;
    var password = req.body.password;
    db.query('SELECT * FROM CUSTOMER WHERE email = ?',[email], 
        (error, results) => {
        if (error) {
            res.status(400).send({
                error:"error ocurred"
            });
        }
        if (results.length > 0) {
            if (results[0].password == password) {
                res.send({
                    "success":"login sucessful",
                    value: results[0].name
                });
            } else {
                res.status(204).send({
                    "success":"Email and password does not match"
                });
            }
        } else {
            res.status(404).send({
                error:"Email does not exits"
            });
        }
    });
}

// Get items handler
exports.allitems = (req,res) => {
    db.query(`SELECT i.item_id, i.item_name, i.description, i.item_price, c.category_name, m.merchant_name
                FROM ITEM i
            LEFT JOIN CATEGORY c on (i.category_id = c.category_id)
            LEFT JOIN MERCHANT m on (i.merchant_id = m.merchant_id)`,
        (error, results) => {
        if (error) {
            res.status(400).send({
                error:"error ocurred"
            });
        }
        if (results.length > 0) {
            res.send({
                "success":"get items sucessful",
                value: results
            });
        } else {
            res.status(404).send({
                error:"No items found"
            });
        }
    });
}
