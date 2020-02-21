let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');
let app = express();
let data = require('./data');

let CONNECTION_URL = data.cloudDatabaseURL;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { mongoose.connect(CONNECTION_URL, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true },(err) =>
{
    if(err)
    {
        console.log('Database Not Connected',err);
    }
    else
    {
        console.log('Database Connected Successfully and Back End Listening on Port',PORT);
    }
});});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user',require('./routes/user.route'));
app.use('/coupon',require('./routes/coupon.route'));
app.use('/route',require('./routes/route.route'));
app.use('/payment',require('./routes/payment.route'));