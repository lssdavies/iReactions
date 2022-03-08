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

// this will be exported and appended to /api ie: /api/thoughts
router.route("/").get(getAllThoughts).post(addThought);
// /api/thoughts/<userId>
router.route("/:id").get(getThoughtById).delete(removeThought);
/*We need two parameters to delete a thought because after deleting a particular thought, you need to know which user that thought originated from.*/
// router.route("/:userId/:thoughtId").delete(removeThought);
// This updates a Thought with a reaction so using put opposed to post
router.route("/:userId/:thoughtId").put(addReaction);

// /api/comments/<userId>/<thpoughtId>


//this remove a reaction from a specific Thought
router.route("/:userId/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;
//routes are exported to the ./api/index.js
