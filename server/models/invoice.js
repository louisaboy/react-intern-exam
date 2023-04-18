const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
    num: Number,
    date: Date,
    customerName: String,
    productName: String,
    productQty: Number,
    productPrice: Number,
    total: Number,
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;