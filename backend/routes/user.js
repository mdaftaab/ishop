const express = require('express');
const UserController = require('../controllers/user.js');
const fileUpload = require('express-fileupload');
const { getRandomImageName, getImageDest } = require('../helper.js');
const path = require('path');
const fs = require('fs');
const Router = express.Router();
Router.get(
    "/:id?",
    (req, res) => {
        const response = new UserController().getData(req.params.id);
        response.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )
    }
)
Router.post(
    "/",
    fileUpload(
        { createParentPath: true }
    ),
    (req, res) => {
        const image = req.files.image;
        const imgNameArr = image.name.split(".");
        const ext = imgNameArr[imgNameArr.length - 1];
        const allowedExt = ['png', 'jpeg', 'jpg', 'gif','webp'];
        if (allowedExt.includes(ext.toLowerCase())) {
            const imageName = getRandomImageName(image.name);
            const destination = getImageDest('user') + imageName;
            try {
                image.mv(destination);
                const response = new UserController().save(
                    { image: imageName, ...req.body }
                );
                response.then(
                    (success) => {
                        res.send(success)
                    }
                ).catch(
                    (error) => {
                        res.send(error)
                    }
                )
            } catch (err) {
                res.send({
                    msg: "Unable to add data",
                    status: 0
                })
            }
        } else {
            res.send({
                msg: "This file is not allowed, only image file are allowed",
                status: 0
            })
        }


    }
)

Router.delete(
    "/:id/:imgName",
    (req, res) => {
        new UserController().deleteData(req.params.id, req.params.imgName)
            .then(
                (success) => {
                    res.send(success);
                }
            ).catch(
                (error) => {
                    res.send(error);
                }
            )
    }
)

Router.post(
    '/update/:id',
    fileUpload(
        { createParentPath: true }
    ),
    (req, res) => {
        let imageName = req.body.old_image_name; // this is the old name
        const image = req.files?.image;
        if (image !== undefined) {
            imageName = getRandomImageName(image.name);
            const destination = getImageDest('user') + imageName;
            try {
                image.mv(destination);
                const imagePath = path.join(__dirname, "../", "public/uploads/user", req.body.old_image_name);
                fs.unlinkSync(imagePath); //delete
            } catch (err) {
                console.log(err.message);
                return res.send({ msg: "Internal server error", status: 0 });
            }
        }
        const newData = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            image: imageName
        };
        new UserController().updateData(req.params.id, newData)
            .then(
                (success) => {
                    res.send(success);
                }
            ).catch(
                (error) => {
                    res.send(error);
                }
            )
    }
)
module.exports = Router;