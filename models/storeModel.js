const mongoose = require('mongoose')


const storeSchema = new mongoose.Schema({
    store_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    store_title:{
        type: String,
        trim: true,
        required: true
    },
    phone:{
        type: String,
        trim: true,
        required: true
    },
    operating_hours:{
        type: String,
        trim: true,
        required: true,
    },
    address:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },

}, {
    timestamps: true //important
})


module.exports = mongoose.model("Store", storeSchema)