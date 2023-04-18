// Imported required packages
require('dotenv').config({ path: '../.env.sample' });
const port = process.env.PORT || 3001;
const path = require("path");

const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

// NOT SURE KUNG ILALAGAY PA
// var route = require('./routes/route')


// Created express server
const app = express();

// need middleware to check all the data coming in and out
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const mongoDatabase = process.env.MONGO_URI

mongoose.connect(mongoDatabase).catch(err => console.log(err));
// const invoiceSchema = mongoose.Schema({
//     num: Number,
//     date: Date,
//     customerName: String,
//     productName: String,
//     productQty: Number,
//     productPrice: Number,
//     total: Number,
// });

// const Invoice = mongoose.model("Invoice", invoiceSchema);

// app.get("/", (req, res) => {
//     res.send("Express is here");
// });

// app.post("/create",  (req, res) => {
//     console.log("went here " + req.body)
//     Invoice.create({
//         num: req.body.num,
//         date: req.body.date,
//         customerName: req.body.customerName,
//         productName: req.body.productName,
//         productQty: req.body.productPrice,
//         productPrice: req.body.productQty,
//         total: req.body.total,
//     })
//         .then((doc) => console.log(doc))
//         .catch((err) => console.log(err));
// });

// app.get("/invoices", (req, res) => {
//     Invoice.find()
//         .then(items=> res.json(items))
//         .catch((err) => console.log(err));
// })

// app.delete("/delete/:num", (req, res) => {
//     console.log(req.params);
//     Invoice.findOneAndDelete({num: req.params.num})
//         .then((doc) => console.log(doc))
//         .catch((err) => console.log(err))
// })

// app.put("/update/:num", (req, res) => {
//     console.log(req.params);
//     console.log(res.body);
//     Invoice.findOneAndUpdate({num: req.params.num }, {
//         num: req.body.num,
//         date: req.body.date,
//         customerName: req.body.customerName,
//         productName: req.body.productName,
//         productQty: req.body.productQty,
//         productPrice: req.body.productPrice,
//         total: req.body.total,
//     }).then((doc) => console.log(doc))
//         .catch((err) => console.log(err));
// })

var route = require('./routes/routes')

app.use("/", route);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("src/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "build", "index.html"));
    }) 
}

app.listen(process.env.PORT || 3001, function () {
    console.log(`Server is running on port: ${port}`);
    console.log(`Connected Database: ${mongoDatabase}`);
});