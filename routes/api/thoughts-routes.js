//importing  dependencies for router and and the methods used in the routes
const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughts-controllers");

// /api/thoughts
router.route("/api/thoughts").get(getAllThoughts);
// /api/thoughts/<userId>
router.route("/api/thoughts/:userId").get(getThoughtById).post(addThought);
// This updates a Thought with a reaction so using put opposed to post
router.route("/:userId/:thoughtId").put(addReaction);

// /api/comments/<userId>/<thpoughtId>
/*We need two parameters to delete a thought because after deleting a particular thought, you need to know which user that thought originated from.*/
router.route("/:userId/:thoughtId").delete(removeThought);

//this remove a reaction from a specific Thought
router.route("/:userId/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;
//routes are exported to the ./api/index.js
