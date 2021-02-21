import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserAccountSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  emailVerified: Boolean,
  name: String,
  firstName: String,
  lastName: String,
  locale: String
});

const UserAccount = mongoose.model("useraccount", UserAccountSchema);

export default UserAccount;
