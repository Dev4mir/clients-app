import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ClientSchema = new Schema({
  UID: {
    type: String
  },
  userAddedDate: {
    type: Date
  },
  name: {
    type: String
  },
  phone: {
    type: Number,
    unique: true,
    required: true
  },
  mobile: {
    type: Number
  },
  address: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  clientImages: {
    type: Array
  }
});

module.exports = mongoose.model("Client", ClientSchema);
