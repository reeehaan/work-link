const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    companyName:{
        type: String,
        default: "",
    },
    contactNumber:{
        type: Number,
        default: "",
    },
    email:{
        type: String,
        default: "",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", 
        required: true,
    },
});

const Client = mongoose.model("client", clientSchema);

module.exports = Client;