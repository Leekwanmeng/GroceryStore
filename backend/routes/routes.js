const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : '',
    password : '',
    database : 'GroceryStore'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Mysql connected');
});


// POST ROUTES //

// Sign up handler
exports.signup = (req,res) => {
    var users= {
        "name":req.body.name,
        "password":req.body.password,
        "email":req.body.email
    };
    var insertQuery = 'INSERT INTO CUSTOMER SET ?';
    db.query(insertQuery, [users], 
        (err, results) => {
            if (err) {
                res.status(400).send({
                    error:"error ocurred"
                });
            }
            res.send({
                "success":"user registered sucessfully",  
            });

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
                    value: {
                        'name': results[0].name,
                        'customer_id': results[0].customer_id
                    }
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

// New order for customer
exports.newOrder = (req,res) => {
    var order = {
        'total_amount': req.body.total_amount,
        'customer_id': req.body.customer_id
    };
    var insertQuery = `INSERT INTO CUSTOMER_ORDER SET ?;`
    db.query(insertQuery, order,
        (error, results) => {
            if (error) {
                res.status(400).send({
                    error:"error ocurred in insert"
                });
            }
            res.send({
                "success":"insert success"
            });
        }
    );
}


// Add items to existing order
exports.addItemToOrder = (req,res) => {
    var orderEntry = {
        'quantity':req.body.quantity,
        'total_cost':req.body.total_cost,
        'item_id':req.body.item_id,
        'customer_order_id':req.body.order_id
    };
    var insertQuery = `INSERT INTO ORDER_ITEM SET ?;`
    db.query(insertQuery, orderEntry,
        (error, results) => {
            if (error) {
                res.status(400).send({
                    error:"error ocurred in insert"
                });
            }
            res.status(200).send({
                "success":"order item registered sucessfully",
            });
        }
    );
}

// GET ROUTES //

// Check for existing user
exports.checkUser = (req, res) => {
    var email = req.body.email;
    var selectQuery = 'SELECT * FROM CUSTOMER WHERE email = ?';
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
            } else {
                res.send({
                    'success': "no existing user"
                });
            }
        });   
}


// Get previous customer id
exports.getPrevCustomer = (req,res) => {
    var selectQuery = `SELECT MAX(customer_id) as maxId FROM CUSTOMER;`
    db.query(selectQuery,
        (err, results) => {
            if (err) {
                res.status(400).send({
                    error:"error ocurred in select"
                });
            }
            if (results.length > 0) {
                res.send({
                    "success":"select sucessful",
                    value: {
                        'customer_id': results[0].maxId
                    }
                });
            } else {
                res.status(404).send({
                    error:"customer not selected"
                });
            }
        }
    );
}





// Get previous order id
exports.getPrevOrder = (req,res) => {
    var selectQuery = `SELECT MAX(customer_order_id) as maxId FROM CUSTOMER_ORDER;`
    db.query(selectQuery,
        (err, results) => {
            if (err) {
                res.status(400).send({
                    error:"error ocurred in select"
                });
            }
            if (results.length > 0) {
                res.send({
                    "success":"insert, select sucessful",
                    value: {
                        'order_id': results[0].maxId
                    }
                });
            } else {
                res.status(404).send({
                    error:"order not selected"
                });
            }
        }
    );
}

// Get items handler
exports.allItems = (req,res) => {
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

