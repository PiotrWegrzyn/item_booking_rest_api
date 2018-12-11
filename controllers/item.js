const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Item = require("../models/itemSchema");

exports.create = (req, res, next) => {
    Item.find({name:req.body.name})
        .exec()
        .then(results=>{
            if (results.length >= 1) {
                return res.status(409).json({
                    message: "Name exists."
                });
            }
            else{
                item = new Item({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,

                });
                item.save()
                    .then(result => {
                        res.status(201).json({
                            message: "Item was created.",
                            item: result
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.addReservation = (req, res, next) => {
    item = new Item({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,

    });
    item.save()
        .then(result => {
            res.status(201).json({
                message: "Item was created.",
                item: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.getAll = (req, res, next) => {
    item = Item.find().populate("reservations").exec()
        .then(items => {
            res.status(201).json({
                items: items
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

