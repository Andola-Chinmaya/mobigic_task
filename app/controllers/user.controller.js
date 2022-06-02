const db = require("../models");
const dotenv = require("dotenv");
dotenv.config()
const User = db.users;
const File = db.file;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request

    // Create a User
    const user = new User({
        userName: req.body.userName,
        FirstName: req.body.FirstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password, 8)

    });
    // Save User in the database
    user
        .save(user)
        .then(data => {
            res.send(data);
            console.log(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};


// Find a single User with an id
exports.signin = (req, res) => {

    User.findOne({
            userName: req.body.userName
        })
        .then(data => {
            var passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }


            var token = jwt.sign({
                _id: data.userName
            }, process.env.secret, {
                expiresIn: 86400 // 24 hours
            });
            console.log(token)
            res.status(200).json({

                username: data.userName,
                email: data.email,
                FirstName: data.FirstName,
                lastname: data.lastName,

                accessToken: token
            });

        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error Occured cannot signin"
                });
        });
};

exports.createFile = (req, res) => {

    const file = req.body;

    const userFile = {
        originalName: file.originalname,
        storage: 's3',
        link: file.path,
        size: file.size,
        createdBy: req.userId,
        uniqueCode: Math.random().toString(36).substring(2, 8)
    };

    File.create(userFile)
        .then(data => {
            res.status(200).json({
                data
            });
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error! file did not save successfully"
                });
        });
};


exports.getFiles = (req, res) => {


    File.find({
            createdBy: req.userId
        })
        .then(data => {
            res.status(200).json({
                data
            });
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Facing Error on retrieving files"
                });
        });
};


exports.deleteFile = (req, res) => {


    File.findOneAndRemove(req.query)
        .then(data => {
            res.status(200).json({
                data
            });
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error occured on Deleting file "
                });
        });
};