// const dotenv = require('dotenv');
const express = require('express');
const CategoryRouter = require('./routes/category.js');
const ProductRouter = require('./routes/product.js');
const UserRouter = require('./routes/user.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.use("/category", CategoryRouter);
app.use("/product", ProductRouter);
app.use("/user", UserRouter);


// Data connection and server connection
// mongoose.connect('mongodb+srv://mdaftaab:qqn0IYdkvbpnZlHl@cluster0.gxdgrdd.mongodb.net/?retryWrites=true&w=majority')
mongoose.connect(
    "mongodb://0.0.0.0:27017",
    {
        dbName: "ishop",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
.then(
    () => {
        app.listen(
            5000,
            () => {
                console.log('Server started');
            }
        )
    }
).catch(
    () => {
        console.log('Connection error');
    }
)
