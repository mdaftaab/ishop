// const dotenv = require('dotenv');
const express = require('express');
const CategoryRouter = require('./routes/category.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.use("/category", CategoryRouter);
// File upload
app.post(
    "/upload",
    fileUpload(
        {
            createParentPath: true
        }
    ),
    (req, res) => {
        const image = req.files.image;
        const imageName = Math.floor(Math.random() * 1000) + "-" + new Date().getTime() + image.name;
        const desti = __dirname + "/public/uploads/product/" + imageName;
        try {
            image.mv(desti);
            res.send({
                msg: "Success"
            });
        } catch (err) {
            res.send({
                msg: "Error"
            });
        }
    }
)
// ------------
mongoose.connect(
    'mongodb+srv://bhagirath:XbPcys1BefQkdgMj@cluster0.oiuxnke.mongodb.net/?retryWrites=true&w=majority'
).then(
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
