// routesConfig.js
const usersRoutes = require("../routes/userRoutes");
const authRoutes = require("../routes/authRoutes");
const roomsRoutes = require("../routes/classesRoutes");
const subjectsRoutes = require("../routes/subjectsRoutes");

const routesConfig = [
  { path: "/users", router: usersRoutes },
  { path: "/auth", router: authRoutes },
  {path: "/rooms", router: roomsRoutes},
  {path: "/subjects", router: subjectsRoutes}

];

module.exports = routesConfig;
