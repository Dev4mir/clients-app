import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ClientSchema = new Schema({
  UID: String,
  userAddedDate: Date,
  name: String,
  phone: {
    type: Number,
    unique: true,
    required: true
  },
  mobile: Number,
  address: String,
  username: String,
  password: String,
  clientImages: Array,
  idNumber: Number,
  withRatio: Boolean,
  note: String
});

module.exports = mongoose.model("Client", ClientSchema);
