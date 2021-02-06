import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const IntelPasswordSchema = new Schema({
  pageId: {
    type: String,
    unique: true
  },
  password: String
});

const IntelPassword = mongoose.model("intelpassword", IntelPasswordSchema);

export default IntelPassword;
