//importing dependencies and api routes from user and Thoughts routes
const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thoughts-routes");

// add prefix of `/user` to routes created in `user-routes.js and thopughts-routes`
router.use("/user", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
//this will be imported in the server.js in the root directory
