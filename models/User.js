const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add an username"],
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "invalid email"],
      required: [true, "please add a email"],
    },
    password: {
      type: String,
      required: [true, "please add a password"],
    },
    role: String,
    confirmed: Boolean,
    token: [],
    postIds: [{ type: ObjectId, ref: "Post" }],
    followers: [{ type: ObjectId, ref: 'User' }],

  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.token;
  delete user.password;
  delete user.confirmed;
  delete user.role;
  delete user.createdAt;
  delete user.updatedAt;

  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
