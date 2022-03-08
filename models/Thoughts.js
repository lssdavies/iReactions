// import dependencies
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

/*reactions schema will be used as a subdocument array to Thoughts since the data will never be queried on its own*/
const Reactions = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    reactionId: {
      type: Schema.Types.ObjectId,
      //generating the same type of ObjectId() value that the _id field typically does.
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: "Please add a reaction",
      trim: true,
      min: 1,
      max: 280,
    },
    username: {
      type: String,
      require: "Please include your username",
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//Creating the Thoughts Schema
const ThoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Please include your thought",
      min: 1,
      max: 280,
    },
    createAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      require: "Please include your username",
    },
    reactions: [Reactions],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);
/* creating a virtual to get the total count of reactions*/
ThoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//Creating the User model using the User Schema
const Thoughts = model("Thoughts", ThoughtsSchema);
//Exporting the pizza model to be imported to the ./model/index.js
module.exports = Thoughts;
