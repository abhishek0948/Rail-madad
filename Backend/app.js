const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
// db connection
const connectdb = require('./db/db.js');

// Controllers
const saveRoute = require('./routes/saveRoute.js');
const authRoute = require('./routes/auth.js');
const adminRoute = require('./routes/adminRoute.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));

connectdb(app)  

// Routes
app.use(authRoute);
app.use(saveRoute);
app.use('/admin',adminRoute);

