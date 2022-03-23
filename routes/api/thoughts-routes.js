//importing  dependencies for router and and the methods used in the routes
const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughts-controllers");

// this will be exported and appended to /api ie: /api/thoughts
router.route("/").get(getAllThoughts).post(addThought);

// /api/thoughts/:thoughtId
router.route("/:id").get(getThoughtById).put(updateThought).delete(removeThought);

// This updates a Thought with a reaction so using put opposed to post
router.route("/:userId/:thoughtId").post(addReaction);

//This route deletes a reaction and in addition to the above route it needs the reactionId
router.route("/:userId/:thoughtId/reactionId").delete(removeReaction);

module.exports = router;
//routes are exported to the ./api/index.js
