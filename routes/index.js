//importing dependencies and api routes from pizza-routes and comment routes
const router = require("express").Router();
const apiRoutes = require("./api");

// add prefix of `/user` to routes created in `pizza-routes.js`
router.use("/api", apiRoutes);
;

module.exports = router;
//this will be imported in the server.js in the root directory
