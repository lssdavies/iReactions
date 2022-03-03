const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controllers");

/*Since we deconstructed the methods from user-controller in the object above we can included them in the routes by name*/
// Set up GET all and POST at /user
router.route("/").get(getAllUsers).post(createUser);

// Set up GET one, PUT, and DELETE at /api/user/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
