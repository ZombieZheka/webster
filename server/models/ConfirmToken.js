import mongoose from "mongoose";
import randToken from "rand-token"

const Schema = mongoose.Schema;

const ConfirmTokenShema = new Schema({
    user_id: {
        type: String,
        required: true,
        ref: 'User',
    },

    token: {
        type: String,
        unique: true,
        default: () => randToken.generate(12)
    },

    expireAt: {
        type: Date,
        default: new Date(),
        expires: "6h"
    },

})

const ConfirmToken = mongoose.model('ConfirmToken', ConfirmTokenShema);

export default ConfirmToken