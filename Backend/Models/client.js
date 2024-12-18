const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: true,
    },
    contactNumber:{
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", 
        required: true,
    },
});

const Client = mongoose.model("client", clientSchema);

module.exports = Client;