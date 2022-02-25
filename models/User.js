// import dependencies for mongoose
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

//username, email, thoughts and friends. Thoughts is an array of _id values referencing the Though model and freinds is an array of values referencing the user model.

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: "Please include your username",
      unique: true,
      trim: true,
      /*added required and trim for validation, required means data must be added and trim will remove the white space. in the required value you can add a customer message i.e 'Please add a pizza name' in place of true*/
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /.+\@.+\..+/,
    },
    /*creating a relationship between user model and thoughts model*/
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    freinds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    //Adding JSON property to schema for virtual to work
    toJSON: {
      virtuals: true,
    },
  }
);

/* creating a virtual to get the total count of users friends*/
UserSchema.virtual("friendsCount").get(function () {
  return this.friends.length;
});

//Creating the User model using the User Schema
const User = model("User", UserSchema);
//Exporting the pizza model to be imported to the ./model/index.js
module.exports = User;
