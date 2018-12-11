const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Item = require("../models/itemSchema")
const Reservation = require("../models/reservationSchema");

//pass date as Json Date Format
exports.create = (req, res, next) => {
    let start = new Date(req.body.date);
    let end = new Date(start);
    end.setMinutes(start.getMinutes()+90);

    Item.findOne({ name:req.body.name})
        .populate("reservations")
        .exec()
        .then(item=>{
            for(let i =0; i < item.reservations.length;i++){
                if(item.reservations[i].from<=new Date(req.body.date) && new Date(req.body.date)<item.reservations[i].to){
                    return res.status(409).json({
                        message: "Reservation is impossible.",
                        item: item
                    });
                }
            }
            let reservation = new Reservation({
                _id: new mongoose.Types.ObjectId(),
                student: req.userData.userId,
                from: start,
                to: end
            });
            reservation.save()
                .then(reservation => {
                    Item.findOneAndUpdate({name:req.body.name},{$push: {reservations: reservation}}, {new: true})
                        .populate("reservations", "from to")
                        .exec()
                        .then(item=>{
                            return res.status(201).json({
                                message: "Added Reservation to an Item.",
                                reservation: reservation,
                                item: item
                            });

                        })
                        .catch(err => {
                            console.log(err);
                            return  res.status(500).json({
                                error: err
                            });
                        });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });

        })
        .catch();
};

exports.getAll = (req, res, next) => {
    Reservation.find().exec()
        .then(reservations => {
            res.status(201).json({
                reservations: reservations
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

