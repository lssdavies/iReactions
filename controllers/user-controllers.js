//importing dependenices from models directory. These controllers are the main CRUD Methods for the /api/user endpoints. They will hooked up to the routes in the routes folder.
const { User } = require("../models");

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
};
