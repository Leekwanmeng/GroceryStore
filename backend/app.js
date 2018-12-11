const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Allows cross domain request serving
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.Router();

// test route
router.get('/', (req, res) => {
    res.json({ message: 'App running' });
});

//route to handle user registration
router.post('/signup',routes.signup);
router.post('/login',routes.login);
router.get('/allitems',routes.allitems);
app.use('/api', router);

app.on("error", err => console.log(err));
app.listen('3000', () => {
    console.log ('Server started on port 3000');
});