import mongoose from "mongoose";


const messageSchemma = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String},
    image: { type: String },
    seen: { type: Boolean, default: false },
}, { timestamps: true })

const Message = mongoose.model("Message", messageSchemma);

export default Message;