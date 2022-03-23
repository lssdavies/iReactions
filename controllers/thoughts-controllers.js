//importing the models we need
const { Thoughts, User } = require("../models");

const thoughtController = {
  //get all Thoughts using mongooses find() method as a catch all
  getAllThoughts(req, res) {
    console.log("get all users thoughts");
    /*chaining .select() method onto query to remove the __v field and .sort() to sort users from newest to oldest*/
    Thoughts.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //Get user by id using findOne()
  getThoughtById(req, res) {
    Thoughts.findOne({ _id: req.params.id })
      .select("-__v")
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //add a thought to a user
  addThought({ params, body }, res) {
    console.log(body);
    Thoughts.create(body)
      .then(({ _id }) => {
        console.log(_id);
        return User.findOneAndUpdate(
          { _id: body.userId },
          //Note here that we're using the $push method to add the comment's _id to the specific user we want to update. The $push method works just the same way that it works in JavaScript it adds data to an array. All of the MongoDB-based functions like $push start with a dollar sign ($), making it easier to look at functionality and know what is built-in to MongoDB and what is a custom noun the developer is using.
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },
  //Update Thought using FindOneAndUpdate. forgot to add initially
  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
    })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.status(400).json(err));
  },
  /*add a reaction to thought. reactions, do not create a reaction document; it just updates an existing Thought by pushing the new data into its respective thought.*/
  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: body.thoughtId },
      //mongoDB operator $push to push the reaction to the comment
      { $push: { reactions: body } },
      //the new: true returns the change
      { new: true }
    )
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },
  //delete a Thought
  removeThought(req, res) {
    /*The first method used here, .findOneAndDelete(), works a lot like .findOneAndUpdate(), as it deletes the document while also returning its data. We then take that data and use it to identify and remove it from the associated user using the Mongo $pull operation. Lastly, we return the updated user data, now without the _id of the thought in the thoughts array, and return it to the user. */
    Thoughts.findOneAndDelete({ _id: req.params.id })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          //mongoDB operator $pull to delete the reaction to the thought
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },
  //remove a thpught reaction
  removeReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      /*MongoDB $pull operator to remove the specific reaction from the reaction array where the reactionId matches the value of params.reactionId passed in from the route. */
      { $pull: { reactions: { reactionsId: params.reactionsId } } },
      //the new: true returns the change
      { new: true }
    )
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
//this will be imported in routes/api/thoughts-routes.js
