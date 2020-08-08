const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}))

//const mainRoutes = require('./routes')
const searchRoutes = require('./routes/search')

//app.use('/api/', mainRoutes);
app.use('/api/searchRoutes', searchRoutes);


app.use((req, res, next) => {
    const err = new Error('Api endpoint not Found!');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.locals.error = err;
    if (!err.status) {
        err.status = 200
    }
    res.status(err.status);
    res.send({
        error: {
            message: err.message,
            status: err.status
        }
    });
});

app.listen(port, () => {
    console.log(`Server Up and running on port ${port}`)
});