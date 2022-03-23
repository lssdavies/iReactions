//importing dependenices from models directory. These controllers are the main CRUD Methods for the /api/user endpoints. They will hooked up to the routes in the routes folder.
const { User, Thoughts } = require("../models");

/*Creating functions as methods to be used with the User object as call back functions for the express.js routes*/

const userController = {
  //get all users method using mongooses find() method as a catch all
  getAllUsers(req, res) {
    console.log("get all users route");
    /*chaining .select() method onto query to remove the __v field and .sort() to sort users from newest to oldest*/
    User.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //Get user by id using findOne()
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //Create user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  //Update user using FindOneAndUpdate
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  /*delete user with .findOneAndDelete(), this controller has been updated to delete all the specified user thoughts as well. From we Thoughts into body and using deleteMany() to delete thoughts linked to the username*/
  deleteUser({ params, body }, res) {
    Thoughts.deleteMany({ username: body.username })
      .then(() => {
        User.findOneAndDelete({ _id: params.id }).then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No User found with this id!" });
            return;
          }
          res.json(dbUserData);
        });
      })
      .catch((err) => res.status(400).json(err));
  },
  //Add a friend to a user using findOneAndupdate() but not passing any body will just $push an user id into the freinds fields
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "No User found with this id! Cannot add friend" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  //delete friend using findOneAndUpdate we will have to use $pull since only deleting one friend and leaving the rest
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friend: friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({
              message: "No User found with this id! Cannot delete friend",
            });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
