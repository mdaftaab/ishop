const User = require('../models/user.js');
const fs = require('fs');
const path = require('path');
class UserController {
    save = (data) => {
        return new Promise(
            (resolve, reject) => {
                try {
                    const user = new User(
                        {
                            name: data.name,
                            email: data.email,
                            age: data.age,
                            image: data.image
                        }
                    )
                    user.save()
                        .then(
                            (success) => {
                                resolve({
                                    msg: "Data added successfully",
                                    status: 1
                                })
                            }
                        )
                        .catch(
                            (error) => {
                                reject({
                                    msg: "Unable to add data",
                                    status: 0
                                })
                            }
                        )
                } catch (err) {
                    reject({
                        msg: err.message,
                        status: 0
                    })
                }
            }
        )
    }
    getData = async (id) => {
        return new Promise(
            async (resolve, rejected) => {
                try {
                    if (id !== undefined) {
                        let data = await User.findById(id);
                        if (data == null) {
                            rejected({
                                status: 0,
                                msg: "Data not found"
                            });
                        } else {
                            resolve({
                                status: 1,
                                user: data,
                                path: "http://localhost:5000/uploads/user/",
                            });
                        }

                    } else {
                        let data = await User.find().sort({
                            _id: 'desc'
                        });
                        resolve({
                            status: 1,
                            user: data,
                            path: "http://localhost:5000/uploads/user/",
                            msg: `Total ${data.length} records found`
                        });
                    }
                }
                catch (err) {
                    rejected({
                        status: 0,
                        msg: err.message + "Interal server error"
                    });
                }
            }
        )
    }
    deleteData = (id, imgName) => {
        return new Promise(
            async (resolve, reject) => {
                try {
                    User.deleteOne({ _id: id })
                        .then(
                            () => {
                                const imagePath = path.join(__dirname, "../", "public/uploads/user", imgName);
                                fs.unlinkSync(imagePath); //delete
                                resolve({
                                    msg: "Data deleted",
                                    status: 1
                                });
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                reject({
                                    msg: "Unable to delete the data",
                                    status: 0
                                });
                            }
                        )
                }
                catch (err) {
                    console.log(err.message);
                    reject({
                        msg: "Internal server error",
                        status: 0
                    });
                }
            }
        )
    }

    updateData = (id, newData) => {
        return new Promise(
            (resolve, reject) => {
                User.updateOne(
                    {
                        _id: id
                    },
                    newData
                ).then(
                    (success) => {
                        resolve({
                            msg: "Data updated",
                            status: 1
                        });
                    }
                ).catch(
                    (error) => {
                        reject({
                            msg: "Unable to update the data",
                            status: 0
                        });
                    }
                )
            }
        )
    }

}

module.exports = UserController;