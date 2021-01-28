const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IntelPasswordSchema = new Schema({
  pageId: {
    type: String,
    unique: true
  },
  password: String
});

const Authentication = mongoose.model("authentication", IntelPasswordSchema);

module.exports = Authentication;
